# Runbook

**Last updated:** 17 Nov 2026

What to do, step by step, when deploying or when something breaks.

## Deploy

- Merge to `main` and Vercel deploys production automatically.
- Each PR gets a preview URL. Check it before merging.
- Migrations are applied separately (see `workflow.md` → *Database changes*). Apply the migration **before** merging code that needs it.

## Roll back

**App:** Vercel → Deployments → pick the last good deployment → *Promote to Production* (instant rollback). Then revert the bad PR on `main`.

**Database:** never edit or "undo" an applied migration. Write a **new** migration that reverses the change, with tests. If data was lost: the free plan has **no backups**, which is one reason Pro is required at launch.

## The database is paused

Free Supabase projects pause after about a week with no traffic.

1. Supabase dashboard → project `pww` → **Restore** (free, takes a few minutes). An agent with the Supabase connector can also restore it, with Tom's OK.
2. Once it's healthy, run the security advisor to confirm it's still clean.

It stops happening once the site has regular traffic, or on Pro.

## TMDB is down or slow

Nothing to do. Title sections show a notice, and the rest of the site works. If it lasts hours, check TMDB's status and note it in `TOM.md`.

## The Claude cap is reached (phase 3+)

Recommendations fall back to engine-only automatically. Check `TOM.md` → *Money*. Raising the cap needs Tom's OK.

## Sign-up or reset emails aren't arriving

- Before custom SMTP: Supabase's built-in email sends only a couple of messages an hour. This is expected.
- After SMTP: check Resend logs; confirm link tracking is **off**; confirm the Site URL and redirect URLs in Supabase.

## A secret leaked

Act immediately, before cleaning up history.

1. **Supabase secret key:** Supabase → API Keys → create a new secret key → put it in Vercel → redeploy → delete the old key.
2. **TMDB token:** regenerate on themoviedb.org → update Vercel → redeploy.
3. **Anthropic key:** revoke it in the console → create a new one → update Vercel → redeploy.
4. Remove it from wherever it leaked, record what happened in `handoff.md`, and flag it in `TOM.md` → *Red flags*.

## Something else is broken in production

1. Check Vercel → the deployment's logs, and Supabase → Logs.
2. If a recent deploy caused it, roll back first and investigate after.
3. Write what happened, the impact and the fix in `handoff.md`; add it to `TOM.md` if users were affected.
