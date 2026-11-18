# How Foundations works

Foundations is everything the six features stand on: accounts, the film catalogue, title pages, and the safety rails.

## A page request, start to finish

1. **The proxy runs first** (`src/proxy.ts`). If you're signed in, it quietly refreshes your login cookies when they're close to expiring, and records the first visit of each day in `usage_days`. It never decides what you're allowed to see.
2. **Next.js sends the page's static shell straight away**: header, footer, headings, and grey placeholder boxes. This is pre-built, so it arrives instantly.
3. **Anything personal or live streams in behind `<Suspense>`**: your name in the header, the where-to-watch box for your country, search results. Each placeholder is replaced as its data arrives. If one part fails, only that part shows an error.

## Accounts

- **Sign up** (`src/app/(auth)/actions.ts`): the form is checked on the server, the username is checked for availability, then Supabase creates the account and emails a confirmation link.
- **The database creates your profile** the moment the account exists (a trigger in the first migration). If your username was taken in the meantime, you still get an account and the app asks you for another username.
- **Email links** (confirm, password reset) all land on `/auth/confirm`, which checks the link with Supabase, signs you in, and sends you on.
- **"Who is this?"** is answered in one place, `src/lib/auth/dal.ts`. Pages and actions call `getSessionUser()` or `requireUser()`; nothing trusts the browser's word.
- **Deleting your account** uses the secret key (the only place in Foundations that does) and removes everything tied to it.

## The catalogue

- All TMDB traffic goes through `src/lib/tmdb/client.ts`, on the server, with the token never sent to the browser. Every reply is checked against a schema, so a change on TMDB's side produces a clear error instead of a broken page.
- `src/lib/catalogue/normalize.ts` turns TMDB's replies into PWW's own shapes (one place to read if a field looks wrong).
- Results are cached: title details for a day, search and trending for an hour. A popular page costs one TMDB request a day, not one per visitor.
- The database tables for the catalogue exist already; from the next milestone, they fill up as people rate and save titles.

## Security in one paragraph

Every table has row-level security: the database itself refuses reads and writes that aren't explicitly allowed, whatever the browser sends. The rules are tested on a real Postgres in CI (`tests/db`). The two secrets (Supabase secret key, TMDB token) live only in server code; importing them from browser code fails the build.

## Where to look when something breaks

| Symptom | Look at |
|---|---|
| Title pages or search show "didn't load" | Vercel logs for `TmdbError`; is `TMDB_READ_TOKEN` set? |
| Sign-up email never arrives | Supabase → Authentication → Logs; custom email (SMTP) set up? |
| Email link goes to "That link didn't work" | Link used twice or expired; email templates updated? |
| Signed-in state seems wrong | `src/lib/supabase/proxy.ts` and the browser's cookies |
