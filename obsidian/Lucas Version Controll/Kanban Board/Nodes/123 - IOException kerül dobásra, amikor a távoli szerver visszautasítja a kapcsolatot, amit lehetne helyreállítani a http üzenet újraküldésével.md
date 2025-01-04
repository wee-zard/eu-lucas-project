---
id: 123
type:
  - 🟥Bug
priority: 
related: 
platform:
  - backend
sprint: 
creation-time: 2025-01-02T22:42:00
---
Aktuális működés:
- Amikor egy *IOException* kerül dobásra a backend oldalán, akkor nem küldjük újra a request-et. Célunk az, hogy a képeket lekérjük a távoli szerverről és azokat eltároljuk a saját adatbázisunkban. Ilyen hibaüzenet akkor történhet, amikor a távoli szerver túl van terhelve.

Elvárt működés: 
- Amennyiben egy ilyen hibaüzenet kerül dobásra (pl. a kapcsolat visszautasításra kerül, vagy timed out hibaüzenetet kapunk), akkor legyen egy logika, ami a következő időközönként küldi újra az üzenetet.
	- 30 sec
	- 1 min
	- 2 min
	- 5 min
	- 10 min
	- 20 min
	- 30 min
- Tehát, legyen egy logika, ami automatikusan újraküldi az üznetetet a távoli szerver felé, ami lekéri a képeket a lucas kép adatbázisból.