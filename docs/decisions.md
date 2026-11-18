# Decision log

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
