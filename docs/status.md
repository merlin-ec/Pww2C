# Status board

The agents' working board. Tom's plain-English version is `TOM.md`.

**Last updated:** 18 Nov 2026

## In progress (claims)

Claim a row **before** you start. Remove it when the PR merges or you hand off. If a claim is more than 3 days old with no handoff entry, treat it as abandoned and note that in `handoff.md`.

| Task | Spec | Branch | Files / areas touched | Claimed | By |
|---|---|---|---|---|---|
| Prototype → specs | n/a | `docs/prototype-reference` | `docs/specs/01`–`06`, `docs/product.md`, `docs/design.md`, `docs/decisions.md`, `docs/open-questions.md`, `TOM.md` | 18 Nov 2026 | Claude (claude.ai, PWW 2 project) |

## Blocked

| What | Blocked on | Since |
|---|---|---|
| Look of new screens | Tom's design direction (`open-questions.md` #10); until then keep theatre lobby | 18 Nov 2026 |
| Any database work | Supabase project `pww` is paused; Tom to restore | found 17 Nov 2026 |
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
| Supabase project | `pww` · ref `qlisfitmvovfzkljmsfm` · us-east-1 · Postgres 17 · free plan · **paused** |
| Applied migrations | `20261103233128_foundations`, `20261103233622_usage_days_self_read` (checksums in `database.md`) |
| Last security advisor run | 3 Nov 2026: clean |
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
| 4 | Live schema check | Supabase is paused. After Tom restores it: re-verify both migration checksums against production (files match the 3 Nov record) and rerun the security + performance advisors | Blocked on Tom |
| 5 | Deploy | Vercel project, env vars, TMDB token (`setup.md`) | Blocked on Tom |
| 6 | Docs gardener | Scheduled cloud task that compares docs with code and opens a fix-up PR. Described in `workflow.md`; not switched on | Needs Tom's OK |

## Known issues

| Issue | Impact | Tracked in |
|---|---|---|
| Free Supabase projects pause after ~1 week idle | DB unreachable until restored | `runbook.md` |
