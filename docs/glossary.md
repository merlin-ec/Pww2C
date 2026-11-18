# Glossary

**Last updated:** 17 Nov 2026

Use these exact words in code, UI and docs. If you need a new term, add it here first. Two words for one thing causes bugs.

| Term | Means | Not |
|---|---|---|
| **Title** | A film or a TV show | "movie" (when you mean both), "item", "content" |
| **Title key** | `movie:603` / `tv:1396` | "id" alone (ambiguous) |
| **Catalogue** | Our stored copies of titles users have interacted with | "library", "cache" |
| **Member** | A signed-up user | "customer" |
| **Guest** | An anonymous user inside a watch session | "visitor" (that's someone signed out) |
| **Visitor** | Someone browsing while signed out | |
| **Profile** | A member's public page and settings | "account" (that's auth) |
| **Rating** | A member's score for a title. TV is rated per show | "review" (that's the text) |
| **Review** | Written text attached to a rating | |
| **Watchlist** | The single built-in "want to watch" list | "queue", "saved" |
| **List** | A member-made, named collection of titles | "collection", "playlist" |
| **Share page** | A public page for a list or profile | |
| **Taste profile** | What we've learned about a member's preferences | "persona", "vibe" |
| **Recommendation** | A suggested title plus its reasons | |
| **Scoring engine** | The rule-based ranking layer | "algorithm" |
| **Claude layer** | The part that asks Claude for deep cuts | "AI" (too vague) |
| **Deep cut** | A lesser-known title suggested by the Claude layer | |
| **Where to watch** | Streaming/rent/buy availability for a title in a country | "providers" in the UI |
| **Streaming advice** | Phase 4: what to watch on your services, what's worth subscribing to | |
| **Watch session** | Phase 5: a shared space for picking something together | "room", "party" |
| **Usage day** | A day a member used the app (tracked in `src/proxy.ts`) | |
| **Marquee** | The backlit title banner in the UI | |
| **Phase** | One step of the build order (0–7) | "milestone", "sprint" |
