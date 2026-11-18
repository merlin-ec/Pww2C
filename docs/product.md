# Product

**Last updated:** 17 Nov 2026

## What PWW is

One place where your film and TV taste, tracking, deciding, sharing and streaming services live together.

*TODO (Tom): one paragraph on who it's for and why it beats Letterboxd / JustWatch / a notes app.*

## Who it's for

*TODO (Tom):* primary user, secondary user. E.g. "film fans who want recommendations that explain themselves" / "friends deciding what to watch together".

## v1 scope

| Phase | What users get |
|---|---|
| 0. Foundations | Account (sign up, log in, reset password, delete account), search, trending, film/TV pages with cast, crew and where-to-watch |
| 1. Ratings & reviews | Rate and review films and shows |
| 2. Lists & watchlist | Watchlist, custom lists, public share pages |
| 3. Onboarding & recommendations | Taste profile from onboarding; recommendations that say why |
| 4. Streaming advice | What to watch on the services you have; what's worth subscribing to |
| 5. Watching together | Pick something with friends; guests join without an account |
| 6. Social | Follow people, see their activity |
| 7. Polish & launch | Domain, email, paid database plan, legal pages, final polish |

Each phase has a spec in `specs/` with acceptance criteria.

## Decided product rules

These are already locked. They're in `decisions.md`.

- Films **and** TV are supported. TV is rated at the **show** level, with no episode tracking in v1.
- Streaming availability covers **US, CA, GB, AU, NZ, IE**. It defaults to the profile country, then the country Vercel detects, then US.
- **Profiles are public.** Usernames are lowercase, 3–20 characters, with a short reserved list.
- Guests join watch sessions as anonymous users, and keep everything if they sign up.

## Non-goals for v1

- Episode-level tracking
- Native mobile apps (the website works on phones)
- Countries beyond the six above
- *TODO (Tom): add anything you've decided not to do.*

## Success: how we'll know v1 works

*TODO (Tom):* e.g. "10 friends using it weekly", "recommendations rated useful > 60%".
