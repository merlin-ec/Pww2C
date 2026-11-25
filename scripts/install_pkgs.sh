#!/bin/bash
# Installs npm packages at the start of a cloud session. Run by the
# SessionStart hook in .claude/settings.json. Based on
# https://code.claude.com/docs/en/cloud-environments#install-dependencies-with-a-sessionstart-hook
#
# Why a hook and not a cloud setup script: it lives in the repo, so it's
# reviewed in PRs and needs no settings on claude.ai. See docs/decisions.md
# and docs/security.md (Dependencies).

# Local sessions (Tom's laptop) manage their own node_modules.
# CLAUDE_CODE_REMOTE is only "true" on Anthropic's cloud machines.
if [ "$CLAUDE_CODE_REMOTE" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR" || exit 0
hashes=node_modules/.install_pkgs.sha256

# What the last successful install was made from. The Node version is in it
# too, so a new cloud image reinstalls rather than keeping old native builds.
fingerprint() {
  sha256sum scripts/install_pkgs.sh package.json package-lock.json
  echo "node $(node --version)"
}

# Skip the install while nothing above has changed. npm ci deletes
# node_modules first, which removes the old record too, so a failed install
# retries next time.
#
# --ignore-scripts: no dependency needs an install script today, and it stops
# a lockfile change from running package code before the agent has read it.
# If a future dependency needs one, drop the flag in that PR and say why.
#
# npm's output goes to stderr: a SessionStart hook's stdout is added to the
# agent's context, and an install log there is just noise.
if [ "$(cat "$hashes" 2>/dev/null)" != "$(fingerprint)" ]; then
  if npm ci --ignore-scripts --no-audit --no-fund >&2; then
    fingerprint > "$hashes" || rm -f "$hashes"
  fi
fi

# Never stop the session from starting. If the install failed, `npm run check`
# fails too, and the agent can run `npm ci` itself.
exit 0
