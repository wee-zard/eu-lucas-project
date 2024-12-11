---
id: 34
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - backend
sprint: 
creation-time: 2024-12-07T10:24:00
---
Aktuális működés:
- Amennyiben egy egyedi hibaüzenet kerül dobásra, akkor az internal-server-error üzenetet dob vissza
- Amennyiben hiba dobása történik, akkor a backend oldalán egy 50 sornyi hibaüzenet kerül kiíratásra a console-ra.

Elvárt működés: 
- A console-ra kiíratásra kerülő hibaüzenet kerüljön megszűntetésre
- A megfelelő státusz kóddal ellátott hibaüzenetek kerüljenek visszadásra a frontend-nek
	- Státusz kód
	- Hiba dobásának ideje
	- Hiba címe
	- Hiba esetleges paramétere