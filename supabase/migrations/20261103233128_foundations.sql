-- =============================================================================
-- PWW · Foundations
-- Profiles, the TMDB catalogue cache, and daily-usage tracking.
--
-- Security model (applies to every migration in this repo):
--   * Every table has row-level security (RLS) switched on.
--   * Privileges are granted explicitly per table; nothing relies on defaults.
--   * Browsers reach the database as `anon` (signed out) or `authenticated`
--     (signed in, including anonymous guests). Only server code holding the
--     secret key acts as `service_role`, which bypasses RLS.
-- =============================================================================

-- Internal helper functions live in a schema the Data API doesn't expose.
create schema if not exists private;
revoke all on schema private from public;

-- -----------------------------------------------------------------------------
-- Shared types
-- -----------------------------------------------------------------------------

-- Countries we show streaming availability for in v1 (English-language markets).
create domain public.region_code as text
  check (value in ('US', 'CA', 'GB', 'AU', 'NZ', 'IE'));

create type public.media_type as enum ('movie', 'tv');

-- How a service offers a title. Matches the categories in TMDB's JustWatch data.
create type public.offer_type as enum ('flatrate', 'free', 'ads', 'rent', 'buy');

create type public.credit_role as enum (
  'director', 'writer', 'creator', 'cinematographer', 'composer', 'cast'
);

-- Keeps updated_at honest without trusting whoever wrote the row.
create function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- Profiles: one row per account, guests included
-- -----------------------------------------------------------------------------

create table public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  username     text unique
               constraint profiles_username_format
                 check (username ~ '^[a-z0-9_]{3,20}$')
               constraint profiles_username_not_reserved
                 check (username not in (
                   'admin', 'administrator', 'moderator', 'pww', 'prestige',
                   'support', 'help', 'official', 'staff', 'system', 'root'
                 )),
  display_name text constraint profiles_display_name_length
                 check (char_length(display_name) between 1 and 50),
  bio          text constraint profiles_bio_length
                 check (char_length(bio) <= 280),
  region       public.region_code not null default 'US',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.profiles is
  'Public profile for every account. Guests (anonymous accounts) have no username.';

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function private.set_updated_at();

alter table public.profiles enable row level security;

-- Profiles are public: they power profile pages and show who owns a shared list.
create policy "Profiles are readable by everyone"
  on public.profiles for select
  to anon, authenticated
  using (true);

-- You can edit only your own profile, and guests can't claim a username.
create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check (
    (select auth.uid()) = id
    and (
      username is null
      or coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false) = false
    )
  );

-- No insert or delete policies: rows are created by the trigger below and
-- removed when the account itself is deleted.
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to anon, authenticated;
grant update (username, display_name, bio, region) on public.profiles to authenticated;

-- Creates the profile the moment an account is created. Runs with elevated
-- rights because the auth service, not the user, inserts into auth.users.
create function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  wanted_username text := lower(nullif(btrim(new.raw_user_meta_data ->> 'username'), ''));
  wanted_name     text := left(nullif(btrim(new.raw_user_meta_data ->> 'display_name'), ''), 50);
begin
  if coalesce(new.is_anonymous, false) then
    wanted_username := null;
  end if;

  begin
    insert into public.profiles (id, username, display_name)
    values (new.id, wanted_username, coalesce(wanted_name, wanted_username));
  exception
    when unique_violation or check_violation then
      -- Username taken or invalid: create the profile without one and let the
      -- app ask for a username. Signing up must never fail because of this.
      insert into public.profiles (id, display_name)
      values (new.id, wanted_name);
  end;

  return new;
end;
$$;

revoke all on function private.handle_new_user() from public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

-- -----------------------------------------------------------------------------
-- Catalogue cache: titles, people and availability copied from TMDB
-- Everyone can read it; only server code (service_role) can write it.
-- TMDB's terms cap how long we may keep its data (6 months), so every row
-- records when it was last fetched and gets refreshed well before that.
-- -----------------------------------------------------------------------------

