# מעבדת האוויר הדק · The Thin Air Lab

Part 2 of aerodynamics, after [The Flying Paper Lab](flying-paper-lab.md). What happens to a wing
when the air itself changes? A Hebrew lesson for ages 12–15, about 90 minutes, that puts numbers on
Bernoulli and lift and tests them in the thinnest air anyone has flown in: the air of Mars. It is
about flying inside an atmosphere, not about travelling to Mars, so there are no rockets.

Play: https://brainsnacks.pages.dev/lessons/thin-air-lab/ · Code: [`site/lessons/thin-air-lab/index.html`](../../site/lessons/thin-air-lab/index.html)

**Design:** the same graph-paper lab notebook as part 1, on purpose, with one new ink: Mars rust.

## Missions

Every mission that has an experiment starts with a **prediction**.

1. **Bernoulli with numbers**: P + ½ρv² stays constant. A pipe with an energy budget, and a
   pitot-tube puzzle where the child works out speed from a pressure reading.
2. **The four knobs of lift**: six locks on L = ½ρv²SC<sub>L</sub>, with ×2 buttons that show speed
   counts twice. Everest, Titan, Mars (speed alone isn't enough, so: a huge wing), and the Moon.
3. **A real wind tunnel**: a live fluid simulation. Pick a shape or draw one with a finger, view
   speed, pressure or vortices, and fill a table of measured drag.
4. **The tumbling wing**: a paper strip that glides because it spins (the Magnus effect).
5. **Testing the formula**: time a paper helicopter with the built-in stopwatch as its blades get
   shorter, and compare with what the lift equation predicts.
6. **Fly Ingenuity**: find the rotor speed that hovers on each world, and fill in the table.
7. **Design it, then fly it**: set wing area and engine, take off and fly through three rings. A
   plane that works at home can't leave the runway on Mars, and a bigger engine alone won't fix it.

It ends with a 5-question quiz and a certificate with the child's name.

## Notes

- The wind tunnel really computes the flow (lattice Boltzmann, D2Q9, about 20,000 cells, 2D). It
  shows comparisons between shapes, at a far lower Reynolds number than a real plane, so a wing
  stalls more gently than in real life.
- All the physics lives in one DOM-free block at the top of the script, so it can be run in Node.
- The games use the real lift equation with simple models: rotor thrust is kρΩ², calibrated to
  2,400 rpm on Mars; propeller thrust falls gently with density.
- Air and gravity values are rounded: Earth 1.225 kg/m³, Everest 0.47, Titan 5.4, Mars 0.020.
- Newton is left out on purpose; he gets a lesson of his own.
- Progress, the flight log and the quiz are saved in the browser.
