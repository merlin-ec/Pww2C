# Docs map

**Last updated:** 24 Nov 2026

These docs are kept current: every change updates its doc in the same PR, and CI checks it. See `../CLAUDE.md` → *Keep the docs current*.

Who each doc is for, and when it gets updated. Files marked **(existing)** came with Foundations. Don't overwrite them; add to them.

## Read first

| Doc | For | Updated |
|---|---|---|
| `../TOM.md` | Tom | Every session |
| `../CLAUDE.md` | Agents | When a rule changes |
| `status.md` | Agents + Tom | Start and end of every session |
| `handoff.md` | Agents + Tom | End of every session (new entry) |

## What we're building

| Doc | What's in it |
|---|---|
| `product.md` | What PWW is, v1 scope, non-goals |
| `specs/` | One spec per build phase, with acceptance criteria |
| `glossary.md` | The exact name for every concept |
| `open-questions.md` | Decisions waiting on Tom |
| `decisions.md` **(existing)** | Every choice made, with the reason. Append, never rewrite |

## How it's built

| Doc | What's in it |
|---|---|
| `architecture.md` | How the pieces connect; request and data flow |
| `database.md` **(existing)** | Migration workflow, checksum check, who can access what |
| `auth.md` | Accounts, guests, sessions, the user check |
| `integrations.md` | TMDB, JustWatch, Supabase, Vercel, Claude API, email |
| `recommendations.md` | Scoring engine, Claude layer, the $10 cap |
| `env.md` | Every environment variable: public or secret, where it's set |
| `design.md` | The look (emerald and brass), components, copy tone |
| `how-it-works/` **(existing)** | Plain-English explanation of each finished feature |

## How we work

| Doc | What's in it |
|---|---|
| `workflow.md` | Branches, PRs, multi-agent rules, migrations |
| `conventions.md` | Code patterns to follow |
| `testing.md` | What must be tested and how |
| `security.md` | Threats, secrets, RLS, AI safety |

## Running it

| Doc | What's in it |
|---|---|
| `setup.md` **(existing)** | One-time account and settings setup |
| `runbook.md` | Deploy, roll back, and what to do when something breaks |
| `costs.md` | Every service, what it costs, every cap |
| `../CHANGELOG.md` | What changed for users, by release |
