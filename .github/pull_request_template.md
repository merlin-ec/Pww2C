## What changed (for a user)
<!-- One or two plain-English sentences. "Users can now…" -->

## Spec
<!-- e.g. docs/specs/01-ratings-reviews.md, and which acceptance criteria this covers -->

## How it works
<!-- Short technical summary for the reviewer -->

## Database
- [ ] No database changes
- [ ] New migration: `supabase/migrations/…`, applied and checksum-verified
- [ ] RLS tests added/updated in `tests/db/` (owner, other user, signed out, guest)
- [ ] Security advisor clean after applying
- [ ] `docs/database.md` updated

## Security
- [ ] Every new Server Action / Route Handler checks the user
- [ ] Inputs validated with Zod on the server
- [ ] No secrets reach the browser; no new `NEXT_PUBLIC_` secrets
- [ ] No user text sent to Claude as instructions

## Checks
- [ ] `npm run check` passes
- [ ] `npm run test:db` passes
- [ ] Checked on desktop and phone widths (screenshots below if UI changed)

## New dependencies
<!-- Name + why, or "none" -->

## Costs
<!-- Does this add or change any spend? "none" if not. Anything new needs Tom's OK first. -->

## Risks / not done
<!-- What could break, what's skipped, what's left for later -->

## Docs updated
<!-- A change isn't done until the docs match it. See CLAUDE.md → "Keep the docs current". -->

Every session:
- [ ] `docs/status.md`
- [ ] `docs/handoff.md` (new entry)
- [ ] `TOM.md`
- [ ] `CHANGELOG.md` (if users would notice)

Whatever this PR changed:
- [ ] `docs/database.md` (schema, RLS, grants)
- [ ] `docs/env.md` + `.env.example` (env vars)
- [ ] `docs/decisions.md` (a choice was made)
- [ ] Spec in `docs/specs/`, `docs/product.md`, `docs/how-it-works/` (feature behaviour)
- [ ] `CLAUDE.md` (commands, scripts, folder layout)
- [ ] `docs/costs.md` · `docs/security.md` · `docs/auth.md` · `docs/architecture.md` · `docs/integrations.md` · `docs/glossary.md` (if touched)
- [ ] Fixed any doc I found to be wrong, and updated *Last updated* on every doc I edited

<!-- Only if truly nothing needs a doc, add this line (CI reads it):
no-doc-impact: <reason>
-->

## Screenshots
