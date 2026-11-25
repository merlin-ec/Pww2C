# PWW: where things stand

**For Tom.** This is the one page to read. Agents rewrite it at the end of every session, in plain English. The technical detail lives in `docs/`.

**Last updated:** 25 Nov 2026, by Claude (emerald palette session, merged with main)

---

## In one line

The package updates are in. One pull request is left: the new emerald look, which also carries the install hook. After that: the TMDB token and Vercel, so the site can go live.

## Start building from your phone

Claude app → **Code** → pick **Pww2C** (runs in the cloud) or **PWW (laptop)**. Then type one of:

- **`/start next`**: the agent takes the next task on the list, builds it, gets it reviewed and opens a pull request.
- **`/start` + what you want**, in plain words.
- **`/plan-phase 1`**: splits phase 1 into small tasks before agents build it.

You review and merge each pull request in the GitHub app. Agents can't push to the live code (`main`) themselves.

## Needs you

Most important first. Agents add to this list and never remove an item until it's done.

| # | What | Why it matters | How |
|---|---|---|---|
| 0 | **Protect `main`** | So agents can't skip review. (PR #4 is merged, and the claude.ai setup-script step isn't needed once the emerald pull request is in, because it brings the install hook with it.) | GitHub → Pww2C → Settings → Branches → add a rule for `main`: require a pull request and passing checks. |
| 1 | **Judge and merge the emerald pull request** | It's your new look, and it also carries the install hook, so merging it closes the install-hook pull request too. The shades are the agent's proposal. | Look at the before/after pictures (`docs/design/` in the pull request), then merge it. Or say "lighter", "greener" or similar and an agent will adjust. |
| 2 | **Skim the phase plans** | They're now filled in from your prototype. Anything that's wrong is cheapest to fix now. | `docs/specs/01`–`06`; items marked *(prototype)*. Say if any prototype extras should wait (#11). |
| 3 | **Get a TMDB token** | The app can't load any films without it. | themoviedb.org → Settings → API → copy the long *API Read Access Token*. Put it straight into Vercel, never into a chat. |
| 4 | **Set up Vercel** | This is what puts the site online. | Steps are in `docs/setup.md`. |

## Decisions waiting on you

These are copied from `docs/open-questions.md`, and only the ones that are blocking work appear here.

- **Public or private by default** (#4): the prototype suggests collections private until shared, and reviews visible to the community. Confirm before phase 1–2.
- Coming up later: **whether PWW will ever make money**, because that changes which TMDB and Vercel terms apply. It's needed before launch (phase 7).

## What happened recently

Newest first. Each session gets a few lines here, and the full detail goes in `docs/handoff.md`.

**25 Nov 2026: The emerald look**
- The site's dark red background is now deep emerald green, with the brass buttons, ivory text and lit-up marquee unchanged. Before/after pictures for desktop and phone are in the pull request.
- Every bit of text was rechecked for readability on the new green. The error red is a touch brighter and placeholder text a touch stronger, so both stay easy to read.
- The exact shades are my proposal. Say if you want them lighter, greener or warmer. Merging this pull request also brings in the install-hook work, so it's the only one left to merge.
- I couldn't check a film page, because the site can't load films until it has the TMDB token. Only the home, search, log-in and sign-up pages were checked.

**24 Nov 2026: Small package updates**
- Next.js, React, Supabase and Tailwind are on their latest minor fixes. The app builds, all tests pass, and the main pages load.
- The developer-tool security issues dropped from 17 (11 serious) to 7 minor ones. None of them reach users.
- Not run here: the database security tests, because the machine it ran on has no database. GitHub runs them on the pull request.
- Merged as pull request #5.

**24 Nov 2026: Packages install themselves; emerald and brass**
- Cloud agents now install the app's packages when a session starts, using a script kept in the code, so you don't need the claude.ai setup-script step. The first start takes about 20 seconds, and later starts skip the install.
- Your design direction is written down: dark emerald in place of the velvet red, with brass kept as the accent. No colours have changed yet. The next design task will propose the exact shades and show you screenshots in its pull request.
- The package updates you asked for with `/start next` didn't happen. This session finished the install script instead (you chose that), so they're still top of the list.
- Nothing in the app changed.

**18 Nov 2026 (evening): Agents ready to build**
- Added the agent kit: type `/start next` from your phone and an agent picks the next task, builds it, has a second agent review it, updates the docs and opens a pull request.
- Agents can run checks, commit and open pull requests without asking you each time. Installs and merges always ask, and pushing to the live code is blocked.
- The first three tasks are queued: two package-update tasks, then filling in the design doc.
- Woke the database and checked it: it matches the code exactly, and Supabase's security checker is clean. It pauses itself again after about a week with no visitors, until the app is live.

**18 Nov 2026 (evening): Prototype written into the plans**
- Your laptop is connected: you can start Claude sessions on it from the Claude app's Code tab.
- Went through every screen of your ChatGPT prototype and wrote what it does into the phase plans: half-star ratings and a watch diary, a 4-step taste quiz, "taste fit" scores, group picking with I'm in / Pass, a streaming rotation, taste-match and more.
- The prototype is now the product reference for features, not for the look. Two questions answered (onboarding, export) and two new ones for you (design direction, prototype extras).
- Nothing in the app changed.

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

1. ~~Small package updates~~ Done, merged 25 Nov (pull request #5).
2. **Developer-tool security issues.** Down to 7 minor issues in the tools used to lint and test the code. They never reach users. Part of this is a one-command fix; the rest waits on the tool makers.
3. **Two big upgrades to decide on later:** TypeScript 7 and ESLint 10. Both are major versions, so they wait until Next.js supports them.
4. ~~Database check~~ Done 18 Nov: the live database matches the code and the security checker is clean. One small speed fix (a missing index) is queued for the next database change.
5. **Your changes.** The prototype is now in the plans; anything else you've changed goes to the top of this list.

## Red flags

Anything an agent thinks you should worry about. If this section is empty, nothing is worrying.

- You've said the code and the docs are both out of date. The phase plans now follow your prototype; the code hasn't caught up yet (update pass).

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
