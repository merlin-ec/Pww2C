# Integrations

**Last updated:** 17 Nov 2026

Every outside service PWW talks to. For each one: what we use it for, where the code is, the limits, and the terms we must follow.

## TMDB: films, shows, people, posters

| | |
|---|---|
| Used for | Search, trending, title details, cast/crew, posters |
| Code | `src/lib/tmdb/` (server only), `src/lib/catalogue/` |
| Auth | `TMDB_READ_TOKEN` (API Read Access Token), server only |
| Caching | Details 1 day; search and trending 1 hour (`'use cache'`). **Terms cap caching at 6 months** |
| Images | Direct from TMDB's CDN with `srcset` |
| Terms we must follow | Attribution line in the footer/README; **TMDB logo on the About page before launch**; key requested for personal/non-commercial use |
| If it's down | Sections show a notice; search and other pages still work |
| Testing | `TMDB_API_BASE_URL` points tests at a fake TMDB server |

**Open question:** if PWW ever makes money, the TMDB key terms need reviewing (see `open-questions.md`).

## JustWatch (via TMDB): where to watch

| | |
|---|---|
| Used for | Streaming/rent/buy availability per country |
| Code | Through TMDB's watch-provider data |
| Countries | US, CA, GB, AU, NZ, IE |
| Terms we must follow | Credit JustWatch as the source wherever availability is shown |

## Supabase: database and auth

| | |
|---|---|
| Project | `pww`, ref `qlisfitmvovfzkljmsfm`, us-east-1, Postgres 17 |
| Plan | Free while building, **Pro ($25/mo) at launch** for backups and no pausing |
| Keys | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (public by design), `SUPABASE_SECRET_KEY` (server only, bypasses RLS) |
| Gotcha | Free projects **pause after ~1 week with no traffic**. See `runbook.md` |

## Vercel: hosting

| | |
|---|---|
| Deploys | Push to `main` → production; every PR → preview URL |
| Plan | Hobby (free) while building. Hobby is for non-commercial use, so revisit if PWW makes money |
| Settings | Environment variables (see `env.md`); later, the custom domain |

## Anthropic: Claude API (phase 3)

| | |
|---|---|
| Used for | Suggesting "deep cuts" from a user's favourites, and explaining recommendations |
| Model | Claude Haiku 5.5 (`claude-haiku-5-5`) |
| Key | `ANTHROPIC_API_KEY`, server only (not created yet) |
| Budget | **$10/month hard cap**, with engine-only fallback when hit. See `recommendations.md` |
| Rule | User text is data, never instructions; output is matched to real TMDB titles before display |

## Resend: email (before inviting real users)

| | |
|---|---|
| Used for | Sign-up confirmation and password-reset emails via Supabase custom SMTP |
| Why | Supabase's built-in email sends only a couple of messages an hour |
| Gotcha | Turn **off** link tracking (it breaks one-time links) |
| Needs | A domain (~$10–20/yr) with DNS records |

## Adding a new integration

Before you add one, add a section here (purpose, code location, keys, limits, terms, failure behaviour), add its keys to `env.md` and its cost to `costs.md`. Get Tom's OK if it costs money.
