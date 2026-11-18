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

## 2026-11-18: Living docs rule
**Agent/session:** claude.ai (PWW 2 project)  ·  **Branch/PR:** `docs/starter-pack` / see GitHub  ·  **Spec:** n/a

**Done**
- Tom's rule, written into `CLAUDE.md` (*Keep the docs current*), `docs/workflow.md` (*Keeping the docs current*) and the PR template: docs change in the same PR as the code, wrong docs get fixed when found, every session ends with status/handoff/TOM/CHANGELOG.
- Added CI enforcement: `.github/workflows/docs-check.yml` runs `scripts/docs-check.sh`. Tested locally against 8 cases (code-only, migrations, env, scripts vs deps, docs-only, escape hatch, template placeholder rejected).
- Added a `**Last updated:**` line to every doc; removed the duplicate *Updated* field from the spec headers.
- Put the 17 Nov docs starter pack on GitHub in this PR.

**Changed files / migrations**
- Docs, PR template, CI workflow, `scripts/docs-check.sh`. No app code or schema changes.

**Decisions made** (add to `docs/decisions.md` once Foundations, which owns that file, is on `main`)
- *Living docs* (Tom, 17 Nov): docs are part of done, enforced by CI.
- *Source of truth* (Tom, 17 Nov): the 17 Nov docs are the main reference; the 3 Nov code and working docs are the baseline. Code wins on facts about the code, docs win on rules and process, product/design conflicts go to Tom.

**Not done / skipped, and why**
- Foundations code not pushed: `pww-foundations.zip` isn't on Tom's laptop yet. Plan: push it to `main` as the baseline as soon as it is.
- `CLAUDE.md` → *Commands* / *Where things live* still not checked against the real code (needs the code).
- "Docs gardener" scheduled agent described in `workflow.md` but not switched on; it needs the code on GitHub and Tom's OK.

**Risks or things that look wrong**
- Tom says both the code and these docs are out of date (`open-questions.md` #9). Treat the docs as a baseline until the update pass.

**Tom should check**
- `TOM.md` → *Needs you* #1 and #2.

**Next step**
- Push Foundations to `main`, merge this PR, then the update pass: install, run checks, list outdated packages, compare docs with code, and write the update list into `TOM.md`.

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
