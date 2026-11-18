# Recommendations (phase 3)

**Last updated:** 17 Nov 2026

The design is locked; the details are still to be written. Spec: `specs/03-onboarding-recommendations.md`.

## The design (decided 3 Nov 2026)

Recommendations come from two layers:

1. **Scoring engine.** Transparent, rule-based scoring over TMDB data and the user's taste profile. It always runs, costs nothing, and can explain every score.
2. **Claude layer.** Claude Haiku 5.5 suggests "deep cuts" based on a user's favourites. Every suggestion is **matched to a real TMDB title and ranked by the engine** before it's shown. Unmatched suggestions are dropped.

If the monthly cap is reached, the app falls back to engine-only recommendations. Users still get results.

## Scoring engine

*TODO: define before building.*

- **Inputs:** ratings, reviews?, lists, watchlist, onboarding answers, genres, people, decades, runtime, streaming services, country
- **Signals and weights:** list each signal, its weight and why
- **Exclusions:** already rated, already on watchlist, not available in region (optional)
- **Explanation:** each recommendation shows its top 1–3 reasons ("Because you rated *Heat* 5★")
- **Tests:** unit tests with fixed fixtures so weight changes are deliberate

## Claude layer

*TODO: define before building.*

- **When it runs:** on demand vs. a cached batch per user per day
- **Prompt:** lives in code (not the database), versioned, with user data passed as clearly-marked data
- **Output format:** structured (title + year + reason), validated with Zod
- **Matching:** search TMDB by title and year; drop anything that doesn't match confidently
- **Caching:** cache results per user so refreshing doesn't call Claude again

## The $10/month cap

Must be enforced in code, not just watched on a dashboard.

- [ ] Record every call: user, input/output tokens, estimated cost, timestamp (new table, with RLS)
- [ ] Check month-to-date spend **before** each call; refuse when it would exceed the cap
- [ ] Per-user daily limit so one user can't use up everyone's budget
- [ ] Set a matching spend limit in the Anthropic console as a backstop
- [ ] Surface month-to-date spend in `TOM.md` → *Money* each session

## Onboarding → taste profile

*TODO:* questions, how answers become profile weights, and whether PWW 1's questionnaire is reused.
