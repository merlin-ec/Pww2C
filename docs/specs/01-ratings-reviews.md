# Phase 1: Ratings & reviews

**Last updated:** 17 Nov 2026

**Status:** Draft  ·  **Owner:** Tom

## Goal
Members can rate any film or show and optionally write a review. Ratings feed the taste profile later (phase 3).

## Already decided
- TV is rated at the **show** level, with no episodes in v1.
- Rating a title writes it to the catalogue (catalogue rows exist only for titles someone interacted with).

## User stories
- As a member, I want to rate a title so I remember what I thought and get better recommendations.
- As a member, I want to write a review so I can say why.
- As a visitor, I want to read a member's ratings on their public profile. *(Depends on open question 4.)*
- *TODO (Tom): more?*

## Acceptance criteria
- [ ] *TODO: rating scale (5 stars? half stars? 10-point?)*
- [ ] A member can rate, change and remove a rating from the title page
- [ ] A member can add, edit and delete a review
- [ ] Ratings show on the member's profile
- [ ] Signed-out visitors are asked to log in when they try to rate
- [ ] *TODO*

## Data changes
*TODO:* ratings table and reviews table (or one table?), with RLS: the owner writes; reading depends on open question 4.

## Security and abuse
Owner-only writes; per-member rate limit on reviews; review length cap; reviews render as plain text.

## Out of scope
Episode ratings; likes or comments on reviews (phase 6?).

## Open questions
`open-questions.md` #4 (public vs private), #5 (moderation).
