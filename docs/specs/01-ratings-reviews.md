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
- **Signed-out visitors can browse, but must create an account or log in to do anything** (rate, log, review). Like most apps, trying to act is what prompts sign-up.
- **Short thought and review are different things (Tom, 25 Nov):**
  - A **short thought** is one line (up to 280 characters), saved with the rating and with each logged watch.
  - A **review** is an optional longer write-up (up to 5,000 characters), one per member per title.
- **Moderation basics now, Report later (Tom, 25 Nov; open question 5):**
  - Now: plain text, length caps, a per-member review rate limit, and Tom deletes by hand if needed.
  - The Report button comes in phase 6.

## User stories
- As a member, I want to rate a title so I remember what I thought and get better recommendations.
- As a member, I want to add a short thought with my rating, without writing a full review. *(prototype)*
- As a member, I want to write a review so I can say why.
- As a member, I want to log a watch (with the date) so I keep a watch diary. *(prototype)*
- As a member, I want to choose whether everyone can see my ratings or only me.
- As a visitor, I want to read members' ratings, reviews and diaries on their profiles (when they've left them visible), and be asked to sign up when I try to rate.

## Acceptance criteria
Each criterion is covered by one task in `status.md` → *Next up* (task number in brackets).

- [ ] Rating scale: **half a star to five stars**, in half-star steps *(prototype)* [3]
- [ ] A member can rate, change and remove a rating from the title page [4]
- [ ] A member can add, edit and delete a review (up to 5,000 characters) [4]
- [ ] Title page has a *Your take* block: stars, an optional short thought (up to 280 characters), and **Log this watch** *(prototype)* [4]
- [ ] Each logged watch is a diary entry (title, date, rating, thought); a title can be logged more than once; a member can delete an entry *(prototype)* [4]
- [ ] Title page shows the TMDB score next to the member's own rating *(prototype)* [2 shows the score; 4 adds the member's rating beside it]
- [ ] Title page has a **Find trailer** link (opens a YouTube search) *(prototype)* [2]
- [ ] Signed-out visitors who try to rate, log or review are asked to create an account or log in, and come back to the same title afterwards [4]
- [ ] Every member has a profile page showing their ratings, reviews and watch diary (diary newest first) *(prototype)* [5]
- [ ] **Visibility** setting in Account: *Everyone* (default) or *Private*. A private profile shows only "This profile is private" to everyone else [5]
- [ ] Visitors without an account can see profiles set to *Everyone* [5]
- [ ] The database enforces it all: only the owner can write their rows; reads follow the owner's visibility; reviews are capped at 20 new or edited per member per 24 hours [1]

## Data changes
Built in task 1 by the `db-migrator` agent (`database.md`).

- **`profiles.visibility`**:
  - type `public.visibility`, with values `everyone` and `private`. Phase 6 adds `followers` and `selected` in a new migration.
  - not null, default `everyone`; members can update it
- **`ratings`**, one per member per title:
  - columns: `user_id` (cascades on account deletion), `title_id` → `titles`, `rating` 1–10, `thought` (≤ 280, optional), timestamps
  - primary key `(user_id, title_id)`
  - Ratings are stored as whole numbers 1–10 (half stars × 2), so no decimals.
- **`reviews`**, one per member per title:
  - columns: `user_id`, `title_id`, `body` (1–5,000 characters), timestamps
  - a trigger refuses more than 20 inserts or edits per member per 24 hours
- **`watch_logs`** (the diary), many per member per title:
  - columns: `id`, `user_id`, `title_id`, `watched_on` (a date, not in the future), `rating` (1–10, optional), `thought` (≤ 280, optional), `created_at`
  - indexed by member and date, newest first
- **Who can read:** one function, `private.can_view(owner)`, decides it. It returns true for the owner, or when the owner's visibility is `everyone`. Every read policy uses it, so phase 6 only has to change this function.
- **Who can write:** members insert, update and delete only their own rows. Reviews also need a full account with a username (not a guest).
- **Catalogue:** rating, logging or reviewing a title first saves its `titles` row. The server does this with TMDB data it fetches itself; nothing comes from the browser.
- Also in this migration: an index on `title_availability.provider_id` (update pass #7).

## Security and abuse
- Owner-only writes, enforced by the database (RLS), not just the app.
- Text limits: thought 280, review 5,000. The database enforces both, not just the form.
- Review rate limit: 20 per member per 24 hours.
- Reviews and thoughts render as plain text, never HTML or Markdown.
- The user check runs in every Server Action (`src/lib/auth/dal.ts`).

## Out of scope
- Episode ratings.
- Likes or comments on reviews.
- The Report button (phase 6).
- *People I follow* and *selected followers* visibility (phase 6).
- Other members' reviews listed on the title page (phase 6 feed).

## Open questions
- #4 and #5: answered 25 Nov (above, and in `decisions.md`).
- #13: can guests write reviews? Default: no, they need a username. Guests can still rate and log watches, and keep them if they sign up.
