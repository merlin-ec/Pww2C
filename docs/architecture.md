# Architecture

**Last updated:** 17 Nov 2026

## The pieces

```
           Browser (desktop / phone)
                    │
                    ▼
   ┌──────────── Vercel ─────────────┐
   │  src/proxy.ts  (every request:  │
   │   session refresh, usage track) │
   │            │                    │
   │  Next.js 16 App Router          │
   │   pages, Server Actions,        │
   │   Route Handlers                │
   └───┬──────────────┬──────────┬───┘
       │              │          │
       ▼              ▼          ▼
   Supabase        TMDB API    Anthropic API
   Postgres+Auth   (titles,    (phase 3:
   (RLS on every   posters,    Haiku 5.5,
    table)         JustWatch   $10/mo cap)
                   providers)
```

Posters load directly from TMDB's image CDN using `srcset`, not through Vercel's image optimiser.

## How a page renders

1. `src/proxy.ts` refreshes the Supabase session cookie and records the usage day.
2. Next.js serves an **instant static shell** (Cache Components + Partial Prefetching are on).
3. Anything personal (your ratings, your lists) streams in behind `<Suspense>`.
4. TMDB-backed sections render at request time (`connection()`), so a deploy never depends on TMDB being up.
5. If TMDB fails, the section shows a plain-English notice and the rest of the page still works.

## Data flow

- **Reading titles:** server → TMDB → cached with `'use cache'`. Title details are cached for 1 day, search and trending for 1 hour. TMDB's terms cap caching at 6 months.
- **Catalogue tables** are written only when a user *interacts* with a title (rates, adds to a list). Rendering a page never writes to the database.
- **Title keys** look like `movie:603` / `tv:1396`. They're readable in logs and URLs and need no lookup.
- **User writes** go through Server Actions. Each action checks the user (`dal.ts`), validates with Zod, and writes via the user's own Supabase client so RLS applies.

## Where code lives

See `CLAUDE.md` → *Where things live*. Rule of thumb: UI in `src/app` and `src/components`, all outside-world calls in `src/lib/*`, and secrets only in `server-only` modules.

## Planned additions

| Phase | Adds |
|---|---|
| 3 | Recommendation engine (`src/lib/recommendations/`?), Anthropic client (server only), usage/cost tracking table |
| 5 | Watch sessions: anonymous auth, possibly realtime (Supabase Realtime?). Decide in spec 05 |
| 7 | Custom domain, Resend SMTP, Supabase Pro (backups) |

*TODO: update this diagram whenever a new external service or major module is added.*
