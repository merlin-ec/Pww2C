# Auth

**Last updated:** 17 Nov 2026

Supabase Auth handles identity. Our code decides what each person can do, and RLS enforces it in the database.

## Kinds of user

| Kind | How they get in | Can |
|---|---|---|
| Signed-out visitor | Nothing | Browse titles, search, see public profiles and share pages |
| Member | Email + password (min 8 chars), confirmed by email | Everything in their account |
| Anonymous guest (phase 5) | Joins a watch session via link → Supabase anonymous sign-in | Only that watch session |
| Guest → member | Signs up from a guest session | Keeps everything: the user id never changes |

## Flows built in Foundations

Sign up · confirm email · log in · log out · reset password · delete account.

Email templates live in `supabase/templates/` (`confirmation.html`, `recovery.html`) and are pasted into the Supabase dashboard (see `setup.md`).

## Usernames

- Lowercase, 3–20 characters, with a short reserved list (in code).
- A taken or invalid username at sign-up never blocks account creation. The app asks for another.
- Profiles are public.

## How the code checks who you are

- `src/proxy.ts` refreshes the session on every request. It doesn't decide access.
- `src/lib/auth/dal.ts` is the single place that answers "who is signed in?". Every Server Action and Route Handler calls it first.
- The database double-checks with RLS (`auth.uid()`), so a bug in app code can't expose someone else's data.

## Settings that live in the Supabase dashboard

Not in migrations, because they're account settings. Any change to them needs Tom's OK.

- Site URL and redirect URLs (production, Vercel previews, `localhost:3000`)
- Email templates and subjects
- Minimum password length (8)
- Custom SMTP (Resend) before inviting real users, because the built-in email only sends a couple of messages an hour

## TODO

- [ ] Phase 5: enable anonymous sign-ins; limit what a guest can create; guest clean-up policy
- [ ] Decide: social logins (Google/Apple)? See `open-questions.md`
- [ ] Decide: CAPTCHA on sign-up and guest creation before launch?
