<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## PWW project rules

Read `docs/decisions.md` before changing how anything works, and add a line there for any non-obvious decision.

- **Schema changes only through new files in `supabase/migrations/`.** Never edit an applied migration and never change the schema in the Supabase dashboard. Follow `docs/database.md` (apply, rename to production's version, checksum, regenerate types, run the security advisor).
- **Every new table gets row-level security, explicit grants, and tests in `tests/db/`.**
- **Secrets stay on the server.** Anything reading `SUPABASE_SECRET_KEY` or `TMDB_READ_TOKEN` imports `server-only`. Use the admin client only where no user should be able to act directly.
- **Check the user in every Server Action and Route Handler** with `src/lib/auth/dal.ts`, never by trusting form data.
- **Taste data is structured** (ids and fixed options), never free text to parse later. Every rate, dismiss and save on a suggestion is logged.
- **Run `npm run check` and `npm run test:db` before pushing.**
- **Leave a short comment explaining why** for anything non-obvious. The owner must be able to read and explain the code.
