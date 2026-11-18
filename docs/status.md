# Status board

The agents' working board. Tom's plain-English version is `TOM.md`.

**Last updated:** 18 Nov 2026

## In progress (claims)

Claim a row **before** you start. Remove it when the PR merges or you hand off. If a claim is more than 3 days old with no handoff entry, treat it as abandoned and note that in `handoff.md`.

| Task | Spec | Branch | Files / areas touched | Claimed | By |
|---|---|---|---|---|---|
| Docs starter pack + living docs rule | n/a | `docs/starter-pack` | `CLAUDE.md`, `TOM.md`, `CHANGELOG.md`, `docs/**`, `.github/`, `scripts/docs-check.sh` | 18 Nov 2026 | Claude (claude.ai, PWW 2 project) |

## Blocked

| What | Blocked on | Since |
|---|---|---|
| Foundations code on GitHub | Tom to download `pww-foundations.zip` from the 3 Nov chat (GitHub access fixed 17 Nov) | 3 Nov 2026 |
| Update pass (code + docs) | Code on GitHub, and Tom's answer to `open-questions.md` #9 | 17 Nov 2026 |
| Any database work | Supabase project `pww` is paused; Tom to restore | found 17 Nov 2026 |
| Live TMDB data | TMDB read token not in Vercel yet | 3 Nov 2026 |
| Vercel project | Foundations code not on GitHub yet | 3 Nov 2026 |

## Phases

| # | Phase | Spec | Status | Notes |
|---|---|---|---|---|
| 0 | Foundations | n/a | Built, tested, out of date (Tom, 17 Nov), not on GitHub or deployed | Accounts, search, trending, title pages, catalogue tables, usage tracking |
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
| GitHub | `merlin-ec/Pww2C` (public). Claude GitHub App installed 17 Nov; push works. `main` holds only GitHub's initial README until Foundations is pushed |
| Vercel | Not set up |
| Live URL | None |

## Known issues

| Issue | Impact | Tracked in |
|---|---|---|
| Free Supabase projects pause after ~1 week idle | DB unreachable until restored | `runbook.md` |
