# PWW: where things stand

**For Tom.** This is the one page to read. Agents rewrite it at the end of every session, in plain English. The technical detail lives in `docs/`.

**Last updated:** 18 Nov 2026, by Claude (living docs session)

---

## In one line

Claude can now reach GitHub, and the docs are saved there with the new "always keep the docs current" rules. The Foundations code is next: it's built but out of date, and it still only exists in the 3 Nov chat's zip.

## Needs you

Most important first. Agents add to this list and never remove an item until it's done.

| # | What | Why it matters | How |
|---|---|---|---|
| 1 | **Download `pww-foundations.zip`** | It's the only copy of the app code. Once it's in your Downloads, Claude puts it on GitHub and starts the update pass. | Open the 3 Nov chat *PWW v1 build decisions*, scroll near the end, click the file card captioned "The Foundations code so far…". |
| 2 | **Say what's out of date** | You said the code and the docs are both behind. Agents can find technical gaps, but only you know what changed in your thinking. | Features, stack, design or decisions you've changed. Tell Claude, or add it to `docs/open-questions.md` #9. |
| 3 | **Wake the database** | The free Supabase project paused itself after a week without traffic, so nothing can read or write to it. This will keep happening until the app is live or on the paid plan. | Supabase dashboard → project `pww` → Restore. It's free and takes a few minutes. Or ask Claude to restore it. |
| 4 | **Get a TMDB token** | The app can't load any films without it. | themoviedb.org → Settings → API → copy the long *API Read Access Token*. Put it straight into Vercel, never into a chat. |
| 5 | **Set up Vercel** | This is what puts the site online. | Steps are in `docs/setup.md` (once the repo is up). |

## Decisions waiting on you

These are copied from `docs/open-questions.md`, and only the ones that are blocking work appear here.

- **What's out of date?** You said the code and docs are both behind. This shapes the update pass (see *Needs you* #2).
- Coming up later: **whether PWW will ever make money**, because that changes which TMDB and Vercel terms apply. It's needed before launch (phase 7).

## What happened recently

Newest first. Each session gets a few lines here, and the full detail goes in `docs/handoff.md`.

**18 Nov 2026: Docs always kept current**
- New rule from you: every change updates its doc at the same time, and a doc found to be wrong gets fixed straight away. Every doc now shows when it was last updated.
- GitHub now checks this automatically and blocks changes that skip the doc update.
- You gave Claude GitHub access, so the docs are saved on GitHub as a pull request. The app code isn't there yet (see *Needs you* #1).
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
| 0. Foundations | ✅ Built and tested, but out of date · ⏳ waiting on the code zip, then an update pass, then Vercel |
| 1. Ratings & reviews | Not started |
| 2. Lists & watchlist | Not started |
| 3. Onboarding & recommendations | Not started |
| 4. Streaming advice | Not started |
| 5. Watching together | Not started |
| 6. Social | Not started |
| 7. Polish & launch | Not started |

## Red flags

Anything an agent thinks you should worry about. If this section is empty, nothing is worrying.

- Foundations code still has no copy on GitHub. The only copy is the zip in the 3 Nov chat (see *Needs you* #1).
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
