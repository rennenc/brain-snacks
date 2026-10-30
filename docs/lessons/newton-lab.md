# Newton's laws: three lessons

Three short Hebrew lessons for ages 12–15, about 40–50 minutes each. They started as one two-hour
Newton Lab and were split so each sitting has one idea. They lead to each other, and `/lessons/newton-lab/`
redirects to the first.

**Design:** the same graph-paper lab notebook as the flight lessons, with deep-space violet.

## 1. Things Keep Going (`lessons/newton-motion/`)

The first two laws: pull a sheet from under a coin, flick a puck on carpet, ice and in space, then
F = ma with a step-by-step walkthrough, four cart races, a paper dropped on a book, and the hammer
and feather.

## 2. Save the Astronaut (`lessons/newton-astronaut/`)

Moving in space: docking with no brakes, the third law and momentum with two skaters, a
straw-launched paper rocket, a drifting astronaut who throws equipment to get home, and Newton's
cannon, which explains why astronauts float.

## 3. Hit Mars (`lessons/newton-mars/`)

Build a staged rocket (one stage can't reach orbit), then hit Mars in a launch window near 44°.

## Notes

- Formulas are never handed over cold: what the words mean, a solved example, small exercises with
  hints, and only then the puzzles.
- All the physics lives in one DOM-free block at the top of each script, so it can be run in Node.
- The rocket uses a fixed exhaust speed of 3.4 km/s; goals include rough gravity and drag losses.
- The Mars trip uses circular, coplanar orbits and a generous hit zone, with no atmospheric entry.
- Progress is saved in the browser, separately for each lesson.
