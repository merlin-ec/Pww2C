# Phase 1: Ratings & reviews

**Last updated:** 25 Nov 2026

**Status:** Planned (25 Nov 2026). Tasks in `status.md` → *Next up*  ·  **Owner:** Tom

**Reference:** the 18 Nov prototype (`docs/product.md` → *Prototype*). Items marked *(prototype)* come from it. Follow its features and flows, not its look.

## Goal
Members can rate any film or show, add a short thought, log each watch in a diary, and optionally write a review. Ratings feed the taste profile later (phase 3).

## Already decided
- TV is rated at the **show** level, with no episodes in v1.
- Rating a title writes it to the catalogue (catalogue rows exist only for titles someone interacted with).
- **Visibility (Tom, 25 Nov; open question 4):** each member chooses who sees their ratings, reviews and diary.
  - **Everyone** is the default, and includes visitors without an account.
  - **Private** means only the member.
  - *People I follow* and *a few followers I pick* come in phase 6, once following exists.
- **Visitors can browse, but must create an account or log in to do anything** (rate, log, review). Like most apps, trying to act is what prompts sign-up.
- **Short thought and review are different things (Tom, 25 Nov):**
  - A **short thought** is one line (up to 280 characters).
  - A **review** is an optional longer write-up (up to 5,000 characters), one per member per title.
- **How a rating and the diary fit together:**
  - **Your rating** is one per title: your current stars and thought. It's what *Your take* shows and what recommendations use.
  - **Logging a watch** adds a diary entry with the date and a copy of the stars and thought you give it, so each rewatch keeps what you thought *that time*.
  - If you give stars when logging, they also become your rating. Editing or deleting a diary entry never changes your rating.
- **Moderation basics now, Report later (Tom, 25 Nov; open question 5):**
  - Now: plain text, length caps, a per-member review rate limit, and Tom deletes by hand if needed.
  - The Report button comes in phase 6.
- **Guests can't rate, log or review in phase 1.** The existing rule is that guests (anonymous watch-session accounts, phase 5) can only use their watch session (`auth.md`, `security.md`). Phase 5 decides whether that widens (open question 13).
- **Writing a review needs a username,** because reviews appear on the profile page at `/u/<username>`. Members who signed up without one (their name was taken) are asked to pick one in Account first. Rating and logging don't need one.

## User stories
- As a member, I want to rate a title so I remember what I thought and get better recommendations.
- As a member, I want to add a short thought with my rating, without writing a full review. *(prototype)*
- As a member, I want to write a review so I can say why.
- As a member, I want to log a watch (with the date) so I keep a watch diary. *(prototype)*
- As a member, I want to choose whether everyone can see my ratings or only me.
- As a visitor, I want to read members' ratings, reviews and diaries on their profiles (when they've left them visible), and be asked to sign up when I try to rate.

## Acceptance criteria
Each criterion is covered by exactly one task in `status.md` → *Next up* (task number in brackets).

