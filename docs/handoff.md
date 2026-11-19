# Session handoffs

**Last updated:** 18 Nov 2026

One entry per session, **newest first**. Agents write here at the end of every session. Write it so the next agent (or Tom) can continue without reading the chat.

## Template

```markdown
## YYYY-MM-DD: <short title>
**Agent/session:** <link or id>  ·  **Branch/PR:** <branch> / <PR #>  ·  **Spec:** <specs/…>

**Done**
- …

**Changed files / migrations**
- …

**Decisions made** (also added to decisions.md)
- …

**Not done / skipped, and why**
- …

**Risks or things that look wrong**
- …

**Tom should check**
- …

**Next step**
- …
```

---

## 2026-11-18: Agent kit
**Agent/session:** claude.ai (PWW 2 project)  ·  **Branch/PR:** `chore/agent-kit` (includes `docs/prototype-reference`) / see GitHub  ·  **Spec:** n/a

**Done**
- `.claude/settings.json`: allow routine commands (npm scripts, git read/commit/branch push, `gh pr create/view/checks`); ask for `npm install`, rebase, reset, merge, `gh pr merge`, Supabase CLI; deny pushes to `main`, force-push, `git reset --hard`, `rm -rf`, reading `.env` files. Syntax checked against the Claude Code permissions docs (deny → ask → allow; `*` after the subcommand).
- `.claude/agents/reviewer.md` (read-only, runs before every PR) and `db-migrator.md` (all schema changes; stops before production if Supabase isn't reachable).
- `.claude/skills/start`, `finish`, `plan-phase`.
- `docs/status.md` → new *Next up* table with the first three tasks. `CLAUDE.md`, `workflow.md` (*Running agents*), `decisions.md` and `TOM.md` (*Start building from your phone*) updated.
- This PR also carries the prototype → specs work, so Tom merges once.
- Restored the Supabase project (was INACTIVE) at Tom's request via the Supabase connector. Live check: both `schema_migrations` checksums match `sha256sum` of the repo files; security advisor: no lints; performance advisor: INFO only (unindexed FK on `title_availability.provider_id`, 2 unused indexes). Queued the index as *Update pass* #7.

**Changed files / migrations**
- `.claude/**`, docs. No app code or schema changes.

**Not done / skipped, and why**
- Cloud environment setup script and branch protection on `main` are Tom's (claude.ai and GitHub settings). Listed as *Needs you* #0.
- Docs gardener scheduled task still not switched on (needs Tom's OK).

**Risks or things that look wrong**
- Permission rules aren't a security boundary (per the docs). The real guard is branch protection, which isn't on yet.
- Cloud sessions may not have `gh`; `/finish` falls back to the session's *Create PR* button.
- `npm run test:db` needs Postgres, which cloud sessions may not have. CI runs it on every PR anyway.

**Tom should check**
- `TOM.md` → *Needs you* #0.

**Next step**
- Tom: `/start next` from the Code tab, which takes *Next up* #1 (patch updates).

---

## 2026-11-18: Prototype written into the specs
**Agent/session:** claude.ai (PWW 2 project)  ·  **Branch/PR:** `docs/prototype-reference` / see GitHub  ·  **Spec:** 01–06

**Done**
- Tom shared a ChatGPT-built prototype (<https://pww-picture-house.primemockingbird.chatgpt.site>): "shows the idea of what I want really well", but he doesn't like the look. Went through every view in the built-in browser (home, Discover, title page, 4-step onboarding, watch room, collections, streaming, community, profile, account). I used test values ("Test", "Test room") in the demo, and they're stored only in that browser.
- `product.md` → *Prototype*: what it shows by area, and the rule: features and flows yes, look no; earlier decisions win on conflicts.
- Specs 01–06 filled in from it, every item marked *(prototype)*: half-star ratings, short thought, watch diary; Watchlist/Collections/Watched/Favorites, private until shared; 4-step onboarding with skipped genres honoured everywhere; taste-fit score, Not for me, Under 2 hours, Evening Edit, Follow the thread; streaming rotation; watch-room picking (loves/no-thank-yous → group fit → I'm in / Pass → unanimous yes); follow taste, taste-match after 3 shared ratings, feed, report, profile stats, export.
- Separately: Tom ran `~/Downloads/connect-claude.sh`. Remote Control server "PWW (laptop)" runs in tmux on his laptop.

**Changed files / migrations**
- Docs only.

**Decisions made**
- The prototype is the product reference (`decisions.md`). Open questions #6 (onboarding) and #8 (export) answered from it.

**Not done / skipped, and why**
- Design tokens in `design.md` still TODO (unchanged here).
- Prototype copy and assets not copied (look is out; copy can be reused only if Tom likes it).

**Risks or things that look wrong**
- The prototype is US-only and uses fictional community data; v1 keeps six countries (decision stands).
- Scope grew (#11). Default is to keep everything; Tom may cut.

**Tom should check**
- `TOM.md` → *Needs you* #1 (design direction) and #2 (skim the specs).

**Next step**
- Update pass item 1 (patch updates). Then phase 1 once Tom picks a design direction and confirms #4.

---

## 2026-11-18: Code and docs on GitHub, living docs rule
**Agent/session:** claude.ai (PWW 2 project)  ·  **Branch/PR:** `chore/foundations-baseline` / #2 (merged), `docs/starter-pack` / #1  ·  **Spec:** n/a

**Done**
- PR #2: the 3 Nov Foundations code committed as-is from `pww-foundations.zip` (only `supabase/.temp/` left out and git-ignored). Migration files match the 3 Nov checksums. First CI run green. Squash-merged.
- PR #1: the 17 Nov docs pack, rebased onto the baseline. Tom's living docs rule is in `CLAUDE.md` (*Keep the docs current*), `docs/workflow.md` and the PR template, enforced by `.github/workflows/docs-check.yml` → `scripts/docs-check.sh` (tested against 8 cases). Every doc has a *Last updated* line.
- Merged the two rulebooks. `CLAUDE.md` is the only rulebook now: it imports `@AGENTS.md` and absorbed the rules from the code's `AGENTS.md`. `AGENTS.md` keeps only the `next dev`-managed block and a pointer. `next dev` only upserts its marked block in `AGENTS.md` and never touches `CLAUDE.md` (checked in `generate-agent-files.js`).
- Checked the docs against the code. Fixed `src/lib/supabase/types.ts` → `database.types.ts` (workflow, conventions). Added the real commands, `test:db` setup, the `src/lib/env*.ts` and `supabase/templates` paths, and the CI contents to `CLAUDE.md`.
- Ran every check and wrote the update list: `docs/status.md` → *Update pass*, and `TOM.md` → *Update list*.

**Changed files / migrations**
- Docs, PR template, CI docs check, `AGENTS.md`, `README.md` (status line, links, *Last updated*). No app code or schema changes.

**Decisions made** (in `decisions.md` → *How we work*)
- Living docs; which source wins; one rulebook (`CLAUDE.md`); the decision log stays one line per decision, and the `workflow.md` template was changed to match.

**Not done / skipped, and why**
- Update-pass items not started. Tom first needs to say what changed (`open-questions.md` #9).
- Live schema not checked: Supabase is paused.
- Docs gardener not switched on (needs Tom's OK).

**Risks or things that look wrong**
- `test:db` ran on Postgres 16 locally (17 in CI). Both passed.
- Tom says the code and docs are out of date. Treat the specs (all *Draft*) as a starting point.

**Tom should check**
- `TOM.md` → *Needs you* #1 and *Update list*.

**Next step**
- Update pass item 1 (patch updates) as its own PR, then item 2. Put Tom's changes first when they arrive.

---

## 2026-11-17: Docs starter pack
**Agent/session:** claude.ai (PWW 2 project)  ·  **Branch/PR:** none (repo not reachable)  ·  **Spec:** n/a

**Done**
- Wrote `TOM.md`, `CLAUDE.md`, `CHANGELOG.md`, `.github/pull_request_template.md`, and in `docs/`: `README`, `status`, `handoff`, `workflow`, `security`, `product`, `architecture`, `auth`, `integrations`, `recommendations`, `env`, `conventions`, `testing`, `glossary`, `design`, `runbook`, `costs`, `open-questions`, plus `specs/` with a template and phases 01–07.
- Facts come from the 3 Nov Foundations build record (folder layout, scripts, env vars, decisions).

**Changed files / migrations**
- Docs only. No code or schema changes.

**Not done / skipped, and why**
- Couldn't read the live schema: the Supabase project is paused. The table inventory stays in the existing `database.md`.
- Couldn't commit: Claude's GitHub app still can't see `Pww2C`.

**Risks or things that look wrong**
- These docs were written without the Foundations code open. The first agent with repo access should check `CLAUDE.md` → *Where things live* and *Commands* against the real code, and fix anything that differs. Keep existing `README.md`, `docs/decisions.md`, `docs/database.md`, `docs/setup.md` and `docs/how-it-works/` as they are.
- If the repo already has a `CLAUDE.md` or `AGENTS.md`, merge them into one `CLAUDE.md`.

**Tom should check**
- `TOM.md` → *Needs you*.

**Next step**
- Once the repo is reachable: push Foundations, add these docs in a `docs/starter-pack` PR, set up Vercel, then start phase 1.
