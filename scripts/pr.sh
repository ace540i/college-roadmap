#!/usr/bin/env bash
# pr.sh — Push current branch and create a GitHub Pull Request
#
# Usage:
#   ./scripts/pr.sh                          # prompts for title & body
#   ./scripts/pr.sh "My PR title"            # title as argument, prompts for body
#   ./scripts/pr.sh "My PR title" "My body"  # title and body as arguments
#
# Requirements:
#   - GITHUB_TOKEN env var (or set it in a .env file in the repo root)
#   - curl, git

set -euo pipefail

REPO="ace540i/college-roadmap"
BASE_BRANCH="master"
API="https://api.github.com"

# ---------------------------------------------------------------------------
# Load token from .env if not already set
# ---------------------------------------------------------------------------
if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  if [[ -f ".env" ]] && grep -q "GITHUB_TOKEN" .env 2>/dev/null; then
    export $(grep "^GITHUB_TOKEN" .env | xargs)
  fi
fi

if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "ERROR: GITHUB_TOKEN is not set."
  echo "  Set it in your shell:  export GITHUB_TOKEN=ghp_..."
  echo "  Or add GITHUB_TOKEN=ghp_... to the .env file in the repo root."
  exit 1
fi

# ---------------------------------------------------------------------------
# Detect current branch
# ---------------------------------------------------------------------------
BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [[ "$BRANCH" == "$BASE_BRANCH" ]]; then
  echo "ERROR: You are on '$BASE_BRANCH'. Switch to a feature branch first."
  exit 1
fi

# ---------------------------------------------------------------------------
# Push branch to origin
# ---------------------------------------------------------------------------
echo "Pushing branch '$BRANCH' to origin..."
git push -u origin "$BRANCH"

# ---------------------------------------------------------------------------
# Collect PR title and body
# ---------------------------------------------------------------------------
if [[ $# -ge 1 ]]; then
  PR_TITLE="$1"
else
  printf "PR title: "
  read -r PR_TITLE
fi

if [[ -z "$PR_TITLE" ]]; then
  echo "ERROR: PR title cannot be empty."
  exit 1
fi

if [[ $# -ge 2 ]]; then
  PR_BODY="$2"
else
  echo "PR body (press Enter twice when done):"
  PR_BODY=""
  while IFS= read -r line; do
    [[ -z "$line" ]] && break
    PR_BODY="${PR_BODY}${line}\n"
  done
fi

# ---------------------------------------------------------------------------
# Create PR via GitHub API
# ---------------------------------------------------------------------------
echo "Creating pull request..."

RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "$API/repos/$REPO/pulls" \
  -d "$(jq -n \
    --arg title "$PR_TITLE" \
    --arg body  "$PR_BODY" \
    --arg head  "$BRANCH" \
    --arg base  "$BASE_BRANCH" \
    '{title: $title, body: $body, head: $head, base: $base}'
  )"
)

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [[ "$HTTP_CODE" == "201" ]]; then
  PR_URL=$(echo "$BODY" | grep -o '"html_url": *"[^"]*"' | head -1 | sed 's/"html_url": *"\(.*\)"/\1/')
  echo ""
  echo "Pull request created successfully!"
  echo "  $PR_URL"
  # Try to open in browser (macOS)
  if command -v open &>/dev/null; then
    open "$PR_URL"
  fi
elif [[ "$HTTP_CODE" == "422" ]]; then
  # PR might already exist
  MSG=$(echo "$BODY" | grep -o '"message": *"[^"]*"' | head -1)
  echo "GitHub returned 422: $MSG"
  echo "A pull request for this branch may already exist."
  echo "  https://github.com/$REPO/pulls"
else
  echo "ERROR: GitHub API returned HTTP $HTTP_CODE"
  echo "$BODY"
  exit 1
fi
