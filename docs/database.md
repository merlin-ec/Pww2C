# Working with the database

**Last updated:** 3 Nov 2026

Production database: Supabase project `pww` (ref `qlisfitmvovfzkljmsfm`, region us-east-1, Postgres 17).

## The one rule

The schema only changes through migration files in `supabase/migrations/`. Never create or alter tables, policies or functions in the Supabase dashboard, because the next migration won't know about it and the repo will stop describing reality.

## Making a change

1. Write a new file `supabase/migrations/<timestamp>_<what_it_does>.sql`. Never edit a migration that has already been applied; write a new one that fixes it.
2. Add or update tests in `tests/db/` for any new table or security rule, then run them:
   ```bash
   npm run test:db   # needs a local Postgres; CI runs this on every push
   ```
3. Apply it to production exactly as written (Claude does this through the Supabase connector), then rename the local file so its timestamp matches the version production recorded.
4. Check production's copy matches the file. Run this in the Supabase SQL editor:
   ```sql
   select version, name,
          encode(sha256(convert_to(array_to_string(statements, ''), 'UTF8')), 'hex') as sha
   from supabase_migrations.schema_migrations
   order by version;
   ```
   and compare with `sha256sum supabase/migrations/*.sql`. Every line should match.
5. Regenerate types into `src/lib/supabase/database.types.ts` and commit them with the migration.
6. Run the Supabase security advisor; it should report nothing.

## Who can do what

| Table | Signed-out visitors | Signed-in users | Server (secret key) |
|---|---|---|---|
| profiles | read all | read all; edit own username, display name, bio, country | everything |
| titles, people, title_credits, keywords, providers, title_availability | read | read | write |
| usage_days | nothing | record today for themselves; read their own | everything |

Guests (anonymous accounts) are signed-in users who can't claim a username.

## Checking retention

```sql
-- People active on at least two different days, by the week they joined.
select date_trunc('week', p.created_at)::date as joined_week,
       count(*) as people,
       count(*) filter (where d.days >= 2) as came_back
from public.profiles p
left join (select user_id, count(*) as days from public.usage_days group by user_id) d
  on d.user_id = p.id
group by 1 order by 1;
```
