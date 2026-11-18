# CLAUDE.md: rules for agents working on PWW

**Last updated:** 18 Nov 2026

PWW (Prestige World Wide) is a film and TV taste, tracking and recommendation web app. Owner: Tom. He has said "build freely, no check-ins needed, but nothing reckless." This file defines what "reckless" means.

**This is the single rulebook.** `AGENTS.md` holds only the Next.js block that `next dev` maintains automatically, plus a pointer here for tools that read `AGENTS.md` first. Its Next.js rules apply too:

@AGENTS.md

## Start of every session

1. Read `docs/status.md`. It shows what's done, what's in progress, and who's on it.
2. Read the newest entry in `docs/handoff.md`.
3. Read the spec for your task in `docs/specs/`, plus any doc it links to.
4. **Claim your task** in `docs/status.md` (task, branch, date) before writing code. If someone else has claimed the files you need, pick other work or stop.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # lint + typecheck + unit tests; must pass before every push
npm run test:db    # RLS tests on real Postgres (see tests/db/harness.ts)
npm run build      # production build
```

Node 22+. Use npm, not pnpm or yarn.

`npm run check` = `lint` + `typecheck` (`next typegen && tsc --noEmit`) + `test`. `test:db` needs a Postgres it can create databases on: by default `postgres://postgres@127.0.0.1:54329/postgres`, or set `TEST_DATABASE_ADMIN_URL`. CI (`.github/workflows/ci.yml`) runs all of these plus `npm audit --omit=dev --audit-level=high` on Postgres 17.

## Stack (locked; see docs/decisions.md)

Next.js 16 (App Router, TypeScript strict) on Vercel · Supabase (Postgres, Auth, RLS) · TMDB for titles · JustWatch via TMDB for streaming · Tailwind · Zod · Vitest · Claude Haiku 5.5 for recommendations (phase 3).

**Next.js 16 differs from older versions.** Request middleware is `src/proxy.ts`, and caching uses Cache Components (`'use cache'`, `cacheLife`, `connection()`, `<Suspense>`). Check the Next.js 16 docs before using a pattern from memory.

## Where things live

```
src/app/            pages + server actions (one folder per URL)
src/components/     shared UI
src/lib/auth/       dal.ts = who's signed in; form rules; error messages
src/lib/catalogue/  film/TV data: fetch, cache, normalise
src/lib/tmdb/       TMDB client (server only)
src/lib/supabase/   DB clients (server.ts, proxy.ts, admin.ts) + generated database.types.ts
src/lib/env.ts      public env vars, validated; env.server.ts = secrets (server only)
src/proxy.ts        runs on every request: session refresh, usage tracking
supabase/migrations the ONLY source of truth for the schema
supabase/templates  auth email templates
tests/unit          logic tests
tests/db            RLS tests on real Postgres (harness.ts, supabase-stub.sql)
docs/               see docs/README.md for the map
```

## How the code is written

- **Secrets stay on the server.** Anything reading `SUPABASE_SECRET_KEY` or `TMDB_READ_TOKEN` imports `server-only`. Use the admin client (`src/lib/supabase/admin.ts`) only where no user should be able to act directly.
- **Check the user** in every Server Action and Route Handler with `src/lib/auth/dal.ts`, never by trusting form data.
- **Taste data is structured** (ids and fixed options), never free text to parse later. Every rate, dismiss and save on a suggestion is logged.
- **Leave a short comment explaining why** for anything non-obvious. Tom must be able to read and explain the code.
- Read `docs/decisions.md` before changing how anything works.

## Never

- Edit an applied migration, or change the schema in the Supabase dashboard. Fixes go in a **new** migration file.
- Create a table without RLS **and** explicit grants **and** tests in `tests/db`.
- Import a secret (`SUPABASE_SECRET_KEY`, `TMDB_READ_TOKEN`, `ANTHROPIC_API_KEY`) into anything that can reach the browser. Secrets never go in code, commits, issues, chats or docs.
- Skip the signed-in user check in a Server Action or Route Handler. Use `src/lib/auth/dal.ts`.
- Run `DELETE`, `DROP`, `TRUNCATE` or bulk `UPDATE` against production.
- Commit straight to `main`, force-push, or rewrite shared history.
- Add a dependency without saying why in the PR.
- Send user-written text (reviews, list names, bios) to Claude as instructions. It is data, not a prompt.

