# Phase 1: Ratings & reviews

**Last updated:** 18 Nov 2026

**Status:** Draft, filled in from the prototype; Tom to confirm  ·  **Owner:** Tom

**Reference:** the 18 Nov prototype (`docs/product.md` → *Prototype*). Items marked *(prototype)* come from it. Follow its features and flows, not its look.

## Goal
Members can rate any film or show and optionally write a review. Ratings feed the taste profile later (phase 3).

## Already decided
- TV is rated at the **show** level, with no episodes in v1.
- Rating a title writes it to the catalogue (catalogue rows exist only for titles someone interacted with).

## User stories
- As a member, I want to rate a title so I remember what I thought and get better recommendations.
- As a member, I want to write a review so I can say why.
- As a visitor, I want to read a member's ratings on their public profile. *(Depends on open question 4.)*
- As a member, I want to log a watch (with the date) so I keep a watch diary. *(prototype)*
- As a member, I want to add a short thought with my rating, without writing a full review. *(prototype)*

## Acceptance criteria
- [ ] Rating scale: **half a star to five stars**, in half-star steps *(prototype)*
- [ ] A member can rate, change and remove a rating from the title page
- [ ] A member can add, edit and delete a review
- [ ] Ratings show on the member's profile
- [ ] Signed-out visitors are asked to log in when they try to rate
- [ ] Title page has a *Your take* block: stars, an optional short thought, and **Log this watch** *(prototype)*
- [ ] Each logged watch is a diary entry (title, date, rating, thought); a title can be logged more than once *(prototype)*
- [ ] Profile shows the watch diary, newest first *(prototype)*
- [ ] Title page shows the TMDB score next to the member's own rating *(prototype)*
- [ ] Title page has a **Find trailer** link (opens a YouTube search) *(prototype)*

## Data changes
*TODO:* ratings and diary entries (a rating can exist without a diary entry; a diary entry may carry a rating and a thought). RLS: the owner writes; reading depends on open question 4.

## Security and abuse
Owner-only writes; per-member rate limit on reviews; review length cap; reviews render as plain text.

## Out of scope
Episode ratings; likes or comments on reviews (phase 6?).

## Open questions
`open-questions.md` #4 (public vs private), #5 (moderation).
