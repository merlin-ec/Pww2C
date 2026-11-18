# PWW: where things stand

**For Tom.** This is the one page to read. Agents rewrite it at the end of every session, in plain English. The technical detail lives in `docs/`.

**Last updated:** 18 Nov 2026, by Claude (living docs session)

---

## In one line

The app code and all the docs are now saved on GitHub, under the new "always keep the docs current" rules. The code still builds and passes every test. Next is the update pass: the list below, plus whatever you tell us has changed.

## Needs you

Most important first. Agents add to this list and never remove an item until it's done.

| # | What | Why it matters | How |
|---|---|---|---|
| 1 | **Say what's out of date** | You said the code and the docs are both behind. The checks below find technical gaps, but only you know what changed in your thinking. | Features, stack, design or decisions you've changed. Tell Claude, or add it to `docs/open-questions.md` #9. |
| 2 | **Wake the database** | The free Supabase project paused itself after a week without traffic, so nothing can read or write to it. This will keep happening until the app is live or on the paid plan. | Supabase dashboard → project `pww` → Restore. It's free and takes a few minutes. Or ask Claude to restore it. |
| 3 | **Get a TMDB token** | The app can't load any films without it. | themoviedb.org → Settings → API → copy the long *API Read Access Token*. Put it straight into Vercel, never into a chat. |
| 4 | **Set up Vercel** | This is what puts the site online. | Steps are in `docs/setup.md`. |

## Decisions waiting on you

These are copied from `docs/open-questions.md`, and only the ones that are blocking work appear here.

- **What's out of date?** You said the code and docs are both behind. This shapes the update pass (see *Needs you* #1).
- Coming up later: **whether PWW will ever make money**, because that changes which TMDB and Vercel terms apply. It's needed before launch (phase 7).

## What happened recently

Newest first. Each session gets a few lines here, and the full detail goes in `docs/handoff.md`.

**18 Nov 2026: Code and docs on GitHub, docs always kept current**
- Your new rule is in place. Every change updates its docs at the same time, GitHub checks this automatically and blocks changes that skip it, and every doc shows when it was last updated.
- The app code and all the docs are saved on GitHub. The code and the docs each had their own rulebook for agents; they're now merged into one.
- Checked the code: it still builds and passes all 36 tests and the security checks. A few packages are slightly behind, and some developer-only tools have known security issues that never reach users. Details are in *Update list* below.
- Nothing in the app changed.

**17 Nov 2026: Docs starter pack**
- Added the rulebook agents read before they touch anything (`CLAUDE.md`), this page, and docs for security, workflow, testing, costs and each upcoming feature.
- Found that the database had paused itself, and that Claude couldn't see the GitHub repo yet.
- Nothing in the app changed.

**3 Nov 2026: Foundations built**
- Sign up, log in, password reset, account deletion, search, trending, and film/TV pages with where-to-watch.
- 18 logic tests and 18 database security tests pass. Supabase's security checker reports no problems.
- The "theatre lobby" look: dark, with a backlit marquee for titles.

## Try it yourself

Things worth clicking once the site is live. Agents list what's new and how to check it.

- *(Nothing live yet.)*

## Money

| Service | Now | At launch | Cap |
|---|---|---|---|
| Supabase | $0 (free) | $25/mo (Pro) | n/a |
| Vercel | $0 (free) | $0 unless PWW goes commercial | n/a |
| Claude API (recommendations) | $0 (not built yet) | usage-based | **$10/mo hard cap** |
| Domain + email | $0 | ~$10–20/yr, email free tier | n/a |

The full breakdown is in `docs/costs.md`. An agent must stop and ask you before adding anything that costs money.

## Build progress

| Phase | Status |
|---|---|
| 0. Foundations | ✅ Built, tested and on GitHub, but out of date · ⏳ update pass, then Vercel |
| 1. Ratings & reviews | Not started |
| 2. Lists & watchlist | Not started |
| 3. Onboarding & recommendations | Not started |
| 4. Streaming advice | Not started |
| 5. Watching together | Not started |
| 6. Social | Not started |
| 7. Polish & launch | Not started |

## Update list

What the 18 Nov check found. Agents work through this from the top; the technical detail is in `docs/status.md` → *Update pass*.

1. **Small package updates.** Next.js, React, Supabase and Tailwind each have a minor fix out. Low risk, one PR.
2. **Developer-tool security issues.** 17 known issues in the tools used to lint and test the code. They never reach users, but they should be cleaned up. Part of this is a one-command fix; the rest waits on the tool makers.
3. **Two big upgrades to decide on later:** TypeScript 7 and ESLint 10. Both are major versions, so they wait until Next.js supports them.
4. **The database check is still waiting on the database being woken** (*Needs you* #2). Once it's awake, agents confirm the live database matches the code and rerun Supabase's security checker.
5. **Your changes** (*Needs you* #1). These go to the top of the list once you've said what they are.

## Red flags

Anything an agent thinks you should worry about. If this section is empty, nothing is worrying.

- You've said the code and the docs are both out of date. Until the update pass is done, treat the docs as a starting point, not the final word.

---

<details>
<summary>Rules for agents writing this page</summary>

- Write for a smart non-engineer. No file paths in the "What happened" bullets unless Tom needs to open the file.
- Max 4 bullets per session. Put the detail in `docs/handoff.md`.
- Keep the five most recent sessions under "What happened recently" and delete older ones (they're still in `handoff.md`).
- Update *Needs you*, *Build progress*, *Money* and *Red flags* every session, even if only to confirm nothing changed. Update the "Last updated" line.
- Never paste secrets, keys, tokens or personal data here.
- Be honest: if something broke, was skipped or is half-done, say so plainly.

</details>
