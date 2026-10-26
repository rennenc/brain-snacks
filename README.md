# Brain Snacks · חטיפים למוח

**פחות גלילה, יותר גדילה.** Less scrolling, more growing.

Brain Snacks is a small, growing collection of **learning games and interactive lessons for
kids**: short, hands-on, and built to actually teach something, as an alternative to games
that just eat time. Everything runs in the browser, in Hebrew first, with no accounts, ads or
tracking.

**Play it:** https://brainsnacks.pages.dev

## What's inside

| | Name | Ages | Language | What you learn | Docs |
|---|---|---|---|---|---|
| 🎮 Game | [Rotem's Sky Letters](https://brainsnacks.pages.dev/games/rotem-sky/) | 4–7 | עברית + English | Reading aloud: English syllables (BA, DE…) and Hebrew words with nikud | [docs](docs/games/rotem-sky.md) |
| 🧪 Lesson | [מעבדת הנייר המעופף · The Flying Paper Lab](https://brainsnacks.pages.dev/lessons/flying-paper-lab/) | 8–12 | עברית | Air pressure, Bernoulli, lift and drag, fair experiments | [docs](docs/lessons/flying-paper-lab.md) |
| 🧪 Lesson | [מעבדת הצליל · The Sound Lab](https://brainsnacks.pages.dev/lessons/sound-lab/) | 9–13 | עברית | Waves, frequency, inverse proportion, musical ratios, speed of sound | [docs](docs/lessons/sound-lab.md) |
| 🧪 Lesson | [כמה ארוכה שנה? · How Long Is a Year?](https://brainsnacks.pages.dev/lessons/calendars/) | 10–14 | עברית | The solar year vs. the lunar month; leap years in the Gregorian, Hebrew and Islamic calendars, calculated by hand | [docs](docs/lessons/calendars.md) |

The same list, machine-readable, is in [`site/catalog.json`](site/catalog.json) (ages,
languages, skills, microphone use). Keep it in step with the catalogue page.

## What makes a Brain Snack

- **One skill, really practised.** A game drills one thing (reading aloud); a lesson explains
  one idea end to end (why planes fly).
- **Hands-on.** Lessons pair a real experiment at home (paper, straws, glasses of water) with an
  interactive simulator, and ask for a prediction before every experiment.
- **Rewarding, not addictive.** Stars, levels, badges and certificates, but sessions are short
  and the rewards are earned by learning.
- **Kind to mistakes.** Unclear answers are retried, not punished; real mistakes cost a little
  and teach something (the bird says the sound; the lesson explains the surprise).
- **Its own look.** Every game and lesson has a design of its own: the Flying Paper Lab is a
  paper lab notebook, the Sound Lab is a recording studio at night, How Long Is a Year? is an
  observatory: parchment pages under a night sky.
- **Private by default.** No logins, no ads, no analytics. Progress is saved only in the
  player's browser. Speech is recognised on the device (Whisper in the browser); Chrome's
  built-in speech service also runs in the game, and that one sends audio to Google.
- **Tagged by age**, so the catalogue can filter by it.

## Repository layout

```
site/                                   published as-is to Cloudflare Pages (no build step)
  index.html                            the catalogue page (Hebrew, right to left)
  catalog.json                          the list of games and lessons, machine-readable
  games/rotem-sky/index.html            Rotem's Sky Letters (one self-contained file)
  lessons/flying-paper-lab/index.html   The Flying Paper Lab
  lessons/sound-lab/index.html          The Sound Lab
  lessons/calendars/index.html          How Long Is a Year?
  favicon.svg, favicon.ico, …           the Brain Snacks icon
  _redirects                            keeps old addresses working
docs/
  games/   lessons/                     how each game or lesson works, and why
tools/
  play-local.command                    double-click to run the site locally in Chrome
  deploy-local.sh                       publish by hand (personal account only)
  testclips/                            recorded syllables and words for testing speech recognition
.github/workflows/deploy.yml            publishes site/ on every push to main
wrangler.toml                           Cloudflare Pages project settings
```

Each game and lesson is a single static page in its own folder: plain HTML, CSS and
JavaScript, no framework and no build. They never share state, so one can't break another.
Shared code (fonts, sounds, a speech helper) can move into `site/shared/` once two items
need it.

## Adding a game or lesson

1. Create `site/games/<id>/index.html` or `site/lessons/<id>/index.html`.
2. Give it the link back to the catalogue, worded and placed the same everywhere: `→ כל המשחקים והשיעורים`,
   linking to `../../`, at the top right. Add the icon links (`../../favicon.svg`).
3. Add a card on the right shelf of `site/index.html` (copy an existing card), with
   `data-age-min` / `data-age-max` and a matching `גילאי X–Y` tag.
4. Add an entry to `site/catalog.json`, and a short doc in `docs/games/` or `docs/lessons/`.
5. Push to `main`. It's live about a minute later.

## Running locally

Double-click `tools/play-local.command`. It serves the repo on http://localhost:8799 and opens
Rotem's game in Chrome (the catalogue is at http://localhost:8799/site/). Chrome remembers the
microphone permission for localhost.

While it runs, whatever the game hears is written to `heard.log` at the repo root. That log is
how the speech recognition was tuned to a real child's voice; it is git-ignored, because it
holds a child's speech.

## Deploying

Every push to `main` publishes `site/` to the **personal** Cloudflare account
(`c3a723351b598ee5ab014b6f5514b8aa`, Pages project `brainsnacks`) through
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). It needs one repository secret,
`CLOUDFLARE_API_TOKEN`: a token from that account with *Account → Cloudflare Pages → Edit*.

Don't use `wrangler login` for this project: wrangler keeps one login for the whole computer,
and this computer is also used with a work Cloudflare account. To publish by hand, put the
personal token in a git-ignored `.env.local` (`CLOUDFLARE_API_TOKEN=...`) and run
`tools/deploy-local.sh`, which pins the personal account ID.
