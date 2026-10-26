# Rotem's Sky Letters

A Flappy-Bird-style reading game, made for Rotem. The bird flies to a gate and waits; the gate
opens only when the child reads what's on it **out loud**. Ages 4–7.

Play: https://brainsnacks.pages.dev/games/rotem-sky/ · Code: [`site/games/rotem-sky/index.html`](../../site/games/rotem-sky/index.html)

## Two modes

- **English sounds**: a consonant plus a vowel (BA, de, Fe…), in mixed upper and lower case.
  Each vowel always has its own colour. The letters she knows are ticked in grown-up
  settings, and every ticked consonant × ticked vowel becomes a gate (CE is off by default).
- **Hebrew words** with nikud, from an editable word list (אַבָּא, רוֹתֶם, כֶּלֶב, נָבַח…).

## Getting harder over time

| Level | What's new |
|---|---|
| every level | the bird flies ~9% faster, one more gate (7 → 14), less time for the ⚡ quick bonus (6 s → 2.5 s) |
| 2 | ✨ golden gates: double stars |
| 3 | double gates: two things to read in a row |
| 4 | moving gates that bob up and down |
| 6 | triple gates |

Waiting at a gate never gets stricter: only flying, bonuses and gate types change.

## Rewards

- Stars: 3 for a first try, 2 for a second, then 1. +1 for a quick read, ×2 on golden gates,
  ×2 from 5 in a row (with a sparkle trail from 3).
- 17 birds to unlock, each with its own **power** (Bubble forgives the first mistake of a level,
  Pirate finds more golden gates, King counts every star 1½ times, Dragon pays extra on double
  gates…). The power is shown on the start screen and pops up whenever it helps.
- 12 badges (5 in a row, 10 quick reads, golden gate, triple gate, 10 Hebrew words, 500 stars…).
- Six worlds that change with the level: meadow, beach, candy clouds, night, snow, space.

## How it listens

The hard part is that speech recognisers are built for words, not for a child saying "ba".

1. **The game records each utterance itself.** A level meter on the microphone finds where
   speech starts and stops, and cuts that clip out.
2. **Whisper runs in the browser** ([transformers.js](https://github.com/huggingface/transformers.js),
   loaded from jsDelivr; models cached after the first load). Instead of free transcription it
   runs the encoder once and **scores how likely each answer on the list is** for the clip, so it
   can only ever pick something the child is practising. English uses `whisper-tiny.en`; Hebrew
   uses multilingual `whisper-tiny` with the `<|he|>` prefix. About 0.5 s per answer.
3. **Chrome's built-in recogniser** runs alongside (English or Hebrew) and can open a gate first.
   It's good at real Hebrew words; it sends audio to Google.

Judging, tuned on real play sessions (`heard.log`):

- Nothing scores above −14 → it wasn't speech: "say it again", never a mistake.
- English, relaxed mode: the right **consonant** opens the gate (Whisper often hears her "eh"
  as "ah"). A different consonant must win clearly to count as a mistake.
- Hebrew: Whisper only calls a mistake when it's very sure (wins by 5+, scores above −9).
- After 3 tries it can't make out, the child gets through with 1 star and hears the answer.
- "הב הב" was removed: in her voice Whisper heard it as "אבא" 19 times out of 19.

## Grown-up settings

Press and hold ⚙ on the start screen: letters and syllables, the Hebrew word list, letter case,
listening strictness, the listener (quick or careful Whisper), sound effects, per-sound stats,
and the last 25 things the game heard.