- [ ] The database enforces it all: owner-only writes, no guest writes, reads follow the owner's visibility, text caps, and at most 20 review writes (new or edited) per member per 24 hours [1]
- [ ] Title page shows the TMDB score *(prototype)* [2]
- [ ] Title page has a **Find trailer** link (opens a YouTube search) *(prototype)* [2]
- [ ] *Your take* block on the title page with a **half-star to five-star** picker in half-star steps and an optional short thought (up to 280 characters) *(prototype)* [4a]
- [ ] A member can rate, change and remove a rating from the title page [4a]
- [ ] The member's own rating shows next to the TMDB score *(prototype)* [4a]
- [ ] Signed-out visitors who try to rate, log or review are asked to create an account or log in, and come back to the same title afterwards (including after confirming a new account's email) [4a]
- [ ] **Log this watch** (date defaults to today, optional stars and thought) adds a diary entry; a title can be logged more than once; a member can delete an entry *(prototype)* [4b]
- [ ] A member can add, edit and delete a review (up to 5,000 characters; needs a username) [4b]
- [ ] Every member with a username has a profile page showing their ratings, reviews and watch diary (diary newest first) *(prototype)* [5]
- [ ] **Visibility** setting in Account: *Everyone* (default) or *Private*. A private profile shows only "This profile is private" to everyone else [5]
- [ ] Visitors without an account can see profiles set to *Everyone* [5]

## Data changes
Built in task 1 by the `db-migrator` agent (`database.md`).

**Tables**
- **`profiles.visibility`**:
  - type `public.visibility` (`everyone`, `private`); phase 6 adds `followers` and `selected` in a new migration
  - not null, default `everyone`, added to the members' `update` column grant
- **`ratings`**, one per member per title:
  - `user_id` → `profiles(id)` **on delete cascade**; `title_id` → `titles(id)` **on delete restrict**
  - `rating` smallint 1–10, `thought` text ≤ 280 (optional), timestamps
  - primary key `(user_id, title_id)`, index on `title_id`
- **`reviews`**, one per member per title:
  - same two keys and cascade rules as `ratings`; `body` text 1–5,000 characters, timestamps
  - primary key `(user_id, title_id)`, index on `title_id`
- **`watch_logs`** (the diary), many per member per title:
  - same two keys and cascade rules
  - `id`, `watched_on` date, `rating` 1–10 (optional), `thought` ≤ 280 (optional), `created_at`
  - indexes on `(user_id, watched_on desc)` and `title_id`

**Rules the database enforces**
- **Ratings are stored as whole numbers 1–10** (half stars × 2), so 3½ stars is `7`. The UI converts.
- **`title_id` restricts deletes.** A catalogue row that has ratings, reviews or diary entries can't be deleted, and catalogue clean-up must skip such rows. Members' data must never vanish because a TMDB title was pruned.
- **Diary dates:** a trigger rejects a `watched_on` more than one day after today in UTC, because members in NZ and AU are up to 13 hours ahead. A `CHECK` can't do this, since it can't use the current date.
- **Review rate limit:**
  - Every insert and every update of `reviews` writes a row to `private.review_writes (user_id, written_at)`, via a trigger.
  - That trigger refuses the write if the member already has 20 rows in the last 24 hours, and deletes rows older than a day.
  - The table follows the rule for every table (RLS, explicit grants, tests), even in `private`:
    - `alter table private.review_writes enable row level security`, with no policies
    - `revoke all on private.review_writes from public, anon, authenticated`
    - Only the `security definer` trigger function, running as the owner, writes to it.
  - Counting events (not reviews) means editing one review repeatedly, or deleting and re-adding it, still counts each time.
- **Read rule:** one function, `private.can_view(owner uuid)`.
  - It returns true when `owner = auth.uid()` or the owner's visibility is `everyone`. Every select policy uses it, so phase 6 only changes this function.
  - It's `stable`, `security definer` (phase 6 will read an RLS-protected follows table) and `set search_path = ''`.
  - RLS calls it as the querying role, and Foundations revoked everything on `private` from `public`. So the migration must:
    - `grant usage on schema private to anon, authenticated`
    - `revoke execute on function private.can_view(uuid) from public`, then `grant execute ... to anon, authenticated`
  - Granting `usage` opens the `private` schema to those roles. So from now on, every function created in `private` must `revoke execute ... from public`, and every table in it needs RLS and revoked grants. Add this to `database.md`.
- **Write rule:**
  - Insert, update and delete only your own rows (`user_id = auth.uid()`), and never as a guest (`(auth.jwt() ->> 'is_anonymous')::boolean` is not true).
  - Inserting a review also needs `profiles.username is not null`.
- **Grants:**
  - `select` to `anon, authenticated` on the three tables
  - `insert, update, delete` to `authenticated` only
  - `update` limited to the editable columns
- **Tests (`tests/db`):** owner, another member, signed out (`anon`), anonymous guest, and a member whose profile is private. They must cover:
  - `anon` can read rows of an *Everyone* member
  - nobody else can read a *Private* member's rows
  - guests can't write
  - the 21st review write in 24 hours fails
  - `anon` and `authenticated` can't select, insert or delete on `private.review_writes`
  - a `titles` row with ratings can't be deleted
- Also in this migration: an index on `title_availability.provider_id` (update pass #7).

**Catalogue writes:** rating, logging or reviewing a title first saves its `titles` row. The server does this with the admin client and TMDB data it fetches itself; nothing comes from the browser. That's the admin client's purpose: catalogue rows are shared, so no member may write them directly.

## Security and abuse
- Owner-only writes and no guest writes, enforced by the database (RLS), not just the app.
- Text limits (thought 280, review 5,000) are enforced by the database, not just the form.
- Review rate limit: 20 writes per member per 24 hours.
- Reviews and thoughts render as plain text, never HTML or Markdown.
- The user check runs in every Server Action (`src/lib/auth/dal.ts`).
- *Everyone*-visibility rows can be read through the API by anyone who knows a member's id, including members with no username (and so no profile page). That's intended: *Everyone* means everyone.
- Private ratings still feed the member's **own** recommendations (phase 3). They never count towards anyone else's taste-match or feed (phase 6).

## Out of scope
- Episode ratings.
- Likes or comments on reviews.
- The Report button (phase 6).
- *People I follow* and *selected followers* visibility (phase 6).
- Other members' reviews listed on the title page (phase 6 feed).
- Guest ratings (phase 5, open question 13).

## Open questions
- #4 and #5: answered 25 Nov (above, and in `decisions.md`).
- #13: should guests be able to rate, log or review once watch sessions exist? It's phase 5's call. Until then, no.
