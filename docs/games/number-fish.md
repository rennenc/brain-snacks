# דגי המספרים · Number Fish

A fishing game for ages 4–7, in Hebrew. A voice reads the question (so the child doesn't need to
read yet), a shell card shows it, and the child taps the fish that carries the answer. The boat's
line drops, the fish is reeled up with a splash, and a star flies to the counter.

Play: https://brainsnacks.pages.dev/games/number-fish/ · Code: [`site/games/number-fish/index.html`](../../site/games/number-fish/index.html)

## Levels (8 catches each)

| Level | Question | Help on the card |
|---|---|---|
| 1 | Catch the number (1–5) | dots for the number |
| 2 | How many starfish? (1–5) | the starfish themselves |
| 3 | Catch the number (1–10) | dots |
| 4 | How many starfish? (1–10) | |
| 5 | Addition, sums to 5 | two coloured groups of dots |
| 6 | Addition, sums to 10 | dots |
| 7 | Subtraction within 10 | dots, the taken-away ones crossed out |
| 8 | Mixed addition and subtraction | none |
| 9 | Mixed, numbers to 20 | none (the last level; it can be played forever) |

Fish swim a little faster as levels go up, and there are more of them on screen (4 → 6).

## Custom practice (for older kids)

In grown-up settings, "תרגול מותאם אישית" replaces the levels with your own drill:
a minimum and maximum number, any of + − × ÷, how many fish (4–6), and optional dots.
Division always comes out whole (the answer is in your range). The other fish get numbers close
to the answer, so a child can't guess by size. Example: 2–12 with × and ÷ for times tables.

## Voice

Every spoken line is a **pre-recorded clip**, not the browser's voice: the lines are in
[`tools/voice-lines.json`](../../tools/voice-lines.json) and
[`tools/generate-voice.mjs`](../../tools/generate-voice.mjs) turns them into mp3 files in
`site/games/number-fish/voice/` once. The current clips are Cartesia's Hebrew voice Ayala
(model sonic-3). Sums are never read out (just
"כמה זה?"), and single numbers are read only up to 20, which keeps it to 33 clips. If a clip is
missing the game stays quiet.

## Kind to mistakes

- A wrong fish wriggles off the hook, says its own number ("אני 4!") and swims away.
  No star is lost.
- After two misses on the same question, the right fish starts to glow and the voice says so.
- Stars: one per catch; at the end of a level, 3 bonus stars for no mistakes, 2 for up to three,
  otherwise 1.
- Every finished level adds a new species to the aquarium on the start screen (10 in all: a
  clownfish, a goldfish, a rainbow fish…), and the sea fills with the species she has found.

## UX details

- Tap targets are generous (the whole fish and some water around it), and fish are never smaller
  than a fingertip, even on a phone; they swim slower on narrow screens.
- The question card never covers the boat: the sea surface moves down below the card.
- The question is always answerable: exactly one fish carries the answer, and the numbers on
  screen never repeat.
- 🔊 on the card (or the space bar) repeats the question; the number keys catch a fish too.
- Grown-up settings (press and hold ⚙): choose the level, voice on or off, sounds on or off,
  reset the aquarium.
- Respects "reduce motion". Progress is saved in the browser.
