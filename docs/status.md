# Status board

The agents' working board. Tom's plain-English version is `TOM.md`.

**Last updated:** 25 Nov 2026

## In progress (claims)

Claim a row **before** you start. Remove it when the PR merges or you hand off. If a claim is more than 3 days old with no handoff entry, treat it as abandoned and note that in `handoff.md`.

| Task | Spec | Branch | Files / areas touched | Claimed | By |
|---|---|---|---|---|---|

## Next up

Tasks ready to build, in order. `/plan-phase` writes them; `/start next` takes the top unclaimed row. Remove a row when its PR merges.

| # | Task | Spec criteria | Files / areas | Depends on | Parallel-safe |
|---|---|---|---|---|---|
| 1 | Update pass item 1: patch updates (see *Update pass*) | n/a | `package.json`, `package-lock.json` | none | No (touches `package.json`) |
| 2 | Update pass item 2: `npm audit fix` for dev tools (no `--force`) | n/a | `package-lock.json` | 1 | No |
| 3 | Emerald + brass palette. **Built, PR open** on `feat/emerald-palette` (stacked on the install-hook PR) | n/a | `src/app/globals.css`, `src/app/layout.tsx`, `docs/design.md` | install-hook PR | Yes |

## Blocked

| What | Blocked on | Since |
|---|---|---|
| Live TMDB data | TMDB read token not in Vercel yet | 3 Nov 2026 |
| Vercel project | Tom to set up (`setup.md`); needs the TMDB token | 3 Nov 2026 |

## Phases

| # | Phase | Spec | Status | Notes |
|---|---|---|---|---|
| 0 | Foundations | n/a | Built, tested, on `main` (PR #2), out of date (Tom, 17 Nov), not deployed | Accounts, search, trending, title pages, catalogue tables, usage tracking |
| 1 | Ratings & reviews | `specs/01-ratings-reviews.md` | Not started | |
| 2 | Lists & watchlist | `specs/02-lists-watchlist.md` | Not started | |
| 3 | Onboarding & recommendations | `specs/03-onboarding-recommendations.md` | Not started | Needs `ANTHROPIC_API_KEY` |
| 4 | Streaming advice | `specs/04-streaming-advice.md` | Not started | |
| 5 | Watching together | `specs/05-watching-together.md` | Not started | Anonymous guests |
| 6 | Social | `specs/06-social.md` | Not started | |
| 7 | Polish & launch | `specs/07-polish-launch.md` | Not started | Supabase Pro, domain, SMTP |

## Production snapshot

| Item | Value |
|---|---|
| Supabase project | `pww` · ref `qlisfitmvovfzkljmsfm` · us-east-1 · Postgres 17 · free plan · active (restored 18 Nov 2026; pauses again after ~7 days without traffic) |
| Applied migrations | `20261103233128_foundations`, `20261103233622_usage_days_self_read` (checksums in `database.md`) |
| Last security advisor run | 18 Nov 2026: clean. Performance advisor: INFO only (unindexed FK `title_availability_provider_id_fkey`; 2 unused indexes, expected with no traffic) |
| Live schema check | 18 Nov 2026: both migration checksums in production match the repo files |
| GitHub | `merlin-ec/Pww2C` (public). Claude GitHub App installed 17 Nov. `main` = Foundations baseline (PR #2) + docs (PR #1). CI: `ci.yml` (app + database jobs) and `docs-check.yml`, both green |
| Vercel | Not set up |
| Live URL | None |

## Update pass

Checked on 18 Nov 2026 against the Foundations baseline (`3933a2c`). Work top to bottom; one PR per numbered item. Tom's own changes (`open-questions.md` #9) go first once he gives them.

**Already green:** `npm run lint`, `npm run typecheck`, `npm test` (18), `npm run test:db` (18, on Postgres 16 locally and 17 in CI), `npm run build`, `npm audit --omit=dev --audit-level=high` (0 vulnerabilities). The first CI run on GitHub passed both jobs.

| # | Item | Detail | Risk |
|---|---|---|---|
| 1 | Patch/minor updates | `next` + `eslint-config-next` 16.4.5 → 16.4.6 · `react`/`react-dom` 19.3.0 → 19.3.1 · `@supabase/supabase-js` 2.118 → 2.119 · `tailwindcss` + `@tailwindcss/turbopack` 4.3.4 → 4.3.5 · `supabase` CLI 3.0 → 3.2 | Low. Serial-only (touches `package.json`) |
| 2 | Dev-tool vulnerabilities | 17 (11 high, 6 moderate), all dev-only: picomatch/minimatch ReDoS via `eslint-config-next`, `typescript-eslint` and `vitest`/`vite`. Run `npm audit fix` (no `--force`: it would downgrade `eslint-config-next` to 14). The rest waits on upstream releases | Low (not shipped) |
| 3 | Major upgrades, decide later | TypeScript 5.9 → 7.0 (native compiler) and ESLint 9 → 10: wait for Next.js 16 support. Keep `@types/node` on 22 to match the Node 22 runtime | Medium. Needs a `decisions.md` entry |
| 4 | ~~Live schema check~~ | Done 18 Nov: checksums match, security advisor clean | Done |
| 5 | Deploy | Vercel project, env vars, TMDB token (`setup.md`) | Blocked on Tom |
| 6 | Docs gardener | Scheduled cloud task that compares docs with code and opens a fix-up PR. Described in `workflow.md`; not switched on | Needs Tom's OK |
| 7 | Index `title_availability.provider_id` | Performance advisor INFO (unindexed FK). Add in the next migration PR, not a migration on its own | Low. Use `db-migrator` |

## Known issues

| Issue | Impact | Tracked in |
|---|---|---|
| Free Supabase projects pause after ~1 week idle | DB unreachable until restored | `runbook.md` |
