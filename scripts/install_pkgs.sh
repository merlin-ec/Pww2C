#!/bin/bash
# Installs npm packages at the start of a cloud session. Run by the
# SessionStart hook in .claude/settings.json. Based on
# https://code.claude.com/docs/en/cloud-environments#install-dependencies-with-a-sessionstart-hook
#
# Why a hook and not a cloud setup script: it lives in the repo, so it's
# reviewed in PRs and needs no settings on claude.ai. See docs/decisions.md.

# Local sessions (Tom's laptop) manage their own node_modules.
# CLAUDE_CODE_REMOTE is only "true" on Anthropic's cloud machines.
if [ "$CLAUDE_CODE_REMOTE" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR" || exit 1
hashes=node_modules/.install_pkgs.sha256

# Skip the install while the lockfile, package.json and this script are
# unchanged since the last successful install. npm ci deletes node_modules
# first, which removes the old hashes too, so a failed install retries next time.
#
# npm's output goes to stderr: a SessionStart hook's stdout is added to the
# agent's context, and an install log there is just noise.
if ! sha256sum --check --status "$hashes" 2>/dev/null; then
  if npm ci --no-audit --no-fund >&2; then
    sha256sum scripts/install_pkgs.sh package.json package-lock.json > "$hashes" || rm -f "$hashes"
  fi
fi

# Never stop the session from starting. If the install failed, `npm run check`
# fails too, and the agent can run `npm ci` itself.
exit 0
