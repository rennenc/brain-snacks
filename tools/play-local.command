#!/bin/bash
# Double-click to play locally in Chrome. Serves the repo root, so "What the game heard"
# requests land in heard.log (kept out of git: it holds a child's speech transcripts).
cd "$(dirname "$0")/.."
PORT=8799
python3 -m http.server $PORT --bind 127.0.0.1 >>heard.log 2>&1 &
SERVER=$!
sleep 1
URL="http://localhost:$PORT/site/games/rotem-sky/"
open -a "Google Chrome" "$URL" 2>/dev/null || open "$URL"
echo "Running at $URL (catalogue: http://localhost:$PORT/site/). Close this window to stop."
wait $SERVER
