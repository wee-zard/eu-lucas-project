---
id: 122
type:
  - 🟦Todo
priority:
  - Medium
related: 
platform:
  - backend
sprint: 1
creation-time: 2025-01-02T22:28:00
---
Elvárt működés: 
- Van most a *Docker*, amiben fog futni a teljes alkalmazás. Lesz egy *Container* az adatbázisnak, egy a backend-nek, és egy a frontend-nek. Célom, hogy az adatbázishoz tartozó rekordok betöltésre kerüljenek az adatbázis inicializálását követően.
- Miért van erre szükség? Mivel így a *Docker* container-ek inicializálását követően, az adatbázisban elérhetőek lesznek a felhasználók számára azonnal a rekordok.
Eredmény:
- Felvettem hozzá egy plusz migrációs fájlt, aminek köszönhetően az üres adatbázisba beszúrásra kerülnek a rekordok.