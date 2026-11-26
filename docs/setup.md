# Setting up accounts and settings

**Last updated:** 25 Nov 2026

The things only the owner can do, in order. Never paste secret keys into a chat, a commit or an issue: they go straight into the settings pages below.

## 1. GitHub

Done: the repository is `merlin-ec/Pww2C` (public), and the Claude GitHub app has access.

Still to do: protect `main`. Go to **Settings → Branches** (or **Rules → Rulesets**) and add a rule for `main`:
- require a pull request before merging, with 0 approvals (you can't approve your own)
- require these status checks: `Lint, types, unit tests and build`, `Database security rules`, `docs-check`

## 2. Vercel (hosting)

1. At vercel.com, **Add New → Project** and import the `Pww2C` repository. Keep the detected Next.js settings.
2. Before the first deploy, add these under **Settings → Environment Variables** (all environments):

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://qlisfitmvovfzkljmsfm.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_R3gov60-ugC842W2Jkb0Ig_EEV6cT16` (public by design) |
   | `SUPABASE_SECRET_KEY` | Supabase → Project Settings → API Keys → create a secret key named `vercel`, copy it here |
   | `TMDB_READ_TOKEN` | TMDB → Settings → API → **API Read Access Token** (the long one) |

3. Deploy. Every push to `main` then deploys automatically, and every pull request gets a preview link.

## 3. TMDB

Create an account at themoviedb.org, then **Settings → API** and request a developer key. Choose personal/non-commercial use and describe PWW as a free film-recommendation web app. Copy the **API Read Access Token** into Vercel (above).

## 4. Supabase auth settings

These live in the dashboard because they're account settings, not schema. Project: `pww`.

1. **Authentication → URL Configuration**
   - Site URL: your production address (the `…vercel.app` one for now, your domain later).
   - Redirect URLs: add `https://<your production address>/**`, `https://*-<your-vercel-team>.vercel.app/**` (preview deployments) and `http://localhost:3000/**`.
2. **Authentication → Emails → Templates**
   - *Confirm signup*: subject `Confirm your PWW account`, body = contents of `supabase/templates/confirmation.html`.
   - *Reset password*: subject `Reset your PWW password`, body = contents of `supabase/templates/recovery.html`.
3. In the email/password settings, set the **minimum password length to 8**.

## 5. Domain and email (before inviting anyone)

Supabase's built-in email only sends a couple of messages an hour, so real sign-ups and password resets need our own sender.

1. Buy a domain (about $10–20 a year) and add it in Vercel → Settings → Domains.
2. Create a free Resend account, add the domain and the DNS records it asks for, and create SMTP credentials.
3. In Supabase → Authentication → Emails → SMTP settings, enable custom SMTP with Resend's details and a sender like `PWW <hello@your-domain>`. Turn off link tracking in Resend (it breaks one-time links).
4. Update the Site URL and Redirect URLs in step 4 to the new domain, and set `NEXT_PUBLIC_SITE_URL` in Vercel.

## 6. TMDB logo (before launch)

TMDB requires its logo on the About page. Download the approved logo from themoviedb.org/about/logos-attribution and add it to `public/`.
