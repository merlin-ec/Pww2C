---
name: finish
description: Finish a PWW task. Runs the checks, gets an independent review, updates the docs, then pushes and opens the pull request. Use at the end of every task or session, or when Tom says "finish", "wrap up" or "open the PR".
---

# Finish a PWW task

1. **Checks.** Run `npm run check` and `npm run build`. Also run `npm run test:db` if anything touched the database, RLS or `tests/db`. Fix failures; never skip or weaken a test to make it pass.

2. **Independent review.** Ask the `reviewer` agent to review this branch against `origin/main`. Fix every *Must fix*. Anything from *Should fix* that you leave goes in the PR's *Risks / not done*.

3. **Docs.** Go down the table in `CLAUDE.md` → *Keep the docs current* and update every doc your change touches, with today's *Last updated*. Then do the end-of-session set:
   - `docs/status.md`: remove your claim, update the phase progress and *Next up*
   - `docs/handoff.md`: a new entry at the top, using its template
   - `TOM.md`: plain English, at most 4 bullets, honest about anything broken or skipped
   - `CHANGELOG.md`, if users would notice

4. **Docs check.** `BASE_SHA=origin/main HEAD_SHA=HEAD bash scripts/docs-check.sh` must pass.

5. **Push and open the PR.** Commit, then `git push -u origin <branch>`. Never push to `main` and never force-push. Open the PR with `.github/pull_request_template.md`, using `gh pr create` or the session's *Create PR* button. Give it a plain-English title.

6. **Tell Tom** in 2–4 lines: what changed for users, the PR link, and anything he needs to do or decide. Don't merge it yourself unless Tom has said to.
