# Phase 5: Watching together

**Last updated:** 17 Nov 2026

**Status:** Draft  ·  **Owner:** Tom

## Goal
A member starts a watch session, shares a link, and friends (with or without accounts) help pick what to watch.

## Already decided
- Guests join as **anonymous Supabase users**. If they sign up, they keep everything because the user id doesn't change.

## User stories
- As a member, I want to start a session and send a link to friends.
- As a guest, I want to join from the link without signing up.
- As a group, we want to narrow a shortlist to one pick (voting? swiping?).
- *TODO (Tom): how picking should work.*

## Acceptance criteria
- [ ] *TODO: picking mechanic*
- [ ] Guests can join with a display name only
- [ ] Session respects everyone's services and region (*TODO: whose region?*)
- [ ] Guest who signs up keeps their votes and history
- [ ] *TODO*

## Data changes
*TODO:* sessions, participants, candidates, votes. RLS: participants only.

## Security and abuse
Turn on anonymous sign-ins in Supabase (an auth setting, so it needs Tom's OK). Guests can only touch their session. Rate-limit session and guest creation; expire old sessions; clean up abandoned anonymous users. Consider CAPTCHA.

## Technical decision needed
Live updates: Supabase Realtime vs. polling. Record the choice in `decisions.md`.
