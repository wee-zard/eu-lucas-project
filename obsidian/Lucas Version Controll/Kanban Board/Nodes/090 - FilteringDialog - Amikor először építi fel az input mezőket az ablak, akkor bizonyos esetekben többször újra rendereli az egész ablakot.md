---
id: 90
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - frontend
sprint: 
creation-time: 2024-12-23T15:49:00
---
Aktuális működés:
- Tegyük fel, hogy van egy előre meghatározott szűrési feltételem, ami mentén szűrni akarok a képekre. Legyen ez kellően komplex. Legyen használva *QueryComponent* és *QueryBuilderModel* is.
- Amennyiben megpróbálom nyitni ezen szűrési ablakot, hogy az egyes input mezők megjelenítésre kerüljenek, akkor azt látom, hogy bizonyos komponens-ek többször kerülnek renderelésre. Olyan eset is előfordult, hogy amennyiben rányomok az egyik Select input mező egyik értékére (hogy pl. *CoordinateY*), akkor ezen értéket többször rendereli a React. Esetleg többször kerül elküldésre a komponenshez, és emiatt történik az a sok render?

Elvárt működés: 
- Minimalizáljuk a render-ek számát, amennyire csak lehet.