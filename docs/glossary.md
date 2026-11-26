# Glossary

**Last updated:** 25 Nov 2026

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
| **Review** | An optional longer write-up (up to 5,000 characters), one per member per title | "thought" (that's the one-liner) |
| **Short thought** | One line (up to 280 characters) with a rating or a logged watch *(prototype)* | "comment", "note" |
| **Logged watch** | One diary entry: a title, the date watched, and optionally a rating and thought. A title can be logged many times | "view", "play" |
| **Watch diary** | A member's logged watches, newest first | "history", "log" |
| **Visibility** | Who can see a member's ratings, reviews and diary: *Everyone* or *Private* (phase 6 adds *People I follow*, *A few followers I pick*) | "privacy" (too broad) |
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
