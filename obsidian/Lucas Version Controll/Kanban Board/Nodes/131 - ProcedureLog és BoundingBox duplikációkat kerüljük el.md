---
id: 131
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - backend
sprint: 
creation-time: 2025-01-05T09:39:00
---
Aktuális működés:
- Amennyiben feltöltünk egy *Log*-ot, akkor ezen log hozzáadásra kerül az adatbázisba, ami azt eredményezteti, hogy ugyan azon értékekkel ellátott rekordok legyen eltárolva az adatbázisban (pl. ugyan azon névvel, kép referenciával, talált növénnyel).

Elvárt működés: 
- Megkérdezni a témavezetőmet, hogy ilyen duplikációk legyenek-e. Tehát, amennyiben feltöltesz egy XML fájlt, ami tartalmilag pontosan ugyan azon értékeket tartalmazza, mint ami az adatbázisban van, akkor kerüljön-e újból eltárolásra az adatbázisban (vagy legyen egy visszajelzés a felhasználónak, hogy "Hello, ezt már feltöltötted, az XML fájlt emiatt nem töltheted fel").