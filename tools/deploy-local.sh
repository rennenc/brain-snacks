#!/bin/bash
# Publish site/ to the PERSONAL Cloudflare account from this computer, without touching the
# computer-wide `wrangler login` (which may belong to a work account).
# Needs .env.local at the repo root (git-ignored) with:  CLOUDFLARE_API_TOKEN=...
set -euo pipefail
cd "$(dirname "$0")/.."
[ -f .env.local ] || { echo "Missing .env.local with CLOUDFLARE_API_TOKEN (a Brain Snacks token, not a work one)."; exit 1; }
set -a; . ./.env.local; set +a
export CLOUDFLARE_ACCOUNT_ID=c3a723351b598ee5ab014b6f5514b8aa   # personal account; never a work account
npx --yes wrangler@3 pages deploy site --project-name=brainsnacks --branch=main
