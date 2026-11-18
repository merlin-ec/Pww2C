#!/usr/bin/env bash
# Docs check: fails a PR whose code changes aren't matched by doc changes.
# Rules live in CLAUDE.md -> "Keep the docs current" and docs/workflow.md.
#
# CI sets BASE_SHA, HEAD_SHA and PR_BODY. Locally:
#   BASE_SHA=origin/main HEAD_SHA=HEAD bash scripts/docs-check.sh
#
# Escape hatch for true no-impact changes: a line in the PR description
#   no-doc-impact: <reason>
set -euo pipefail

base="${BASE_SHA:-origin/main}"
head="${HEAD_SHA:-HEAD}"

if printf '%s\n' "${PR_BODY:-}" | grep -qiE '^[[:space:]]*no-doc-impact:[[:space:]]*[^[:space:]<]'; then
  echo "Docs check skipped: PR description says no-doc-impact."
  exit 0
fi

changed="$(git diff --name-only "$base"..."$head")"
if [ -z "$changed" ]; then
  echo "No changed files."
  exit 0
fi

fail=0
touched() { grep -qxF "$1" <<<"$changed"; }
any() { grep -qE "$1" <<<"$changed"; }
problem() { echo "::error::$1"; fail=1; }

# Migrations -> database.md
if any '^supabase/migrations/' && ! touched 'docs/database.md'; then
  problem "supabase/migrations changed but docs/database.md was not updated."
fi

# Env vars -> env.md
if touched '.env.example' && ! touched 'docs/env.md'; then
  problem ".env.example changed but docs/env.md was not updated."
fi

# package.json scripts -> CLAUDE.md (Commands)
if touched 'package.json'; then
  base_scripts="$(git show "$base:package.json" 2>/dev/null | jq -S '.scripts // {}' 2>/dev/null || echo '{}')"
  head_scripts="$(git show "$head:package.json" | jq -S '.scripts // {}')"
  if [ "$base_scripts" != "$head_scripts" ] && ! touched 'CLAUDE.md'; then
    problem "package.json scripts changed but CLAUDE.md (Commands) was not updated."
  fi
fi

# Any change outside the docs -> handoff entry + TOM.md
if grep -vqE '^(docs/|[^/]+\.md$|\.github/pull_request_template\.md$)' <<<"$changed"; then
  touched 'docs/handoff.md' || problem "Code changed but there is no new docs/handoff.md entry."
  touched 'TOM.md'          || problem "Code changed but TOM.md was not updated."
fi

if [ "$fail" -ne 0 ]; then
  echo
  echo "Update the docs listed above in this PR. See CLAUDE.md -> 'Keep the docs current'."
  echo "If nothing really needs a doc, add 'no-doc-impact: <reason>' to the PR description."
  exit 1
fi

echo "Docs check passed."
