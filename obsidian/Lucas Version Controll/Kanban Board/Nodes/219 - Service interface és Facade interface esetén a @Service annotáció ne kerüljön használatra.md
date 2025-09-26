---
id: 219
type:
  - 🟦Todo
priority:
  - Medium
related:
platform:
  - backend
sprint:
creation-time: 2025-09-25T11:40:00
---
Aktuális működés:
- Úgy tűnik, hogy a *Service interface* és *Facade interface* osztályokban is felváltva kerül használatra a *@Service* annotáció, ami akár szükségtelen zavart kellthet a kódbázis karbantartásában, mivel megkérdőjelezhetővé tehetjük később, hogy szükséges-e a *@Service* annotáció vagy sem bizonyos esetekben.

Elvárt működés: 
- A *Service interface* és *Facade interface* osztályokban NE kerüljön használatra a *@Service* annotáció.