# Phase 2: Lists & watchlist

**Last updated:** 17 Nov 2026

**Status:** Draft  ·  **Owner:** Tom

## Goal
Members keep a watchlist and make named lists, and can share any list with a public link.

## User stories
- As a member, I want a one-tap "add to watchlist" on every title.
- As a member, I want to make named lists ("Best heist films") and reorder them.
- As a member, I want to share a list with a link that works for people without an account.
- *TODO (Tom): more?*

## Acceptance criteria
- [ ] Add and remove from the watchlist on title pages and in grids
- [ ] Create, rename, reorder and delete lists; add and remove titles
- [ ] Share page for a list loads for signed-out visitors
- [ ] *TODO: can lists be private? (open question 4)*
- [ ] *TODO*

## Data changes
*TODO:* lists, list items (with position), and the watchlist (a special list, or its own table?). RLS for owner, visitor (share page) and other members.

## Security and abuse
Share pages expose only that list; list names render as plain text; limits on list count and size.

## Out of scope
Collaborative lists (maybe phase 5 or 6); importing from Letterboxd or IMDb (*TODO: in or out?*).

## Open questions
#4 (public vs private).
