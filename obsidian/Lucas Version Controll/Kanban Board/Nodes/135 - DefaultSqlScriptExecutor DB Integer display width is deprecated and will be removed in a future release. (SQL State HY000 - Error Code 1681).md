---
id: 135
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - database
  - backend
sprint: 
creation-time: 2025-01-13T09:36:00
---
Aktuális működés:
- Ezen error üzenet kerül kiíratásra, amikor docker composert elindítom. Úgy tűnik, hogy ezt a backend dobja, amikor a *flyway* megpróbálja betölteni a *.sql* fájlokat, hogy azokat létrehozza az adatbázis oldalán.

Elvárt működés: 
- Ezen error üzenet ne kerüljön megjelenítésre, és a hiba kerüljön fixálásra.