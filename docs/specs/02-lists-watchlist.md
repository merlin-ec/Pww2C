# Phase 2: Lists & watchlist

**Last updated:** 18 Nov 2026

**Status:** Draft, filled in from the prototype; Tom to confirm  ·  **Owner:** Tom

**Reference:** the 18 Nov prototype (`docs/product.md` → *Prototype*). Items marked *(prototype)* come from it. Follow its features and flows, not its look.

## Goal
Members keep a watchlist and make named lists, and can share any list with a public link.

## User stories
- As a member, I want a one-tap "add to watchlist" on every title.
- As a member, I want to make named lists ("Best heist films") and reorder them.
- As a member, I want to share a list with a link that works for people without an account.
- As a member, I want my library in four places: **Watchlist**, **Collections**, **Watched** and **Favorites**. *(prototype)*
- As a member, I want to give a collection a short description ("Sunday comfort watches"). *(prototype)*

## Acceptance criteria
- [ ] Add and remove from the watchlist on title pages and in grids
- [ ] Create, rename, reorder and delete lists; add and remove titles
- [ ] Share page for a list loads for signed-out visitors
- [ ] Collections are **private until the member chooses to share** *(prototype; confirms part of open question 4)*
- [ ] Library page has tabs with counts: Watchlist, Collections, Watched, Favorites *(prototype)*
- [ ] A collection has a name and an optional description *(prototype)*
- [ ] Every title card has a one-tap save (+) to the watchlist *(prototype)*
- [ ] Empty states point to Discover *(prototype)*

## Data changes
*TODO:* lists, list items (with position), and the watchlist (a special list, or its own table?). RLS for owner, visitor (share page) and other members.

## Security and abuse
Share pages expose only that list; list names render as plain text; limits on list count and size.

## Out of scope
Collaborative lists (maybe phase 5 or 6); importing from Letterboxd or IMDb (*TODO: in or out?*).

## Open questions
#4 (public vs private).
