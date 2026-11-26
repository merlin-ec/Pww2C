# PWW: where things stand

**For Tom.** This is the one page to read. Agents rewrite it at the end of every session, in plain English. The technical detail lives in `docs/`.

**Last updated:** 25 Nov 2026, by Claude (phase 1 planning session)

---

## In one line

The update pass is finished, and phase 1 (ratings, reviews and the watch diary) is planned as 6 small tasks. Merge the plan, and `/start next` begins building it. The site goes live once you've done the TMDB token and Vercel.

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
| 0 | **Protect `main`** | So agents can't skip review. (The claude.ai setup-script step is no longer needed: the install hook is merged.) | GitHub → Pww2C → Settings → Branches → add a rule for `main`: require a pull request and passing checks. |
| 1 | **Check and merge the phase 1 plan** | Agents build phase 1 from it. Changing it now is cheap. | Read `docs/specs/01-ratings-reviews.md` in the pull request, especially *Already decided* and *Acceptance criteria*, then merge. |
| 2 | **Skim the later phase plans** | They're filled in from your prototype. Anything that's wrong is cheapest to fix now. | `docs/specs/02`–`06`; items marked *(prototype)*. Say if any prototype extras should wait (#11). |
| 3 | **Get a TMDB token** | The app can't load any films without it. | themoviedb.org → Settings → API → copy the long *API Read Access Token*. Put it straight into Vercel, never into a chat. |
| 4 | **Set up Vercel** | This is what puts the site online. | Steps are in `docs/setup.md`. |

## Decisions waiting on you

These are copied from `docs/open-questions.md`, and only the ones that are blocking work appear here.

- Nothing is blocking right now. Two small ones have defaults agents will use unless you say otherwise: guests can rate but not write reviews (#13), and the emails get the emerald colours at launch (#12).
- Coming up later: **whether PWW will ever make money**, because that changes which TMDB and Vercel terms apply. It's needed before launch (phase 7).

## What happened recently

Newest first. Each session gets a few lines here, and the full detail goes in `docs/handoff.md`.

**25 Nov 2026: Phase 1 planned**
- Your answers are now in the plan:
  - Each member picks who sees their ratings, reviews and diary: **Everyone** (the default, including people without an account) or **Private**.
  - "People I follow" and "a few followers I pick" come with following, in phase 6.
- Visitors can browse freely, but rating or reviewing asks them to sign up first. Every rating can have a one-line thought, and a full review is optional.
- Phase 1 is split into 6 small tasks, and some can be built side by side. The database part comes first, as the rules require.
- Also fixed the setup guide (it had the old repo name) and added the steps for protecting `main`. Nothing in the app changed.

**25 Nov 2026: Developer-tool security issues cleared**
- The emerald pull request (#6) is merged, so the new look and the install hook are both live in the code.
- Ran the one-command fix for the developer tools: the known security issues went from 7 to 0. None of them ever reached users.
- Only the list of exact package versions changed. The app builds and every check passes.
- Not run here: the database tests (no database on this machine). GitHub runs them on the pull request.

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
| 0. Foundations | ✅ Built, tested, updated, emerald look · ⏳ Vercel (needs you) |
| 1. Ratings & reviews | 📋 Planned: 6 tasks, waiting for you to merge the plan |
| 2. Lists & watchlist | Not started |
| 3. Onboarding & recommendations | Not started |
| 4. Streaming advice | Not started |
| 5. Watching together | Not started |
| 6. Social | Not started |
| 7. Polish & launch | Not started |

## Update list

What the 18 Nov check found. Agents work through this from the top; the technical detail is in `docs/status.md` → *Update pass*.

1. ~~Small package updates~~ Done, merged 25 Nov (pull request #5).
2. ~~Developer-tool security issues~~ Fixed 25 Nov: 0 known issues (pull request #7).
3. **Two big upgrades to decide on later:** TypeScript 7 and ESLint 10. Both are major versions, so they wait until Next.js supports them.
4. ~~Database check~~ Done 18 Nov: the live database matches the code and the security checker is clean. One small speed fix (a missing index) goes in with the phase 1 database task.
5. **Your changes.** The prototype is now in the plans; anything else you've changed goes to the top of this list.

## Red flags

Anything an agent thinks you should worry about. If this section is empty, nothing is worrying.

- The site still isn't online: it needs the TMDB token and Vercel (*Needs you* 3 and 4). Agents can build phase 1 without them, but they can only check film pages against test data until then.
- `main` isn't protected yet (*Needs you* 0), so nothing technically stops a change skipping review.

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
