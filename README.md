# Prestige World Wide

**Last updated:** 18 Nov 2026

One place where your film and TV taste, tracking, deciding, sharing and streaming services live together.

**Status:** Foundations built (accounts, search, title pages, database, CI) but out of date. Next: an update pass on the code and docs, then ratings and reviews. Live status is in `TOM.md`.

## Stack

- **Next.js 16** (App Router, TypeScript strict) on **Vercel**
- **Supabase**: Postgres, auth and row-level security
- **TMDB** for titles and posters; **JustWatch** (via TMDB) for where to watch
- Tailwind CSS, Zod, Vitest

## Run it locally

```bash
npm install
cp .env.example .env.local   # fill in the values (see docs/setup.md)
npm run dev                  # http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run check` | Lint, type check and unit tests (run before every push) |
| `npm run test:db` | Database security tests (needs a local Postgres, see `tests/db/harness.ts`) |

## Where things live

```
src/app/            pages and server actions (one folder per URL)
src/components/     shared UI
src/lib/auth/       who's signed in (dal.ts), form rules, error messages
src/lib/catalogue/  film and TV data: fetching, caching, normalising
src/lib/tmdb/       the TMDB client (server only)
src/lib/supabase/   database clients and generated types
src/proxy.ts        runs before every request: session refresh, usage tracking
supabase/           migrations (the schema's only source of truth) and email templates
tests/unit/         logic tests
tests/db/           row-level security tests on real Postgres
docs/               decisions, setup, database workflow, how each feature works
```

## Read next

- `TOM.md`: where things stand, in plain English (start here)
- `CLAUDE.md`: the rules every agent follows, including keeping these docs current
- `docs/README.md`: map of every doc
- `docs/decisions.md`: why things are the way they are
- `docs/how-it-works/`: plain-English explanation of each feature
- `docs/database.md`: the migration workflow and who can access what
- `docs/setup.md`: accounts and settings

Film and TV data from [TMDB](https://www.themoviedb.org). This product uses the TMDB API but is not endorsed or certified by TMDB.
