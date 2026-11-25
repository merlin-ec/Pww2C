# Design

**Last updated:** 24 Nov 2026

> **Direction: emerald and brass (Tom, 24 Nov; `decisions.md` → *Design*).** Dark emerald replaces the velvet red; brass stays the accent. The exact colour values aren't chosen yet (`status.md` → *Next up*). Until that PR merges, the code still uses the Foundations velvet palette in `src/app/globals.css` (`@theme`). Don't copy the 18 Nov prototype's look: use it only for features and flows (`product.md` → *Prototype*).

## The look: "theatre lobby", in emerald and brass

- Dark, warm, cinematic: emerald and brass (was velvet and brass in Foundations).
- **Backlit marquee** for titles: the signature motif. Use it for headline titles only, not everywhere.
- Fonts are self-hosted (no third-party font requests).
- Built with Tailwind.

## Tokens

*TODO (first agent with repo access): copy the real colour, type and spacing tokens from the global stylesheet into this table.*

| Token | Value | Use |
|---|---|---|
| background | | page |
| surface | | cards, panels |
| text | | body |
| text-program | | secondary text (exists in code) |
| accent (brass) | | links, buttons, focus |
| danger | | errors, destructive actions |

## Components

*TODO: list shared components in `src/components/` with one line each (e.g. `TitleGrid`, `Notice`), so agents reuse them instead of making new ones.*

## Rules

- Mobile first: every page must work at phone width. Check desktop and phone before merging.
- Contrast meets WCAG AA. Focus states are visible. A skip link exists; keep it working.
- Posters always have alt text (the title and year).
- Every list or grid has loading, empty and error states.

## Voice and copy

- Plain, warm, a little cinematic. Never cute in error messages.
- Say what happened and what to do: "Trending titles didn't load. Search still works, or refresh in a minute."
- Buttons are verbs: "Rate", "Add to watchlist", "Start a watch session".
