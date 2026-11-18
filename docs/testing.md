# Testing

**Last updated:** 17 Nov 2026

## The test suites

| Command | What | Where |
|---|---|---|
| `npm run check` | Lint + typecheck + unit tests | `tests/unit/` |
| `npm run test:db` | Row-level security tests on **real Postgres** (with a small stand-in for Supabase's auth schema) | `tests/db/` (`harness.ts`, `supabase-stub.sql`) |
| `npm run build` | Production build | n/a |

All three run in CI and must be green before merging. Foundations ended with 18 unit tests and 18 database tests passing.

## What must be tested

| When you add… | You must add… |
|---|---|
| A table or policy | RLS tests as **owner, another user, signed out, anonymous guest**, covering select/insert/update/delete |
| A Server Action or Route Handler | A test that it rejects a signed-out user and another user's data |
| Pure logic (scoring, parsing, formatting) | Unit tests with fixed fixtures, including edge cases |
| A TMDB-backed feature | Tests against the fake TMDB (`TMDB_API_BASE_URL`), including TMDB failing |
| A Claude-backed feature | Tests with a mocked Claude response, including bad output and cap reached |
| A UI change | Screenshots at desktop and phone widths; keyboard check (tab through it) |

## Rules

- A bug fix comes with a test that fails before the fix.
- Database tests run against real Postgres, never mocks. They caught a real bug in Foundations.
- Tests never touch the production database or real TMDB/Claude.
- Keep tests fast and independent: each test sets up its own data.

## Before launch (phase 7)

- [ ] End-to-end tests for the main journeys (sign up → rate → list → recommend)
- [ ] Accessibility pass (contrast, keyboard, screen-reader labels)
- [ ] Load check on the most-visited pages