## Stop and ask Tom first

Write the question in `docs/open-questions.md`, add it to **Needs you** in `TOM.md`, then work on something else. Ask before you:

- add anything that costs money, or raise a spending cap
- delete user data or production resources
- change Supabase Auth settings, domains, or email sending
- reverse or change a decision in `docs/decisions.md`
- open more than one PR containing a migration at a time

Everything else: decide, record the decision, keep going.

## Database changes

Follow `docs/database.md` exactly. In short: new file in `supabase/migrations` → apply → rename the local file to the timestamp Supabase recorded → verify the checksum → run the Supabase security advisor → update `docs/database.md`. Only one open migration PR at a time. (PWW 1's schema drifted from its migrations; this is how we stop that happening again.)

## Keep the docs current

PWW keeps changing, so the docs change with it. **A change isn't done until the docs match it.** Tom reads the docs to understand what agents did, and the next agent reads them to know what's true. A stale doc misleads both.

**Same PR.** If you change something in the left column, update the doc on the right in the same PR:

| You changed | Update |
|---|---|
| Schema, RLS, grants, migrations | `docs/database.md` |
| Environment variables | `docs/env.md` and `.env.example` |
| A choice between real alternatives | `docs/decisions.md` (new entry) |
| What a feature does or looks like | its spec in `docs/specs/`, `docs/product.md`, `docs/how-it-works/` |
| Commands, scripts, folder layout | this file: *Commands* and *Where things live* |
| Services, spend, caps | `docs/costs.md` |
| Auth, secrets, anything security-related | `docs/security.md`, `docs/auth.md` |
| How the pieces connect | `docs/architecture.md` |
| External APIs (TMDB, JustWatch, Claude, email) | `docs/integrations.md` |
| A new term | `docs/glossary.md` |

**Wrong doc? Fix it now.** If a doc doesn't match the code or a newer decision, correct it in your PR. Don't work around it and don't leave it for later.

**When docs and code disagree:**
- Facts about the code (commands, files, scripts, versions): the code wins. Correct the doc.
- Rules and process: the docs win. Change the code, or ask.
- Product or design: don't pick silently. Add it to `docs/open-questions.md` and to *Red flags* in `TOM.md`.

**Date it.** Every doc has a `**Last updated:**` line under its title. Change it whenever you edit the doc.

**Enforced.** CI runs `scripts/docs-check.sh` on every PR. It fails if migrations, `.env.example` or `package.json` scripts change without the matching doc, or if code changes without a `docs/handoff.md` entry and a `TOM.md` update. If a change really has no doc impact, put `no-doc-impact: <reason>` on its own line in the PR description.

## Definition of done

- [ ] Docs match the change (see *Keep the docs current*); every doc you touched has today's *Last updated* date
- [ ] `npm run check` and `npm run test:db` pass
- [ ] New tables/policies have RLS tests (owner, other user, signed out, anonymous guest)
- [ ] UI changes checked on desktop and phone widths
- [ ] Acceptance criteria in the spec are all met, or the gaps are listed
- [ ] `docs/how-it-works/` updated for anything a user would notice
- [ ] Any choice you made is in `docs/decisions.md`
- [ ] PR uses the template
- [ ] **End-of-session updates:** `docs/status.md`, a new `docs/handoff.md` entry, `TOM.md`, and `CHANGELOG.md` if users would notice

## Writing for Tom

`TOM.md` is for Tom, not for agents. Follow its rules at the bottom: plain English, at most 4 bullets per session, honest about anything broken or skipped, no secrets.

## More rules

`docs/workflow.md` (branches, PRs, multi-agent) · `docs/security.md` · `docs/conventions.md` · `docs/testing.md` · `docs/glossary.md` (use these exact terms)
