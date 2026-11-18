# Conventions

**Last updated:** 18 Nov 2026

Patterns to follow so every agent's code looks like one person wrote it. If the existing code does something differently from this doc, **match the code** and fix this doc.

## TypeScript

- Strict mode, with `noUncheckedIndexedAccess` on. Don't silence the type checker with `any` or `!`. Handle the case instead.
- Validate data from outside the app (forms, TMDB, Claude) with Zod at the boundary. Use plain types inside.
- Supabase types are generated into `src/lib/supabase/database.types.ts`. Regenerate it; never hand-edit it.

## Next.js 16

- Server Components by default. Add `"use client"` only for interactivity, and keep client components small.
- Personal data renders behind `<Suspense>` so the static shell stays instant.
- Cache with `'use cache'` + `cacheLife`. Use `connection()` for sections that must render at request time.
- Mutations are Server Actions in the route folder that uses them. Each one: check the user (`dal.ts`) → validate (Zod) → write → revalidate.
- Request-wide logic goes in `src/proxy.ts`, and only when it truly applies to every request.

## Data

- Title keys: `movie:<tmdbId>` / `tv:<tmdbId>`.
- Never write to the database while rendering a page. Writes happen on user actions.
- All TMDB calls go through `src/lib/tmdb/`; all catalogue shaping goes through `src/lib/catalogue/`.

## Errors and copy

- Errors shown to users are plain English, say what happened, and suggest what to do next. For example: "The film database didn't respond. Search still works, or refresh in a minute."
- Handle three states explicitly: loading, empty, and error. Empty states suggest an action.
- Log errors on the server with context. Never log secrets or personal data.

## Styling

- Tailwind, using the theme tokens (see `design.md`). No one-off hex colours in components.
- Every interactive element is reachable by keyboard and has a visible focus state.

## Files and naming

- *TODO (first agent with repo access): record the existing file-naming and component patterns here.*
- One component per file. Co-locate a component's helpers unless they're shared.

## Comments

- Explain **why**, not what. Explain any use of the secret key or anything that bypasses RLS.
