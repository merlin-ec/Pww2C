# Design

**Last updated:** 17 Nov 2026

## The look: "theatre lobby"

- Dark, warm, cinematic: velvet and brass.
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
