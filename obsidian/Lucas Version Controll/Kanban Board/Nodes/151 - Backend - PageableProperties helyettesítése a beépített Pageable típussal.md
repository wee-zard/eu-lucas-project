---
id: 151
type:
  - 🟦Todo
priority:
  - Medium
related: 
platform:
  - backend
sprint: 
creation-time: 2025-02-08T17:57:00
---
Aktuális működés:
- Jelenleg egy egyedileg írt *PageableProperties* típust használunk ahhoz, hogy meghatározzuk az aktuális lapot, és a lapon található komponensek számát.

Elvárt működés: 
- Felfigyeltem arra, hogy van egy beépített *Pageable* típus, amit tudunk használni a *JpaRepository* oldalán, és akkor már használhatnánk minden egyes oldalon.
- *org.springframework.data.domain.Pageable*