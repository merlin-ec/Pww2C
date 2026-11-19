# Product

**Last updated:** 18 Nov 2026

## What PWW is

One place where your film and TV taste, tracking, deciding, sharing and streaming services live together.

The prototype's pitch: *"A little less algorithm. A little more you."* Fewer, better picks that say why they're there; a diary and collections of your own; and a way to agree on something to watch with other people.

*TODO (Tom): one paragraph on who it's for and why it beats Letterboxd / JustWatch / a notes app.*

## Prototype (18 Nov 2026)

Tom had ChatGPT build a click-through prototype from an earlier PWW brief: <https://pww-picture-house.primemockingbird.chatgpt.site>. Tom: it **shows the idea of what he wants really well**, but he **doesn't like how it looks**.

- **Use it for features and flows. Never copy its look** (see `design.md`).
- It's a device-only demo: no accounts, a fixed 36-title catalogue, US streaming only, fictional community profiles.
- Where it disagrees with a decision in `decisions.md`, the decision stands until Tom says otherwise (e.g. it shows only the US; v1 still covers six countries).

What it shows, by phase. The detail is in each spec, marked *(prototype)*:

| Area | What the prototype does | Spec |
|---|---|---|
| Title page | Save, trailer link, synopsis, where to watch, add to collection, your rating (half stars) + a short thought, *Log this watch*, TMDB score, *Follow the thread* (similar titles) | 01, 03 |
| Library | Watchlist, Collections, Watched, Favorites; collections have a description and are private until shared | 02 |
| Onboarding | 4 steps: name + up to 10 genres; up to 5 favourites; pace, adventurousness, genres to skip; streaming services | 03 |
| For you / Discover | *Taste fit* score and a one-line reason on every pick; Save / Not for me; filters Films, Series, Under 2 hours; sort by your taste; a featured *Evening Edit* on the home page | 03 |
| Streaming | Pick your services; compare them against your watchlist and taste; a *streaming rotation* (keep, pause or add) | 04 |
| Watch together | Room with a name; everyone's loves and no-thank-yous; *group fit* shortlist; I'm in / Pass until a unanimous yes; invite link; guests without accounts | 05 |
| Community | Follow people's taste; taste-match after 3 shared ratings; feed of logged watches with short thoughts; Report | 06 |
| Profile | Stats, favourite genres, watch diary, *Refine your taste*, export your library | 01, 03, 06, 07 |


## Who it's for

*TODO (Tom):* primary user, secondary user. E.g. "film fans who want recommendations that explain themselves" / "friends deciding what to watch together".

## v1 scope

| Phase | What users get |
|---|---|
| 0. Foundations | Account (sign up, log in, reset password, delete account), search, trending, film/TV pages with cast, crew and where-to-watch |
| 1. Ratings & reviews | Rate (half stars) and review films and shows; log watches in a diary |
| 2. Lists & watchlist | Watchlist, Watched, Favorites, collections (private until shared), share pages |
| 3. Onboarding & recommendations | 4-step onboarding; picks with a taste-fit score and reasons; Not for me |
| 4. Streaming advice | What to watch on your services; a streaming rotation (keep, pause, add) |
| 5. Watching together | Group-fit shortlist, I'm in / Pass to a unanimous yes; guests join without an account |
| 6. Social | Follow people's taste, taste-match, feed of logged watches, report |
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
