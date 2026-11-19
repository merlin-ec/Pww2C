---
name: plan-phase
description: Break a PWW phase spec into small, pull-request-sized tasks that agents can build, some in parallel, and list them in docs/status.md under Next up. Use when Tom says "plan phase N", or before starting a phase that has no task list.
argument-hint: "[phase number]"
---

# Plan phase $ARGUMENTS

1. Read the spec for phase $ARGUMENTS in `docs/specs/`, every doc it links to, `docs/product.md` → *Prototype*, and `docs/decisions.md`.

2. **Blockers first.** List the open questions (`docs/open-questions.md`) and *Needs you* items that block this phase. If one blocks everything, add it to `TOM.md` → *Needs you*, say what Tom must decide, and stop. If it blocks only part of the phase, plan around it.

3. **Split the work** into tasks that are each one PR, reviewable in about 10 minutes, and testable on their own:
   - Schema first, as one task for the `db-migrator` agent. Only one migration PR can be open at a time.
   - Then the server logic (data access, Server Actions) with unit tests.
   - Then the screens, in the current look (`docs/design.md`), checked at desktop and phone widths.
   - Every acceptance criterion in the spec belongs to exactly one task.

4. **Mark what can run in parallel:** tasks that touch different files and don't depend on each other.

5. **Write the plan** into `docs/status.md` → *Next up* as rows: number, task, spec criteria it covers, files or areas, depends on, parallel-safe (yes/no). Set the phase's status to *Planned*.

6. Run `/finish` to open a docs-only PR with the plan, so Tom can see it before agents start building.
