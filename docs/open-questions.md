# Open questions

**Last updated:** 25 Nov 2026

Decisions only Tom can make. Agents add questions here instead of guessing, then add anything blocking work to `TOM.md` → *Needs you*. When Tom answers, record the answer, move it to `decisions.md`, and mark it answered here.

## Open

| # | Question | Why it matters | Blocks | Asked |
|---|---|---|---|---|
| 1 | Will PWW ever make money (ads, subscriptions, affiliate links)? | TMDB key terms and Vercel Hobby are for non-commercial use | Phase 7 | 17 Nov 2026 |
| 2 | Domain name? | Needed for real email and the launch URL | Phase 7 | 17 Nov 2026 |
| 3 | Social login (Google / Apple) as well as email? | Easier sign-up; more auth settings to manage | Phase 7 (or earlier) | 17 Nov 2026 |
| 7 | Analytics: none, privacy-friendly (e.g. Vercel Analytics), or full? | Privacy policy, cost | Phase 7 | 17 Nov 2026 |
| 9 | Tom says the Foundations code and these docs are both out of date. What else has changed in his thinking (features, stack, design, decisions)? *Partly answered 18 Nov: the prototype (`product.md` → Prototype).* | Agents can find technical gaps, but not changes in Tom's plans | The update pass before phase 1 | 17 Nov 2026 |
| 11 | The prototype adds features the plan didn't have: the *Evening Edit* home feature, streaming rotation, taste-match, watch diary, trailer link, similar titles, profile stats. They're in the specs now. Keep all in v1, or cut some? | Scope and build time | Nothing yet (default: keep) | 18 Nov 2026 |
| 12 | Should the confirmation and password-reset emails switch to the emerald colours? They still use the old velvet red for button text. Changing email is on the ask-Tom list | Small visual mismatch between site and emails | Nothing (default: change it with phase 7 email setup) | 25 Nov 2026 |
| 13 | Can guests (anonymous accounts from watch sessions) write reviews? | Reviews appear on profiles, and guests have no username or profile page | Nothing (default: no; guests can rate and log watches) | 25 Nov 2026 |

## Answered

| # | Question | Answer | Date | Recorded in decisions.md |
|---|---|---|---|---|
| 4 | Are ratings, reviews and lists public by default, or private by default? | Each member picks a **visibility**. *Everyone* (the default; visitors without an account can see too) or *Private* in phase 1, plus *People I follow* and *A few followers I pick* in phase 6. Visitors must sign up to act. Lists: decided when phase 2 is planned (the prototype has them private until shared) | 25 Nov 2026 | Yes (*Phase 1*) |
| 5 | How should we handle abusive reviews or usernames? | Phase 1: plain text, length caps, a review rate limit, and Tom deletes by hand. The Report button comes in phase 6 | 25 Nov 2026 | Yes (*Phase 1*) |
| 6 | Reuse the PWW 1 movie-finder questionnaire for onboarding? | Use the 18 Nov prototype's 4-step onboarding (spec 03). It was built from an earlier PWW brief, so it carries that thinking forward | 18 Nov 2026 | Yes (prototype is the product reference) |
| 8 | Let users export their data? | Yes: *Export your library*, as in the prototype | 18 Nov 2026 | Yes (prototype is the product reference) |
| 10 | Design direction: keep Foundations' dark "theatre lobby" look, or go somewhere new? | Emerald and brass: dark emerald replaces the velvet red, brass stays the accent. Exact colours to be proposed in the next design PR | 24 Nov 2026 | Yes (*Design*) |