create table public.titles (
  -- Readable key: media type plus TMDB number, e.g. 'movie:603' or 'tv:1396'.
  id                      text primary key,
  media_type              public.media_type not null,
  tmdb_id                 integer not null check (tmdb_id > 0),
  title                   text not null,
  original_title          text,
  original_language       text,
  overview                text,
  tagline                 text,
  release_date            date,
  runtime_minutes         integer check (runtime_minutes >= 0),
  number_of_seasons       integer check (number_of_seasons >= 0),
  status                  text,
  genre_ids               integer[] not null default '{}',
  keyword_ids             integer[] not null default '{}',
  origin_countries        text[] not null default '{}',
  poster_path             text,
  backdrop_path           text,
  vote_average            numeric(4, 2),
  vote_count              integer,
  popularity              numeric(12, 4),
  imdb_id                 text,
  -- Null until the full details (credits, keywords) have been fetched.
  details_fetched_at      timestamptz,
  availability_fetched_at timestamptz,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),
  constraint titles_media_tmdb_unique unique (media_type, tmdb_id),
  constraint titles_id_matches check (id = media_type::text || ':' || tmdb_id::text)
);

create trigger titles_set_updated_at
  before update on public.titles
  for each row execute function private.set_updated_at();

create table public.people (
  id                   integer primary key check (id > 0), -- TMDB person id
  name                 text not null,
  profile_path         text,
  known_for_department text,
  updated_at           timestamptz not null default now()
);

create trigger people_set_updated_at
  before update on public.people
  for each row execute function private.set_updated_at();

create table public.title_credits (
  title_id  text not null references public.titles (id) on delete cascade,
  person_id integer not null references public.people (id) on delete cascade,
  role      public.credit_role not null,
  character text,
  ord       smallint not null default 0,
  primary key (title_id, person_id, role)
);

-- "Everything this director made" lookups (directors you follow, recommendations).
create index title_credits_person_role_idx on public.title_credits (person_id, role);

create table public.keywords (
  id   integer primary key check (id > 0), -- TMDB keyword id
  name text not null
);

create table public.providers (
  id               integer primary key check (id > 0), -- TMDB/JustWatch provider id
  name             text not null,
  logo_path        text,
  display_priority integer,
  updated_at       timestamptz not null default now()
);

create trigger providers_set_updated_at
  before update on public.providers
  for each row execute function private.set_updated_at();

create table public.title_availability (
  title_id    text not null references public.titles (id) on delete cascade,
  region      public.region_code not null,
  provider_id integer not null references public.providers (id) on delete cascade,
  offer_type  public.offer_type not null,
  primary key (title_id, region, provider_id, offer_type)
);

-- "What does this service carry here?" lookups for streaming advice.
create index title_availability_region_provider_idx
  on public.title_availability (region, provider_id);

alter table public.titles             enable row level security;
alter table public.people             enable row level security;
alter table public.title_credits      enable row level security;
alter table public.keywords           enable row level security;
alter table public.providers          enable row level security;
alter table public.title_availability enable row level security;

create policy "Catalogue titles are readable by everyone"
  on public.titles for select to anon, authenticated using (true);
create policy "Catalogue people are readable by everyone"
  on public.people for select to anon, authenticated using (true);
create policy "Catalogue credits are readable by everyone"
  on public.title_credits for select to anon, authenticated using (true);
create policy "Catalogue keywords are readable by everyone"
  on public.keywords for select to anon, authenticated using (true);
create policy "Catalogue providers are readable by everyone"
  on public.providers for select to anon, authenticated using (true);
create policy "Catalogue availability is readable by everyone"
  on public.title_availability for select to anon, authenticated using (true);

revoke all on public.titles, public.people, public.title_credits, public.keywords,
  public.providers, public.title_availability from anon, authenticated;
grant select on public.titles, public.people, public.title_credits, public.keywords,
  public.providers, public.title_availability to anon, authenticated;

-- -----------------------------------------------------------------------------
-- Usage days: one row per account per day it was used (UTC). This is how we
-- measure whether people come back on their own, without third-party analytics.
-- -----------------------------------------------------------------------------

create table public.usage_days (
  user_id uuid not null references auth.users (id) on delete cascade,
  day     date not null default ((now() at time zone 'utc')::date),
  primary key (user_id, day)
);

alter table public.usage_days enable row level security;

-- Signed-in users can record today for themselves, and nothing else.
-- Nobody can read the table from a browser; reports run on the server.
create policy "Users can record their own usage for today"
  on public.usage_days for insert
  to authenticated
  with check (
    user_id = (select auth.uid())
    and day = (now() at time zone 'utc')::date
  );

revoke all on public.usage_days from anon, authenticated;
grant insert on public.usage_days to authenticated;
