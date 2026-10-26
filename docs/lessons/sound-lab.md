# מעבדת הצליל · The Sound Lab

What is sound, and why is music maths? A Hebrew lesson for ages 9–13 (made for a curious
10-year-old), about an hour and a half. Needs a microphone, a few straws, rubber bands, a box,
six glasses and water.

Play: https://brainsnacks.pages.dev/lessons/sound-lab/ · Code: [`site/lessons/sound-lab/index.html`](../../site/lessons/sound-lab/index.html)

**Design:** a recording studio at night. Each mission is a module in a rack, with screws, an
amber LED number and a black phosphor screen for its instrument; waves glow neon lime, pink and
cyan. Text in IBM Plex Sans Hebrew, readouts in IBM Plex Mono.

## Missions

Almost every mission has something to touch, play, sing into or measure.

1. **See your voice**: a live oscilloscope from the microphone, with freeze and time zoom.
   Loud vs. soft, "oo" vs. "ee", noise vs. a whistle.
2. **How many times a second?** A live pitch meter (Hz and note name) and a game: hold your
   hum inside a target band for a second to score.
3. **The straw flute**: cut a straw shorter and shorter; the log measures each length's
   frequency from the microphone, plots it, and shows that length × frequency stays constant.
4. **Rubber-band guitar**: a string simulator to pluck (length, tension, thickness), with an
   octave challenge and the "magic points" at ½, ⅔ and ¾.
5. **The glass xylophone**: drag the water in six virtual glasses to tune them to do-re-mi; when
   all six are in tune, they play "Twinkle Twinkle". Includes the bottle-blowing twist (more
   water → higher when blowing, lower when tapping).
6. **The secret maths of music**: a two-tone mixer with Pythagorean ratios (2:1, 3:2, 4:3,
   5:4, 45:32) and beats from a slight detune.
7. **Light vs. sound**: lightning and thunder at a chosen distance, then a game: hear the
   thunder after a hidden distance and guess how far it was (seconds ÷ 3 = km).

A 5-question quiz and a "sound engineer" certificate close the lesson.

## How it works

- **One microphone stream** feeds every instrument: `getUserMedia` with echo cancellation,
  noise suppression and auto gain turned off, so the waveform is the real one.
- **Pitch** by autocorrelation (accurate to ~0.1 Hz on test tones; best for humming,
  whistling and the straw).
- **Sounds** are synthesised with Web Audio: plucked strings from decaying harmonics, glasses
  as long-ringing sine partials, thunder from low-pass filtered noise.
- Nothing from the microphone is recorded or sent anywhere. Progress, the straw log, game
  scores and glass tuning are saved in the browser.
