# Phase 7: Polish & launch

**Last updated:** 17 Nov 2026

**Status:** Draft  ·  **Owner:** Tom

## Goal
PWW is ready for people Tom doesn't know: reliable, backed up, legally covered, and pleasant everywhere.

## Launch checklist

**Infrastructure**
- [ ] Supabase Pro ($25/mo): backups, no pausing (Tom's OK)
- [ ] Domain bought and added in Vercel (open question 2)
- [ ] Resend SMTP in Supabase; link tracking off; `NEXT_PUBLIC_SITE_URL` set
- [ ] Supabase Site URL + redirect URLs updated to the domain
- [ ] Spend limits set on every paid service

**Legal and terms**
- [ ] TMDB logo and attribution on the About page
- [ ] JustWatch credited wherever availability shows
- [ ] Privacy policy and terms
- [ ] Commercial-use question answered (open question 1)

**Quality**
- [ ] End-to-end tests for the main journeys
- [ ] Accessibility pass
- [ ] Every page checked on phone and desktop
- [ ] Empty, loading and error states everywhere
- [ ] Security advisor and performance advisor clean
- [ ] `npm audit` reviewed

**Safety**
- [ ] CAPTCHA decision for sign-up and guests
- [ ] Report or moderation path (open question 5)
- [ ] Account deletion and data export work (open question 8)

**Tom**
- [ ] Final walkthrough
- [ ] Go / no-go
