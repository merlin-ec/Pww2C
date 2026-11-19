# Decision log

**Last updated:** 18 Nov 2026

One line per decision, newest at the bottom of each section. If you change one, add a line saying what replaced it and why; don't delete history.

## Agreed with Tom before building (3 Nov 2026)

- **Stack: Next.js + TypeScript on Vercel, Supabase for database and auth.** The most documented path for a solo builder; Supabase and Vercel both publish first-party guides for Next.js.
- **Spend: free tiers while building, Supabase Pro ($25/mo) at public launch.** Free projects pause after a week without traffic and have no backups, which is fine for building but not for real users.
- **Recommendations: a transparent scoring engine plus a Claude layer, capped at $10/month.** Claude suggests deep cuts from a user's favourites; the engine matches every suggestion to a real TMDB title and ranks it. Falls back to engine-only if the cap is hit.
- **Data model and auth as planned.** Guests join watch sessions as anonymous Supabase users and keep everything if they sign up, because the user id never changes.

## Foundations

- **Fresh repo; PWW 1 stays as reference.** Its schema had drifted from its migrations; starting clean was cheaper than untangling it.
- **Next.js 16 defaults kept: Cache Components and Partial Prefetching on.** Pages ship as an instant static shell; anything personal streams in behind `<Suspense>`. Fighting the framework's defaults would make every guide harder to follow.
- **Migrations are the only way the schema changes.** Each one is a file in `supabase/migrations`, applied to production exactly as written, and production's copy is checked against the file by checksum (see `docs/database.md`). Never edit the schema in the Supabase dashboard.
- **Applied migrations are never edited.** A fix is a new migration (example: `usage_days_self_read`).
- **Every table has row-level security with explicit grants.** Nothing relies on Supabase's default privileges.
- **Database rules are tested on real Postgres in CI** (`tests/db`), using a small stand-in for Supabase's auth schema.
- **Titles are keyed as `movie:603` / `tv:1396`.** Readable in logs and URLs, and built without a lookup.
- **TMDB data is fetched on the server and cached with `use cache`.** Title details for a day, search and trending for an hour. TMDB's terms cap caching at six months.
- **Catalogue tables exist from day one but are only written when someone interacts** (rates, lists). Rendering a page never writes to the database.
- **TMDB-backed sections render at request time** (`connection()`), so a deploy never depends on TMDB being up.
- **Posters come straight from TMDB's CDN with `srcset`**, not through Vercel's image optimiser: TMDB already serves every size, and it keeps us inside free limits.
- **Movies and TV are both supported; TV is rated at the show level.** No episode tracking in v1.
- **Streaming availability covers US, CA, GB, AU, NZ and IE**, defaulting to your profile's country, then the country Vercel detects, then the US.
- **Profiles are public; usernames are lowercase, 3–20 characters, with a short reserved list.** A taken or invalid username at sign-up never blocks the account; the app asks for another.
- **Email links use `token_hash` templates** so they work on any device; the confirm route also accepts the default `code` links as a fallback.
- **Account deletion is immediate and cascades** to everything the account owns.
- **Retention is measured with our own `usage_days` table**, one row per user per active day, recorded by the proxy once a day. No third-party analytics.
- **Fonts are self-hosted** (Big Shoulders Display for the marquee, Instrument Sans for everything else).
- **Dark theme only.** A theatre lobby is dark; one theme is half the work to keep accessible.
- **Plain Tailwind components, no component library yet.** Add one only when a complex widget (dialog, menu) needs it.
- **No Content-Security-Policy header yet.** Nonce-based CSP conflicts with static shells; revisit in the polish milestone. Clickjacking is blocked with `X-Frame-Options`.

## How we work (17–18 Nov 2026)

- **Docs are always kept current (Tom, 17 Nov).** PWW keeps changing, so a change isn't done until its docs match. The same PR updates the matching doc, wrong docs get fixed when found, every session ends with status, handoff, `TOM.md` and changelog updates, and CI (`scripts/docs-check.sh`) enforces it. Asking alone wasn't enough on PWW 1.
- **Which source wins (Tom, 17 Nov).** The 17 Nov docs are the main reference for rules and process; the 3 Nov code and docs are the baseline, and Tom says both are out of date. When docs and code disagree, the code wins on facts about the code, the docs win on rules, and product or design conflicts go to Tom.
- **One rulebook: `CLAUDE.md`.** `AGENTS.md` keeps only the Next.js block that `next dev` rewrites, plus a pointer to `CLAUDE.md`, so the rules can't drift apart in two files.
- **This log stays one line per decision** (decision in bold, then why and what we didn't choose). The longer template in the starter pack's `workflow.md` was changed to match.
- **The 18 Nov prototype is the product reference (Tom, 18 Nov).** It shows the idea of what Tom wants, so the specs follow its features and flows; Tom doesn't like its look, so the design doesn't. Where it conflicts with an earlier decision, the earlier decision stands until Tom changes it.
- **Agents work from a shared kit in `.claude/` (18 Nov).** `/start` and `/finish` skills so every session follows the same steps, an independent `reviewer` agent before every PR, a `db-migrator` agent for all schema changes, and a permissions file that allows routine work, asks for installs, rebases and merges, and blocks pushes to `main`. We chose this over long instructions in each prompt, because Tom starts agents from his phone and a short command is all he should need to type.
