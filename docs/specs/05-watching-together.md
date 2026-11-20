# Phase 5: Watching together

**Last updated:** 18 Nov 2026

**Status:** Draft, filled in from the prototype; Tom to confirm  ·  **Owner:** Tom

**Reference:** the 18 Nov prototype (`docs/product.md` → *Prototype*). Items marked *(prototype)* come from it. Follow its features and flows, not its look.

## Goal
A member starts a watch session, shares a link, and friends (with or without accounts) help pick what to watch.

## Already decided
- Guests join as **anonymous Supabase users**. If they sign up, they keep everything because the user id doesn't change.

## User stories
- As a member, I want to start a session and send a link to friends.
- As a guest, I want to join from the link without signing up.
- As a group, we want to narrow a shortlist to one pick everyone says yes to.
- As a host, I want to name the room and say what I love and what I'd rather skip. *(prototype)*
- As a host, I want to add someone's taste by hand when they're in the room with me and won't use their phone (*Add a taste*). *(prototype)*

## How picking works (prototype)

1. **A little about everyone:** each person picks genres they love and their *no-thank-yous*.
2. **Find the overlap:** PWW builds a shortlist with a **group fit** score for each title. Anyone's no-thank-you genre is excluded.
3. **Make the call:** everyone reacts **I'm in** or **Pass** to shortlist titles; PWW shows when there's a **unanimous yes**.

## Acceptance criteria
- [ ] Picking works as above: per-person genres and no-thank-yous, group-fit shortlist, I'm in / Pass, unanimous yes *(prototype)*
- [ ] Invite by link; the link carries the host's taste *(prototype)*
- [ ] Each shortlist card shows the yes and pass counts *(prototype)*
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
