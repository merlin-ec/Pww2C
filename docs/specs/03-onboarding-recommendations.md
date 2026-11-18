# Phase 3: Onboarding & recommendations

**Last updated:** 17 Nov 2026

**Status:** Draft  ·  **Owner:** Tom

## Goal
New members answer a short onboarding that builds a taste profile, then get recommendations that explain themselves.

## Already decided
- Scoring engine + Claude layer (Haiku 5.5), **$10/month hard cap**, engine-only fallback. See `recommendations.md`.
- Claude's suggestions are matched to real TMDB titles before they're shown.

## User stories
- As a new member, I want a quick onboarding so recommendations are good from day one.
- As a member, I want each recommendation to say why it's there.
- As a member, I want to say "not for me" so recommendations improve.
- *TODO (Tom): more?*

## Acceptance criteria
- [ ] *TODO: onboarding questions and length (open question 6)*
- [ ] Recommendations page shows N titles, each with 1–3 reasons
- [ ] Deep cuts from the Claude layer are labelled as such
- [ ] Cap reached → engine-only results, with no error shown to the user
- [ ] Month-to-date AI spend is visible to Tom (`TOM.md` → *Money*)
- [ ] *TODO*

## Data changes
*TODO:* taste profile, onboarding answers, recommendation feedback, AI usage log (for the cap).

## Security and abuse
User text is data, not instructions; per-member daily limit; spend check before every Claude call. See `security.md` → *AI safety*.

## Costs
Claude API: up to $10/mo. Needs `ANTHROPIC_API_KEY` and a console spend limit. Tom must OK creating the key.

## Open questions
#6 (reuse PWW 1 questionnaire).
