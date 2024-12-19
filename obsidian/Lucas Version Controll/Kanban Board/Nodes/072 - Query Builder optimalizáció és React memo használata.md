---
id: 72
type:
  - 🟥Bug
priority:
  - High
related: 
platform:
  - frontend
sprint: 1
creation-time: 2024-12-18T23:59:00
---
Aktuális működés:
- Amennyiben megnyomom az "Add condition", vagy "Add group" gombokat, akkor az egész *Filtering Menu* renderelésre kerül. Azon elemek is, amiket nem módosítottunk.
- Amennyiben kiválasztok egy tetszőleges *Filter* értéket, és azoknak értéket adok (tehát, kiválasztom, hogy Year, Country, vagy Direction alapján történjen meg a szűrés), akkor az egész *Filtering Menu* renderelésre kerül. Ez ott lehet problémás, amennyiben egy *Text Field* input mező van, mivel minden egyes karakter leütésekor a *Filtering Menu* renderelésre kerül.
- Csupán 10 input mező esetén, egy *Text Field*-be nehezen lehetett értéket megadni (nagyon lassú volt a react redux state frissítése).

Elvárt működés: 
- Csak azon komponensek kerüljenek renderelésre, amelyeket ténylegesen módosítunk. Amelyeket nem módosítunk, azok NE kerüljenek renderelésre. Ez felgyorsítja az alakalmazás sebességét, és lehetővé teszi, hogy a *Filtering Menu* nagyon gyorsan renderelje az egyes komponenseket (hiszen csak azt kell renderelni, amit ténylegesen módosítottunk, és nem az egész oldalt).