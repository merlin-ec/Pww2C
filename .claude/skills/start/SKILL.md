---
name: start
description: Start a PWW task the right way. Reads the status board and the last handoff, picks or takes the task, claims it, branches, plans briefly, then builds. Use when Tom says "start", "next", "build phase N" or gives a task.
argument-hint: "[task, or next, or phase N]"
---

# Start a PWW task

Tom asked for: $ARGUMENTS

1. **Get current.** `git fetch origin` and work from the latest `origin/main`. Read `docs/status.md`, the newest entry in `docs/handoff.md`, and `TOM.md` → *Needs you* and *Update list*.

2. **Pick the task.**
   - If Tom named a task, do that one.
   - If he wrote `next`, or nothing: take the top row of `docs/status.md` → *Next up* that nobody has claimed. If *Next up* is empty, take the top item of *Update pass*. If that's done too, take the next phase in order and run `/plan-phase` for it first.
   - If he wrote `phase N` and *Next up* has no tasks for that phase, run `/plan-phase N` first.
   - Skip anything blocked on Tom (`TOM.md` → *Needs you*, `docs/status.md` → *Blocked*). If everything is blocked, say exactly what Tom needs to do and stop.

3. **Check for clashes.** Read *In progress (claims)* and the remote branches (`git ls-remote --heads origin`; `gh pr list` if it works here). If someone is already working on the files you need, pick a different task.

4. **Read the spec** in `docs/specs/` and every doc it links to. Items marked *(prototype)* come from Tom's prototype (`docs/product.md` → *Prototype*): copy how they behave, never how they look.

5. **Branch and claim.** Create the branch: `feat/<phase>-<thing>`, `fix/<thing>`, `docs/<thing>` or `chore/<thing>`. Add your row to *In progress (claims)* in `docs/status.md`, commit it, and push the branch straight away so other agents can see it.

6. **Plan briefly.** Decide which files change, which tests prove it works, and which docs need updating (`CLAUDE.md` → *Keep the docs current*). Tell Tom the plan in 3–5 plain lines, then start building. Only wait for him if the plan hits *Stop and ask Tom first*.

7. **Build in small steps,** running `npm run check` as you go. Hand any schema change to the `db-migrator` agent.

8. When it works, run `/finish`.
