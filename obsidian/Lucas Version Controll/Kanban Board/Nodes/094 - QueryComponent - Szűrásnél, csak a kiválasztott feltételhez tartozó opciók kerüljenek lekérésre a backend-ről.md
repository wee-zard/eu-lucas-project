---
id: 94
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - frontend
sprint: 
creation-time: 2024-12-23T23:17:00
---
Aktuális működés:
- Amennyiben rányomok arra, hogy az *Évek* mentén szeretnék szűrni, akkor http utasítások sokasága kerül elindításra a backend felé, amelyben lekérjük a következőket:
	- Years
	- Countries
	- Directions
	- CoordinateXs
	- CoordinateYs
	- ...
- Ez nem opcionális, mivel egyszerre több üzenetet küldünk a szerver felé, mint amennyi szükséges lenne.

Elvárt működés: 
- Amennyiben csak az évek mentén szűrünk, akkor csak az éveket kérjük le az szerverről, míg a többi szűrési feltételhet tartozó opciókat ne.