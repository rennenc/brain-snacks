# ארנבי הכפל · Times Bunnies

The times table as a garden, for ages 7–10. The board is the real 10×10 table, and every square is
a bunny's burrow. Dragging out a garden makes the point on its own: 3 × 4 is a rectangle of 3 rows
and 4 columns, and the answer is its area.

Play: https://brainsnacks.pages.dev/games/times-bunnies/ · Code: [`site/games/times-bunnies/index.html`](../../site/games/times-bunnies/index.html)

**Design:** one sunny garden behind everything. Everything is big, round and tappable. The board
runs right to left, so it starts from the top right corner.

## How it plays

Ten levels: ×2, ×10, ×5, ×3, ×4, ×9, ×6, ×7, ×8 (easiest first), then the whole board. All are open
from the start. Each level has ten rounds, chosen from:

- **Build**: drag out a×b. Bunnies pop out row by row, and a running total appears at the end of each
  row (3, 6, 9, 12). Building b×a is accepted too.
- **Count**: a garden is shown; pick the carrot with the right number.
- **Rotate**: turn the garden and see that a×b = b×a.
- **Find**: build any garden with exactly N bunnies.
- **Split** (×6 and up): a hard fact cut into two easy pieces, 7 × 8 = 5 × 8 + 2 × 8.
- **Race**: three timed rounds at the end of each level.

Wrong answers explain themselves: the game shows what was built, then counts row by row or marks
the target square. A level gives 1–3 stars and adds a new bunny to the family.

**My board** is the full table with numbers. Facts answered first time are coloured in, and
touching any square shows its rectangle.

## Notes

- Game logic is in one DOM-free block at the top of the script, so it can be run in Node.
- No recorded voice yet: it has text and sound effects, and doesn't need the microphone.
- Progress is saved in the browser.
