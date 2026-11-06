# ינשופי השעון · Clock Owls

Reading an analog clock, for ages 6–7. A baby owl lives in a wooden clock tower. On every
o'clock answer it opens its window and hoots once per hour, so 3:00 is three hoots.

Play: https://brainsnacks.pages.dev/games/clock-owls/ · Code: [`site/games/clock-owls/index.html`](../../site/games/clock-owls/index.html)

**Design:** an evening sky with a clock tower. The hour hand is short, thick and blue, and the
minute hand long and orange, everywhere in the game, so children can name them by colour.

## Levels

Each level opens with a short animated explanation, the first time it is played.

1. **O'clock** (read): the short hand shows the hour, the long hand is on 12.
2. **Set the hour**: drag the short hand.
3. **Half past** (read): the long hand on 6, with half the face shaded.
4. **Set half past**: drag the long hand, and the short hand moves with it, like real gears.
5. **Quarter past**: a quarter of the face shaded, like a slice of pizza.
6. **Quarter to**: "רבע ל..." and the next hour.
7. **A day's routine**: set the clock for breakfast, school, the park, bath and bed.
8. **Every 5 minutes**: a ring of minute numbers (5, 10, 15…) around the face.
9. **Clock champions**: everything mixed.

Reading rounds offer three answers: the right one, the next or previous hour (the most common
mistake with half past), and one with the hands read the wrong way round. A hint, or a wrong
answer, explains where each hand should point. A level gives 1–3 stars and a new owl.

**Free clock** lets children drag the hands to any time and see it in words and digits.

## Notes

- Times are written the way Hebrew speakers say them: "שלוש וחצי", "רבע לארבע", "עשרים לשמונה".
- Dragging near the rim moves the long hand, and near the centre the short hand. Crossing 12 with
  the long hand moves the hour on or back.
- No voice: text, big digits and sound effects. The game logic is in one DOM-free block at the
  top of the script, so it can be run in Node.
- Progress is saved in the browser.
