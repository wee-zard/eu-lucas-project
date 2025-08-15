---
id: 211
type:
  - 🟥Bug
priority:
  - High
related: 
platform:
  - backend
sprint: 
creation-time: 2025-08-15T13:05:00
---
Aktuális működés:
- Előfordult olyan eset, hogy amennyiben egy LONG_VALUE.equals(LONG_VALUE)-t próbáltam meg meghívni, és a bal oldalon lévő érték az null, akkor *NullPointerException* miatt *InternalServerError* kerül dobásra a backend oldalán.

Elvárt működés: 
- *Objects.equals(A, B)* kerüljön használatra, mivel ez biztonságosabb.