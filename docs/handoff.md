# Session handoffs

**Last updated:** 25 Nov 2026

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

## 2026-11-25: Emerald + brass palette
**Agent/session:** Claude Code session  ·  **Branch/PR:** `feat/emerald-palette`, which includes all of `docs/emerald-brass-and-install-hook` / see GitHub  ·  **Spec:** n/a (`design.md`)

**Done**
- `src/app/globals.css` tokens:
  - velvet `#0b1a14`, curtain `#11241c`, plush `#183126`, seam `#2c4a3c`
  - marquee-ink `#0b1a14`
  - exit `#e5534b` → `#eb5f56`, plus its rgb hover tint
  - placeholder opacity 0.7 → 0.85
- `src/app/layout.tsx`: `themeColor` updated to match velvet.
- Contrast: every text colour is WCAG AA on the backgrounds it's used on. The exception is `exit` on plush (4.2), which nothing uses; `design.md` says not to. The ratios are in `design.md` → *Tokens*; the script was a throwaway in the session scratchpad.
- `design.md`: *Tokens* filled in (it was a TODO), and the direction note updated. `decisions.md`: the emerald values and keeping the token names.
- Screenshots of `/`, `/login`, `/signup` and `/search` at 1280×900 and 390×844, before and after, taken with headless Firefox. Side-by-side images are in `docs/design/` (desktop: home and sign-up; phone: home and log-in).

**Changed files / migrations**
- `src/app/globals.css`, `src/app/layout.tsx`, `docs/design.md`, `docs/design/*.png`, `docs/decisions.md`, `docs/status.md`, `docs/handoff.md`, `TOM.md`, `CHANGELOG.md`. No schema.

**Decisions made** (also added to decisions.md)
- Deep, low-saturation emerald, as dark as the velvet it replaces. This is the agent's proposal and Tom judges it in the PR.
- Token names kept: they're fabrics, not colours.

**Not done / skipped, and why**
- Title pages, account pages and poster grids weren't seen: there's no TMDB token, and nobody can sign in here. They use the same tokens, so they change the same way.
- Playwright isn't installed on this machine (it's Tom's laptop session, not the cloud image), so I used snap Firefox's `--screenshot`.
- `npm run test:db` not run: no database change.

**Risks or things that look wrong**
- After PR #5 (package updates) merged on 25 Nov, `origin/main` was merged into this branch, and the conflicts in `status.md`, `handoff.md` and `TOM.md` were resolved. The install-hook branch is checked out in another session's locked worktree, so it couldn't be updated. This PR carries its commits instead, and merging it closes that PR too.
- `seam` borders are 1.8:1 on velvet. The old ones were 1.5:1, so this is no worse. Fine for decorative lines, but input boundaries rely on the plush fill rather than the border.

- The email templates still use the old velvet colour for button text. Not changed, because email changes need Tom (`design.md` notes it).
- Claim row removed at finish, per `/finish`; *Next up* #3 says "PR open" until it merges.

**Tom should check**
- The before/after images. Is the green right?
- Whether the confirmation and password-reset emails should switch to the emerald colour too.

**Next step**
- Update pass #2 after the package-updates PR merges, or `/plan-phase 1`.

---

