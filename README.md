# Brain Snacks

Snack-size learning games and interactive lessons for kids — things that teach, instead of junk.

- **Rotem's Sky Letters** (game): a Flappy-Bird-style game where you read a syllable or
  Hebrew word out loud and the bird flies through the gate.
- **מעבדת הנייר המעופף — the Flying Paper Lab** (lesson, ages 8–12): why planes fly. Eight home
  experiments with paper, a Bernoulli tube simulator, a wind tunnel, a flight log and a quiz.
- **מעבדת הצליל — the Sound Lab** (lesson, ages 9–13): a live microphone oscilloscope, a
  pitch game, a straw flute measured in Hz, a rubber-band guitar, tuned water glasses, a wave
  mixer (Pythagoras' ratios and beats) and a lightning-and-thunder race.

Live site: https://brainsnacks.pages.dev

## Layout

```
site/                                  everything here is published as-is (no build step)
  index.html                           the catalogue: a Games shelf and a Lessons shelf
  games/rotem-sky/index.html           Rotem's Sky Letters (single self-contained file)
  lessons/flying-paper-lab/index.html  the Flying Paper Lab (Hebrew, right-to-left)
  lessons/sound-lab/index.html         the Sound Lab (Hebrew; uses the microphone, nothing is sent)
  games/<id>/  lessons/<id>/           new games and lessons each get their own folder
  _redirects                           keeps old addresses working (/rotem-sky/ → /games/rotem-sky/)
tools/
  play-local.command       double-click to play locally in Chrome
  testclips/               recorded syllables and words for testing speech recognition
wrangler.toml              Cloudflare Pages project settings
```

Each game or lesson is a static page in its own folder, so they never share state or break
each other. Shared code (fonts, sounds, a speech helper) can move into `site/shared/`
once a second game needs it.

## Adding a game or lesson

1. Create `site/games/<id>/index.html` or `site/lessons/<id>/index.html`.
2. Add a card for it on the right shelf in `site/index.html` (copy an existing card). Set
   `data-age-min` / `data-age-max` on the card and a matching `גילאי X–Y` tag, so the
   catalogue can filter by age.
3. Add a link back to the catalogue (`../../`).
4. Deploy.

## Playing locally

Double-click `tools/play-local.command`. It serves the repo on http://localhost:8799 and
opens the game in Chrome, which remembers the microphone permission for localhost.
While running, everything the game hears is written to `heard.log` at the repo root —
useful for tuning recognition, and ignored by git because it holds a child's speech.

## Deploying

Every push to `main` publishes `site/` to the **personal** Cloudflare account
(`c3a723351b598ee5ab014b6f5514b8aa`, project `brainsnacks`) via
`.github/workflows/deploy.yml`. It needs one repository secret, `CLOUDFLARE_API_TOKEN`:
a token from the personal account with *Account → Cloudflare Pages → Edit*.

Don't use `wrangler login` for this project: wrangler keeps one login for the whole computer,
and the same computer is used with a work Cloudflare account. To publish by hand, put the
personal token in a git-ignored `.env.local` (`CLOUDFLARE_API_TOKEN=...`) and run
`tools/deploy-local.sh`, which pins the personal account ID.

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
