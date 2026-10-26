# כמה ארוכה שנה? · How Long Is a Year?

How long does the Earth really take to go around the Sun, and how do the Gregorian, Hebrew and
Islamic calendars cope with the fact that neither the year nor the month is a whole number of
days? A Hebrew lesson for ages 10–14, about an hour and a half. A calculator is allowed.

Play: https://brainsnacks.pages.dev/lessons/calendars/ · Code: [`site/lessons/calendars/index.html`](../../site/lessons/calendars/index.html)

**Design:** an observatory at night. The page is a starry sky; each mission is a parchment page
pinned under it, with brass instruments (orbits, wheels, charts) set into dark sky windows.
Frank Ruhl Libre for titles and numbers, Heebo for text. Missions are numbered with Hebrew
letters, א to ח.

## The child has to calculate

Every mission has "✍ חשבו" boxes. A wrong answer gets a nudge ("a little less", "the decimal
point moved") and the next hint; the last hint shows the full working. **A mission can only be
marked done once all its calculations are solved** (and, for missions ו and ז, the game in it).

## Missions

| | Mission | What they calculate |
|---|---|---|
| א | What is a year? Orbit simulator: jump 365 days and see the Earth fall short | 0.2422 × 24 = 5.81 hours; 24 ÷ 6 = 4 years |
| ב | A month is the Moon: a phase simulator, new moon to new moon | 12 × 29.53 = 354.36; 365.24 − 354.36 ≈ 11 days |
| ג | Julius Caesar's calendar: spring-date drift chart (no fix / Julian / Gregorian) | 11.2 minutes a year; 128 years per day; ~10 days by 1582 |
| ד | The day 10 days vanished (October 1582): a leap-year sorting game | 97 leap years per 400; 365.2425; ~3,226 years per day |
| ה | The Islamic calendar: Ramadan moving through the seasons on a year wheel | ~33 years round the seasons; 354 + 11/30 = 354.367 |
| ו | The Hebrew calendar: "save Passover", a 19-year game choosing which years get Adar I | 235 months; 235 × 29.5306 ≈ 19 × 365.2422 ≈ 6,939.6; 5787 mod 19 = 11 |
| ז | The observatory calculator: decide leap or not in each calendar, then check; a real date converter (any date in all three calendars, with that year's length) | the three rules, applied |
| ח | The accuracy race: drift of the Julian, Hebrew and Gregorian calendars over 10,000 years | 365.2468 − 365.2422 = 0.0046; ~217 years per day |

It ends with a 5-question quiz and a "keeper of time" certificate.

## The rules, as implemented

- **Gregorian:** divisible by 4, except century years, unless divisible by 400.
- **Hebrew:** year mod 19 is 0, 3, 6, 8, 11, 14 or 17 (years 3, 6, 8, 11, 14, 17, 19 of the
  cycle, "גו״ח אדז״ט"). Checked against the real calendar: 5782, 5784, 5787, 5790… are leap.
- **Islamic (tabular):** (14 + 11 × year) mod 30 < 11, giving years 2, 5, 7, 10, 13, 16, 18, 21,
  24, 26, 29 of each 30. Real dates (the converter, "today") use the browser's Umm al-Qura
  calendar, so they can differ from the tabular one by a day.
- Today's date and the converter use the browser's own Hebrew and Islamic calendars (`Intl`),
  and find each year's length by looking for the day the year number changes.

## Numbers used

Tropical year 365.24219 days · synodic month 29.530589 days (the Hebrew molad: 29 days,
12 hours, 793 parts) · Hebrew mean year 365.2468 · Gregorian 365.2425 · Julian 365.25 ·
tabular Islamic 354.367.
