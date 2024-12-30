---
id: 113
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - backend
sprint: 
creation-time: 2024-12-30T22:36:00
---
Aktuális működés:
- Felváltva vannak olyan *Exception* osztályok, amik öröklődnek a *RuntimeException* osztályból, vagy külön implementálnak egy *Exception* osztályt, ami teljesen eltér azon formától, ami használatra került.

Elvárt működés: 
- Az *ExceptionHandler*-ben definiálva van egy metódus, ami egy bizonyos osztályú hibaüzeneteket vár. Amennyiben más érkezik, akkor *InternalServerError* kerül dobásra. Mindegyik hibaüzenet, kerüljön öröklődésre a *BaseException* osztályból.