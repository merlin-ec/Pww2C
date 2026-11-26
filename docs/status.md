# Status board

The agents' working board. Tom's plain-English version is `TOM.md`.

**Last updated:** 25 Nov 2026

## In progress (claims)

Claim a row **before** you start. Remove it when the PR merges or you hand off. If a claim is more than 3 days old with no handoff entry, treat it as abandoned and note that in `handoff.md`.

| Task | Spec | Branch | Files / areas touched | Claimed | By |
|---|---|---|---|---|---|
| Plan phase 1 | `specs/01-ratings-reviews.md` | `docs/plan-phase-1` | `docs/` (status, specs 01 + 06, decisions, open questions, glossary, setup), `TOM.md` | 25 Nov 2026 | Claude (Tom's laptop session) |

## Next up

Tasks ready to build, in order. `/plan-phase` writes them; `/start next` takes the top unclaimed row whose *Depends on* tasks have merged. Remove a row when its PR merges.

Phase 1 order: 1 and 2 together → 3 → 4 and 5 together → 6. Only one migration PR may be open at a time (task 1 is the only one).

| # | Task | Spec criteria | Files / areas | Depends on | Parallel-safe |
|---|---|---|---|---|---|
| 1 | **Phase 1 schema** (use the `db-migrator` agent): `profiles.visibility`, `ratings`, `reviews`, `watch_logs`, `private.can_view()`, RLS, grants, review rate-limit trigger, plus the `title_availability.provider_id` index (update pass #7). RLS tests for owner, other member, signed out, guest, and a private profile. Regenerate `database.types.ts`. Exact design: spec 01 → *Data changes* | Database enforcement (rate limit, caps, owner-only writes, visibility reads) | `supabase/migrations/`, `tests/db/`, `src/lib/supabase/database.types.ts`, `docs/database.md` | none | Yes (with 2) |
| 2 | **Title page extras:** TMDB score badge and a **Find trailer** link (YouTube search for "<title> <year> trailer"). Desktop + phone | TMDB score; Find trailer | `src/components/title/` | none | Yes (with 1) |
| 3 | **Phase 1 server logic:** `src/lib/taste/` read helpers (visibility-aware), Server Actions: rate / change / remove, save / delete review, log / delete watch, set visibility. Zod rules (1–10 half-star scale, 280 / 5,000 caps, no future dates). Server-side catalogue upsert in `src/lib/catalogue/store.ts` (admin client, TMDB data fetched on the server). Unit tests | Half-star scale; server side of rate, review, log, visibility | `src/lib/taste/`, `src/lib/catalogue/store.ts`, `tests/unit/` | 1 | No |
| 4 | **Your take** block on the title page: accessible half-star picker, short thought, **Log this watch** (date, defaults to today), review editor (add / edit / delete), the member's rating next to the TMDB score, and a sign-up / log-in prompt for visitors that returns to the title. Desktop + phone | Rate / change / remove; reviews; *Your take*; logged watches; own rating beside TMDB score; signed-out prompt | `src/components/title/` (new `your-take*` files), `title-screen.tsx` | 2, 3 | Yes (with 5) |
| 5 | **Profile page** `/u/[username]`: ratings, reviews and watch diary (newest first). "This profile is private" for private profiles. Visibility switch in Account. A "Your profile" link in the account menu. Desktop + phone | Profile page; visibility setting; visitors see public profiles | `src/app/u/`, `src/app/account/`, `src/components/account-menu.tsx` | 3 | Yes (with 4) |
| 6 | **Phase 1 wrap-up:** `docs/how-it-works/` page for ratings, reviews and the diary; `CHANGELOG.md`; check every spec 01 criterion end to end and tick it | All (verification) | `docs/`, `CHANGELOG.md` | 4, 5 | No |

## Blocked

| What | Blocked on | Since |
|---|---|---|
| Live TMDB data | TMDB read token not in Vercel yet | 3 Nov 2026 |
| Vercel project | Tom to set up (`setup.md`); needs the TMDB token | 3 Nov 2026 |

## Phases

| # | Phase | Spec | Status | Notes |
|---|---|---|---|---|
| 0 | Foundations | n/a | Built, tested, on `main` (PR #2); update pass done 25 Nov (PRs #5–#7), emerald look (PR #6); not deployed (Vercel: Tom) | Accounts, search, trending, title pages, catalogue tables, usage tracking |
| 1 | Ratings & reviews | `specs/01-ratings-reviews.md` | **Planned** (25 Nov): 6 tasks in *Next up* | Visibility: Everyone / Private |
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

**Already green:** `npm run lint`, `npm run typecheck`, `npm test` (18), `npm run test:db` (18, on Postgres 16 locally and 17 in CI), `npm run build`, `npm audit --omit=dev --audit-level=high` (0 vulnerabilities); full `npm audit` 0 since 25 Nov (update pass #2). The first CI run on GitHub passed both jobs.

| # | Item | Detail | Risk |
|---|---|---|---|
| 1 | ~~Patch/minor updates~~ | Done 24 Nov on `chore/patch-updates`: `next` + `eslint-config-next` 16.4.6, `react`/`react-dom` 19.3.1, `@supabase/supabase-js` 2.119.2, `tailwindcss` + `@tailwindcss/turbopack` 4.3.5, `supabase` CLI 3.4.0, `@types/react` 19.3.1, `vitest` 5.1.1 | Done (PR #5, merged 25 Nov) |
| 2 | ~~Dev-tool vulnerabilities~~ | Done 25 Nov on `chore/audit-fix`: `npm audit fix` (no `--force`) moved `typescript-eslint` to 8.74 and its `minimatch` to 11. `npm audit`: **0 vulnerabilities** (was 17, then 7) | Done (PR #7, merged 25 Nov) |
| 3 | Major upgrades, decide later | TypeScript 5.9 → 7.0 (native compiler) and ESLint 9 → 10: wait for Next.js 16 support. Keep `@types/node` on 22 to match the Node 22 runtime | Medium. Needs a `decisions.md` entry |
| 4 | ~~Live schema check~~ | Done 18 Nov: checksums match, security advisor clean | Done |
| 5 | Deploy | Vercel project, env vars, TMDB token (`setup.md`) | Blocked on Tom |
| 6 | Docs gardener | Scheduled cloud task that compares docs with code and opens a fix-up PR. Described in `workflow.md`; not switched on | Needs Tom's OK |
| 7 | Index `title_availability.provider_id` | Performance advisor INFO (unindexed FK). Folded into phase 1 task 1 (the next migration) | Low. Use `db-migrator` |

## Known issues

| Issue | Impact | Tracked in |
|---|---|---|
| Free Supabase projects pause after ~1 week idle | DB unreachable until restored | `runbook.md` |
