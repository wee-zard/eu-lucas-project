---
id: 111
type:
  - 🟦Todo
priority:
  - Low
related: 
platform:
  - frontend
sprint: 
creation-time: 2024-12-28T20:52:00
---
Aktuális működés:
- Amennyiben felveszünk egy új Query Group-ot, vagy Query Component-et, akkor azok nagyon statikusan jelennek meg a weboldalon. Nincs animáció, amivel megjelenítenénk az újabb komponeseket.

Elvárt működés: 
- Kerüljön implementálásra a következő azon esetben, amennyiben hozzáadnánk, vagy elvennénk komponenseket a *Query Builder* létrehozása során.
- [React Transition component - Material UI](https://mui.com/material-ui/transitions/#transitiongroup)