## 2026-11-24: Update pass #1, patch/minor updates
**Agent/session:** Claude Code session (Tom's laptop)  ·  **Branch/PR:** `chore/patch-updates` / PR #5, merged 25 Nov  ·  **Spec:** n/a

**Done**
- `next` + `eslint-config-next` 16.4.5 → 16.4.6 and `react`/`react-dom` 19.3.0 → 19.3.1, all still exact-pinned.
- Floors raised: `@supabase/supabase-js` ^2.119.2, `supabase` CLI ^3.4.0 (the plan said 3.2, but 3.4 is the newest minor), `tailwindcss` + `@tailwindcss/turbopack` ^4.3.5, `@types/react` ^19.3.1, `vitest` ^5.1.1.
- Results:
  - `npm run check` (18 tests) and `npm run build` pass.
  - `npm audit --omit=dev`: 0 vulnerabilities.
  - Full `npm audit`: 7 moderate, down from 17 (11 high). Update pass #2 is smaller now.
  - `next start` smoke test: `/`, `/search`, `/login` and `/auth/error` all return 200 (no TMDB token here, so no live titles).
- Removed the stale `chore/agent-kit` claim (PR #4 merged).
- The lockfile was generated with npm 10.9.4, the npm that ships with Node 22 (CI and Vercel). This cloud machine has Node 24 and npm 11, whose first attempt dropped two optional WebAssembly entries (`@emnapi/runtime`, `@emnapi/core`); the reviewer caught it. The checks above were re-run after a clean `npm ci` from the final lockfile.

**Changed files / migrations**
- `package.json`, `package-lock.json`, `docs/status.md`, `docs/handoff.md`, `TOM.md`. No schema.

**Decisions made**
- None. TypeScript 7, ESLint 10 and `@types/node` 26 stay out, per *Update pass* #3.

**Not done / skipped, and why**
- `npm run test:db`: no Postgres on this machine. CI runs it on the PR. No database code or `pg` version changed.
- Not checked in a browser at phone width: no UI changed.

**Risks or things that look wrong**
- This branch and `docs/emerald-brass-and-install-hook` (PR open, unmerged) both edit `docs/status.md`, `docs/handoff.md` and `TOM.md`. Whichever merges second needs a small merge of those three files.

**Tom should check**
- Nothing beyond reviewing the PR.

**Next step**
- Update pass #2 (`npm audit fix`, no `--force`) once this merges.

---

## 2026-11-24: Cloud install hook; emerald + brass direction
**Agent/session:** Claude Code cloud session  ·  **Branch/PR:** `docs/emerald-brass-and-install-hook` / see GitHub  ·  **Spec:** n/a

**Done**
- Tom typed `/start next` (Next up #1, patch updates), but the session's branch already had someone else's uncommitted SessionStart hook. I asked, and Tom chose to finish the hook. Next up #1 is still next.
- `.claude/settings.json` → `SessionStart` (matcher `startup|resume`) runs `scripts/install_pkgs.sh`. It does nothing unless `CLAUDE_CODE_REMOTE=true`. Otherwise it runs `npm ci --no-audit --no-fund` and records the sha256 of the script, `package.json` and `package-lock.json` in `node_modules/.install_pkgs.sha256`, then skips while they match. It always exits 0. My changes to it:
  - npm's output now goes to stderr, because a SessionStart hook's stdout is added to the agent's context.
  - After the `reviewer` agent's review:
    - `--ignore-scripts`. The only lockfile package with an install script is macOS-only `fsevents`.
    - The Node version is now part of the hash.
    - A failed `cd` now exits 0.
    - The hook has a 300 s `timeout`.
    - The script is executable.
    - A new `security.md` → *Dependencies* entry.
- Tested here: with the variable unset it exits at once; the first cloud run took 19 s with 0 bytes on stdout; the second took 0.01 s. `npm run check` and `npm run build` pass on the `--ignore-scripts` install.
- Tom confirmed the branch name's "emerald brass" is his design direction (open question #10). I recorded it in `decisions.md` → *Design*, `open-questions.md` (answered), `design.md` and `docs/README.md`, and removed the *Blocked: look of new screens* row from `status.md`. Next up #3 now proposes the emerald colours.
- `.gitignore`: added `.claude/worktrees/`. A session worktree was nearly committed as an embedded repo.

**Changed files / migrations**
- `.claude/settings.json`, `scripts/install_pkgs.sh` (new), `.gitignore`, `CLAUDE.md` (*Where things live*), `docs/security.md`, `docs/decisions.md`, `docs/handoff.md`, `docs/design.md`, `docs/open-questions.md`, `docs/README.md`, `docs/status.md`, `docs/workflow.md`, `TOM.md`. No app code or schema.

**Decisions made** (also added to decisions.md)
- Install packages with a repo hook rather than a claude.ai environment setup script.
- Emerald and brass, keeping dark-only, the marquee and the fonts. Exact values aren't chosen.

**Not done / skipped, and why**
- No colour changes. Tom named a direction, not values, so a separate PR proposes values with screenshots.
- `npm run test:db` not run: nothing touched the database.
- Reviewer nits left for the palette PR: the "dark, warm" wording in `design.md` (emerald is a cool colour).

**Risks or things that look wrong**
- The hook only takes effect for sessions whose checkout includes it, so it starts working once this PR merges.
- `npm ci` needs the npm registry, which cloud environments allow by default.

**Tom should check**
- `TOM.md` → *Needs you* #0: step 2 (setup script) is gone.

**Next step**
- Next up #1 (patch updates), or #3 (emerald palette), which can run in parallel.

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
