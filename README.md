# Brain Snacks

Snack-size learning games for kids — games that teach, instead of junk.
The first one is **Rotem's Sky Letters**: a Flappy-Bird-style game where you read a
syllable or Hebrew word out loud and the bird flies through the gate.

Live site: https://brainsnacks.pages.dev

## Layout

```
site/                      everything here is published as-is (no build step)
  index.html               the catalogue: one card per game
  rotem-sky/index.html     Rotem's Sky Letters (single self-contained file)
  <next-game>/index.html   new games go in their own folder
tools/
  play-local.command       double-click to play locally in Chrome
  testclips/               recorded syllables and words for testing speech recognition
wrangler.toml              Cloudflare Pages project settings
```

Each game is a static page with its own folder, so games never share state or break
each other. Shared code (fonts, sounds, a speech helper) can move into `site/shared/`
once a second game needs it.

## Adding a game

1. Create `site/<game-id>/index.html`.
2. Add a card for it in `site/index.html` (copy the existing card).
3. Add a `← All games` link back to `../` on the game's start screen.
4. Deploy.

## Playing locally

Double-click `tools/play-local.command`. It serves the repo on http://localhost:8799 and
opens the game in Chrome, which remembers the microphone permission for localhost.
While running, everything the game hears is written to `heard.log` at the repo root —
useful for tuning recognition, and ignored by git because it holds a child's speech.

## Deploying

```bash
npx wrangler@3 pages deploy
```

Uses `wrangler.toml` (project `brainsnacks`, output folder `site/`). Run
`npx wrangler@3 login` first on a new machine.

## How Rotem's Sky Letters listens

- **Whisper in the browser** (transformers.js, loaded from jsDelivr; models from Hugging
  Face, cached after the first load). Instead of free transcription it scores how likely
  each syllable/word on the list is for the recorded clip, so it can only ever pick an
  answer the child is practising. English sounds use `whisper-tiny.en`; Hebrew words use
  multilingual `whisper-tiny` with the `<|he|>` prefix.
- **Chrome's built-in speech recognition** runs alongside (English or Hebrew) and can
  open a gate first. It sends audio to Google.
- Progress, settings and the word list are saved in the browser's localStorage, per device.
- Grown-up settings: press and hold ⚙ on the start screen.
