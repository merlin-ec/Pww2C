# Phase 4: Streaming advice

**Last updated:** 17 Nov 2026

**Status:** Draft  ·  **Owner:** Tom

## Goal
Members tell PWW which services they have, and PWW tells them what to watch on those, and which service would be worth adding.

## Already decided
- Availability comes from JustWatch via TMDB; covers US, CA, GB, AU, NZ, IE.
- Country defaults: profile country → Vercel-detected country → US.

## User stories
- As a member, I want to pick my streaming services so I only see what I can watch.
- As a member, I want to filter my watchlist by "on my services".
- As a member, I want to know which service has the most of my watchlist.
- *TODO (Tom): more?*

## Acceptance criteria
- [ ] Choose services and country in profile settings
- [ ] "On your services" filter on watchlist, lists and recommendations
- [ ] Service comparison: count of watchlist titles available on each service
- [ ] JustWatch credited wherever availability shows
- [ ] *TODO*

## Data changes
*TODO:* member services (and country, if not already on profile).

## Out of scope
Prices of services; alerts when something arrives on a service (*TODO: later phase?*).
