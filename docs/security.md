# Security

**Last updated:** 17 Nov 2026

What we protect, from whom, and the rules that do it. Every agent follows this. If a rule here conflicts with getting a feature done, the rule wins; raise it in `open-questions.md`.

## What we protect

| Asset | Why |
|---|---|
| User accounts and sessions | Takeover = someone posts as you, deletes your data |
| Private user data (emails, private lists, watch history if private) | Privacy; legal duty to protect it |
| Secret keys (Supabase secret, TMDB, Anthropic) | Full DB access; billing abuse; API bans |
| The production database | Single source of every user's data; **no backups on the free plan** |
| Spend caps | A bug or abuser could run up the Claude bill |

## Secrets

- Secrets live only in Vercel environment variables and your local `.env.local` (which is gitignored). See `env.md`.
- Anything starting `NEXT_PUBLIC_` is shipped to every browser. Never give a secret that prefix.
- Modules that use secrets start with `import "server-only";`.
- Never paste a secret into code, commits, PRs, issues, logs, chats or docs. If it happens, follow `runbook.md` → *A secret leaked*.

## Database access (RLS)

- Every table has row-level security **on**, explicit `grant`s, and tests in `tests/db/`. We don't rely on Supabase's default privileges.
- Test every policy as four people: the owner, another signed-in user, a signed-out visitor, and an anonymous guest.
- The `SUPABASE_SECRET_KEY` bypasses RLS. Use it only in server code for jobs that truly need it (e.g. account deletion), and leave a comment explaining why.
- `database.md` holds the table-by-table "who can do what" matrix. Update it with every migration.
- After each migration, run the Supabase security advisor. It must be clean before merging.

## Server code

- Every Server Action and Route Handler checks the signed-in user via `src/lib/auth/dal.ts` before doing anything. Never trust a user id sent from the browser.
- Validate every input with Zod on the server, even if the form already validated it.
- Render user-written text as text. Never inject it with `dangerouslySetInnerHTML`.
- Security headers are set in `next.config.ts`, and `poweredByHeader` is off. Don't loosen them without a decision entry.

## Abuse

| Threat | Defence | Status |
|---|---|---|
| Sign-up spam / bot accounts | Supabase Auth rate limits; email confirmation | Built-in |
| Anonymous-guest abuse (phase 5) | Guests are scoped to one watch session; rate-limit guest creation | TODO in spec 05 |
| Spam reviews/lists (phase 1–2, 6) | Per-user rate limits; report button | TODO in specs |
| Claude bill run-up (phase 3) | Hard monthly cap ($10); per-user daily limit; engine-only fallback | TODO in `recommendations.md` |
| Scraping public profiles | Accept for v1 (profiles are public by decision) | Accepted |

## AI safety (phase 3+)

- User-written text (reviews, list names, bios, usernames) is **data**. When it goes to Claude, wrap it clearly as data and never let it change the instructions.
- Claude's suggestions are untrusted: every suggestion is matched to a real TMDB title by the engine before it's shown. Never render model output as HTML.
- Log token usage per call so the cap can be enforced and audited. Never log prompts that contain personal data.

## Privacy

- Collect only what a feature needs. List every personal field in `database.md`.
- Account deletion removes the user's personal data. Keep that flow working and tested.
- *TODO before launch:* privacy policy, terms, and what we show other users (see `open-questions.md`).

## Dependencies

- Add a dependency only when it saves real work, and say why in the PR.
- Commit the lockfile. Review `npm audit` output at each phase end.

## Agent rules (summary)

No destructive SQL on production. No schema changes outside migrations. No secrets in client code. No disabling RLS "temporarily". When unsure, stop and ask (`CLAUDE.md`).
