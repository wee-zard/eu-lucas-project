---
id: 160
type:
  - 🟦Todo
  - 🟥Bug
priority:
  - High
related: 
platform:
  - backend
sprint: 
creation-time: 2025-02-23T22:25:00
---
Aktuális működés:
- Amennyiben indítunk egy szűrést, hogy az egyes képeket lekérdezhessük, akkor minden egyes ilyen lekérdezés után KÜLÖN lekérdezésre kerülnek a "Year, Country, Coordinate X, Coordinate Y, and Direction" értékek a képekről.

Elvárt működés: 
- Nekünk csak a képek neve kell. Nincsen szükségünk a képekhez tartozó további adatokról. Csak a kép neve kerüljön lekérdezésre, míg minden más nem.
- Ezzel csökkentsük le a lekérdezések számát 5-el (mivel a képeknél 5 további értéket kérünk le).