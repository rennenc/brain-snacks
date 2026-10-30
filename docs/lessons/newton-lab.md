# מעבדת ניוטון · The Newton Lab

Part 3, after [The Flying Paper Lab](flying-paper-lab.md) and [The Thin Air Lab](thin-air-lab.md).
How does a rocket move when there is nothing to push against? A Hebrew lesson for ages 12–15, about
two hours, best split into two or three sittings. It needs paper, a coin, a book, a straw and tape.

Play: https://brainsnacks.pages.dev/lessons/newton-lab/ · Code: [`site/lessons/newton-lab/index.html`](../../site/lessons/newton-lab/index.html)

**Design:** the same graph-paper lab notebook as parts 1 and 2, with one new ink: deep-space violet.

## Missions

1. **Things want to keep going** (first law): pull a sheet from under a coin, then flick a puck on
   carpet, ice and in space.
2. **Docking with no brakes**: every push stays until you push back.
3. **How hard is it to move?** (second law): four F = ma race puzzles, a paper dropped on a book,
   and the hammer and feather on Earth, in a vacuum and on the Moon.
4. **Every push pushes back** (third law): two skaters and equal momentum, then a straw-launched
   paper rocket with a flight log.
5. **Save the astronaut**: throw equipment to move, and throw something the other way to brake.
6. **Build a rocket**: a single stage can't reach orbit, so the child discovers staging.
7. **Newton's cannon**: fall to the ground, orbit, or escape, with real inverse-square gravity.
8. **Hit Mars**: pick the moment and the speed; the launch window sits near 44°.

It ends with a 5-question quiz and a space navigator certificate.

## Notes

- Formulas are never handed over cold. Each one has a step-by-step walkthrough first: what the
  words mean, a solved example, then small exercises with hints, and only then the puzzles.

- All the physics lives in one DOM-free block at the top of the script, so it can be run in Node.
- The rocket uses the rocket equation with a fixed exhaust speed of 3.4 km/s; goals include rough
  gravity and drag losses.
- The Mars trip uses circular, coplanar orbits, and the hit zone is generous. There is no atmospheric
  entry. Orbital speeds are real, so a transfer takes 6 to 8 months and needs about 3 km/s.
- Progress, the flight log and the quiz are saved in the browser.
