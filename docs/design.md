# Design

**Last updated:** 25 Nov 2026

> **Direction: emerald and brass (Tom, 24 Nov; `decisions.md` → *Design*).** Dark emerald replaces the velvet red; brass stays the accent. Values are in *Tokens* below and in `src/app/globals.css` (`@theme`), which wins if the two ever differ. Before/after screenshots: `design/emerald-before-after-desktop.png` and `-phone.png`. Don't copy the 18 Nov prototype's look: use it only for features and flows (`product.md` → *Prototype*).

## The look: "theatre lobby", in emerald and brass

- Dark and cinematic: deep emerald surfaces, warm ivory text and brass highlights (velvet red in Foundations, until 24 Nov).
- **Backlit marquee** for titles: the signature motif. Use it for headline titles only, not everywhere.
- Fonts are self-hosted (no third-party font requests).
- Built with Tailwind.

## Tokens

Colours, as Tailwind theme tokens (`bg-curtain`, `text-program`, `border-seam` and so on). The surface names are fabrics, not colours, so they survived the move from velvet red to emerald unchanged (`decisions.md` → *Design*). Contrast is WCAG 2 against each background.

| Token | Value | Use | Contrast |
|---|---|---|---|
| `velvet` | `#0b1a14` | page background; text on brass buttons | |
| `curtain` | `#11241c` | cards, panels, notices, skeletons | |
| `plush` | `#183126` | text inputs | |
| `seam` | `#2c4a3c` | borders and dividers (decorative) | 1.8:1 on velvet. Not used as text |
| `ivory` | `#f3e7d3` | body text | 14.7 velvet · 13.3 curtain · 11.4 plush |
| `program` | `#bfa88c` | secondary text; placeholders at 85% | 7.8 velvet · 7.1 curtain · 6.1 plush · placeholder 4.8 |
| `brass` | `#cfa45a` | primary buttons, links, focus ring | 7.8 on velvet; velvet on brass 7.8 |
| `brass-bright` | `#e6c27e` | primary button hover | velvet on it 10.6 |
| `marquee` | `#fff4da` | the backlit marquee | |
| `marquee-ink` | `#0b1a14` | marquee text (same as velvet) | 16.4 on marquee |
| `exit` | `#eb5f56` | errors, destructive actions (was `#e5534b`, brightened for curtain) | 5.4 velvet · 4.9 curtain |
| `go` | `#8fc98f` | success messages | 9.3 velvet · 8.5 curtain |

Fonts: `font-display` = Big Shoulders Display (marquee only), `font-sans` = Instrument Sans (everything else). The browser theme colour in `src/app/layout.tsx` matches `velvet`.

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
