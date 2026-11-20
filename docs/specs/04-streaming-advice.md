# Phase 4: Streaming advice

**Last updated:** 18 Nov 2026

**Status:** Draft, filled in from the prototype; Tom to confirm  ·  **Owner:** Tom

**Reference:** the 18 Nov prototype (`docs/product.md` → *Prototype*). Items marked *(prototype)* come from it. Follow its features and flows, not its look.

## Goal
Members tell PWW which services they have, and PWW tells them what to watch on those, and which service would be worth adding.

## Already decided
- Availability comes from JustWatch via TMDB; covers US, CA, GB, AU, NZ, IE.
- Country defaults: profile country → Vercel-detected country → US.

## User stories
- As a member, I want to pick my streaming services so I only see what I can watch.
- As a member, I want to filter my watchlist by "on my services".
- As a member, I want to know which service has the most of my watchlist.
- As a member, I want a **streaming rotation**: which services to keep, pause or add, based on my watchlist and taste. *(prototype: "Keep the stories. Rethink the subscriptions.")*
- As a member, I want starter picks to compare against when my watchlist is still empty. *(prototype)*

## Acceptance criteria
- [ ] Choose services and country in profile settings
- [ ] "On your services" filter on watchlist, lists and recommendations
- [ ] Service comparison: count of watchlist titles available on each service
- [ ] JustWatch credited wherever availability shows
- [ ] Services can be picked in onboarding step 4 and on the streaming page *(prototype)*
- [ ] Streaming page compares each picked service against the watchlist and taste, and suggests a rotation *(prototype)*
- [ ] Says clearly that PWW never connects to or changes a streaming account *(prototype)*

## Data changes
*TODO:* member services (and country, if not already on profile).

## Out of scope
Prices of services; alerts when something arrives on a service (*TODO: later phase?*).
