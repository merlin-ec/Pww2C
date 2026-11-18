# Environment variables

**Last updated:** 17 Nov 2026

Real values live **only** in Vercel (Settings → Environment Variables) and in your local `.env.local` (gitignored). `.env.example` lists the names with no values. Keep this table, `.env.example` and Vercel in sync.

`NEXT_PUBLIC_` means the value is shipped to every browser. Only things that are safe to publish get that prefix.

| Name | Public? | Where to get it | Used by | Phase |
|---|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | `https://qlisfitmvovfzkljmsfm.supabase.co` | Supabase clients | 0 |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public (by design) | Supabase → Project Settings → API Keys | Supabase clients | 0 |
| `SUPABASE_SECRET_KEY` | **Secret** (bypasses RLS) | Supabase → API Keys → create a secret key named `vercel` | Server-only admin jobs (e.g. account deletion) | 0 |
| `TMDB_READ_TOKEN` | **Secret** | themoviedb.org → Settings → API → API Read Access Token | `src/lib/tmdb/` | 0 |
| `NEXT_PUBLIC_SITE_URL` | Public | Your production URL | Auth redirects, share links | 7 (domain) |
| `TMDB_API_BASE_URL` | n/a | Tests only: points at the fake TMDB server | Tests | 0 |
| `ANTHROPIC_API_KEY` | **Secret** | console.anthropic.com → API keys (set a spend limit too) | Recommendations | 3 |

## Rules

- A new variable needs a row here, an entry in `.env.example` and a note in the PR.
- Secrets are read only in `server-only` modules.
- To rotate a secret, see `runbook.md` → *A secret leaked*.
