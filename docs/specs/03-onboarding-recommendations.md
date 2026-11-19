# Phase 3: Onboarding & recommendations

**Last updated:** 18 Nov 2026

**Status:** Draft, filled in from the prototype; Tom to confirm  ·  **Owner:** Tom

**Reference:** the 18 Nov prototype (`docs/product.md` → *Prototype*). Items marked *(prototype)* come from it. Follow its features and flows, not its look.

## Goal
New members answer a short onboarding that builds a taste profile, then get recommendations that explain themselves.

## Already decided
- Scoring engine + Claude layer (Haiku 5.5), **$10/month hard cap**, engine-only fallback. See `recommendations.md`.
- Claude's suggestions are matched to real TMDB titles before they're shown.

## User stories
- As a new member, I want a quick onboarding so recommendations are good from day one.
- As a member, I want each recommendation to say why it's there.
- As a member, I want to say "not for me" so recommendations improve.
- As a member, I want to redo my taste answers any time (*Refine your taste*). *(prototype)*
- As a member, I want to filter picks by Films, Series or **Under 2 hours**. *(prototype)*
- As a member, I want Discover sorted by *Your taste* as well as TMDB rating, newest and A–Z. *(prototype)*

## Onboarding (prototype)

Four steps, skippable ("Explore first"):
1. **About you:** what to call you (first name) and up to 10 favourite genres.
2. **Favourites:** pick up to 5 titles you love (optional). Used for shared genres, filmmakers and story threads.
3. **Preferences:** usual pace (a little of everything / keep it moving: weight shorter films / let it breathe); how far beyond the familiar (tried and loved / a good balance / take a chance); genres to skip. **Skipped genres never appear in recommendations, including in watch-together rooms.**
4. **Services:** which streaming services you have (feeds phase 4).

## Acceptance criteria
- [ ] Onboarding as above: 4 steps, each answer stored as structured data (ids and fixed options), never free text *(prototype)*
- [ ] Recommendations page shows N titles, each with 1–3 reasons and a **taste fit** score (0–100) *(score from prototype)*
- [ ] Each pick has **Save** and **Not for me**; both are logged and shape later picks *(prototype)*
- [ ] Deep cuts from the Claude layer are labelled as such
- [ ] Cap reached → engine-only results, with no error shown to the user
- [ ] Month-to-date AI spend is visible to Tom (`TOM.md` → *Money*)
- [ ] Home page has a featured pick ("The Evening Edit": a few hand-picked or top-fit titles with a short line each) *(prototype)*
- [ ] Title page has **Follow the thread**: a few similar titles *(prototype)*

## Data changes
*TODO:* taste profile, onboarding answers, recommendation feedback, AI usage log (for the cap).

## Security and abuse
User text is data, not instructions; per-member daily limit; spend check before every Claude call. See `security.md` → *AI safety*.

## Costs
Claude API: up to $10/mo. Needs `ANTHROPIC_API_KEY` and a console spend limit. Tom must OK creating the key.

## Open questions
#6 answered by the prototype's onboarding (see `open-questions.md`).
