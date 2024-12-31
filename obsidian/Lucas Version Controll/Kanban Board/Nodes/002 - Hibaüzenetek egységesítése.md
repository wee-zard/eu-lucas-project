---
id: 2
type:
  - 🟦Todo
priority:
  - Medium
platform:
  - frontend
sprint: 1
---
Aktuális működés:
- Amennyiben hibaüzenet kerül dobásra a frontend-ről, vagy a backendről, akkor azok mindegyike a toast metódussal kerüljenek eldobásra. Ennek segítségével a felhasználók tudomásul vehetik, hogy milyen hiba történt a háttérben. Vannak helyek, ahol hibaüzenet nem kerül dobásra, vagy csak console.error-al kerül eldobásra a hiba.

Elvárt működés: 
- Szeretném, hogy minden hibaüzenet, toast üzenet formájában kerülne eldobásra, aminek köszönhetően a felhasználó tudomást kaphasson a hiba okáról. Mindenről is kérek hibaüzenetet, és a hibaüzeneteknek egységesnek és egyértelműnek kell lennie.