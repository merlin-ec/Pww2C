# Workflow

**Last updated:** 24 Nov 2026

How work moves from idea to production, especially when several agents work in parallel.

## Branches

- `main` is always deployable. Every push to `main` deploys to production on Vercel.
- One task = one branch = one PR. Name branches `feat/<phase>-<thing>`, `fix/<thing>`, `docs/<thing>`, or `chore/<thing>`.
  Example: `feat/01-ratings-form`.
- Branch from the latest `main`. Rebase on `main` before opening the PR.
- Never commit straight to `main`, force-push a shared branch, or rewrite history others have pulled.

## Running agents

Tom starts agents from the **Claude app → Code** tab on his phone (or claude.ai/code). There are two places they can run:

| Where | Pick in the Code tab | Good for | Needs |
|---|---|---|---|
| **Cloud** | the `merlin-ec/Pww2C` repo | Most work. Runs on Anthropic's machines, so Tom's laptop can be off. Several at once. | GitHub access (done). Packages install themselves: see the SessionStart hook below |
| **Tom's laptop** | the **PWW (laptop)** session | Anything that needs local tools or logins (e.g. the Supabase CLI) | Laptop on and online; `~/Downloads/connect-claude.sh` has been run |

What to type:

- `/start next`: the agent picks the top unclaimed task from `status.md` → *Next up*, or the *Update pass*.
- `/start <task in plain words>`: a specific job.
- `/plan-phase N`: split a phase into PR-sized tasks before building it.
- `/finish`: checks, independent review, docs, PR. `/start` ends with it anyway.

What's in `.claude/` and why:

- **`settings.json`** lets agents run checks, commit, push their own branch and open PRs without asking. Installing packages, rebasing, merging and the Supabase CLI always ask. Pushing to `main`, force-pushing, `rm -rf` and reading `.env` files are blocked. These rules aren't a security boundary; branch protection on `main` is.
- **The SessionStart hook** in `settings.json` runs `scripts/install_pkgs.sh` when a session starts or resumes. On cloud machines it runs `npm ci`, skipping it when `package.json`, `package-lock.json` and the script are unchanged since the last install (about 20 s the first time, instant after). On Tom's laptop it does nothing. If the install fails, the session still starts and `npm run check` fails, so run `npm ci` yourself.
- **`reviewer`** reviews every branch before its PR, independently of the agent that wrote it.
- **`db-migrator`** owns every schema change and follows `database.md`.

Tom reviews and merges PRs in the GitHub app. Agents don't merge their own PRs unless Tom says so.

## Running several agents at once

The PWW 1 lesson: parallel agents broke the schema and tangled git. These rules prevent it.

1. **Claim before you code.** Add a row to *In progress* in `status.md` listing the files and areas you'll touch.
2. **No overlapping claims.** If another claim covers the same files, tables or route folder, pick other work.
3. **One migration PR at a time.** Only one open PR may contain a file in `supabase/migrations`. Others wait. Migration timestamps and the live schema must stay in a single line.
4. **Shared files are edited last and narrowly.** Files like `src/proxy.ts`, `src/lib/supabase/database.types.ts`, `next.config.ts`, `package.json` and `globals.css` get small, focused edits. Regenerate `database.types.ts`; never hand-edit it.
5. **Hand off in writing.** If you stop mid-task, write a `handoff.md` entry and keep the claim until another agent or Tom takes it.
6. **Parallel-safe work:** separate route folders, separate `specs/`, docs, tests. **Serial-only work:** migrations, auth, the proxy, dependency upgrades.

## Pull requests

- Use the template (`.github/pull_request_template.md`). Every section gets filled in, even if the answer is "none".
- Keep PRs small enough to review in about 10 minutes. Split big phases into several PRs.
- CI must be green: `npm run check`, `npm run test:db`, `npm run build`.
- Vercel posts a preview link on each PR. Click through the changed pages before merging.
- Squash-merge. The squash message is a one-line summary of what changed for users.

## Database changes

`database.md` holds the full procedure. In order:

1. Write a new migration in `supabase/migrations/` (never edit an applied one).
2. Add RLS tests in `tests/db/` and make them pass locally.
3. Apply it to production.
4. Rename the local file to the timestamp Supabase recorded.
5. Verify the checksum of the production copy against the file.
6. Run the Supabase security and performance advisors, then fix anything they flag in a **new** migration.
7. Regenerate `src/lib/supabase/database.types.ts`.
8. Update `database.md` and `status.md` → *Production snapshot*.

## Keeping the docs current

Tom's rule: the docs are always being updated, because PWW is always changing. Three things keep them honest.

1. **Every PR.** The author updates the matching docs in the same PR. The table in `CLAUDE.md` → *Keep the docs current* lists which change needs which doc. A doc that turns out to be wrong gets fixed in whatever PR finds it.
2. **Every session.** Before stopping, update `docs/status.md`, add a `docs/handoff.md` entry, update `TOM.md`, and add to `CHANGELOG.md` if users would notice. Do this even if the answer is "nothing changed".
3. **CI.** The *Docs check* workflow (`.github/workflows/docs-check.yml`, logic in `scripts/docs-check.sh`) fails a PR when:
   - `supabase/migrations/` changes without `docs/database.md`
   - `.env.example` changes without `docs/env.md`
   - `package.json` scripts change without `CLAUDE.md`
   - anything outside `docs/` and the root `*.md` files changes without a new `docs/handoff.md` entry and a `TOM.md` update

   Escape hatch, for true no-impact changes only: a line `no-doc-impact: <reason>` in the PR description. Reviewers should question it.

A recurring "docs gardener" agent can also compare the docs with the code and open a `docs/gardening-<date>` PR fixing any drift. It runs as a scheduled cloud task once Tom turns it on.

**Which source wins** when docs and code disagree: code wins on facts about the code; docs win on rules and process; product and design conflicts go to Tom through `open-questions.md` and `TOM.md` → *Red flags*.

## Decisions

Add one line to `decisions.md`, under the right section, whenever you choose between real alternatives:

```markdown
- **<What we decided.>** Why, in a sentence, and what we didn't choose.
```

Never rewrite an old decision. Add a new one that supersedes it, and changing a locked decision needs Tom (see `CLAUDE.md` → *Stop and ask*).

## Releases

- Every merge to `main` is a release. Add user-visible changes to `CHANGELOG.md` under *Unreleased*, and tag a version at the end of each phase.
- If a release breaks production, follow `runbook.md` → *Roll back*.
