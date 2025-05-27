---
id: 169
type:
  - 🟦Todo
priority:
  - Medium
related: 
platform:
  - database
  - backend
sprint: 
creation-time: 2025-05-21T18:49:00
---
Aktuális működés:
- Jelenleg a képekhez nem kerültek az exif adatok lekérésre és elmentésre az adatbázisban. A kliens ezeket használni szeretné a szűrések során.

Elvárt működés: 
- Csináljunk egy programot, ami a backend oldalán a háttérben futna, és percenként lekérné a távoli szerverről a képeket egyesével
- Minden egyes lekért képről lekéri az exif adatokat, és azokat feltölti az adatbázisba.
- Amennyiben valami hiba történik (timeout-ot kapunk), akkor ismételjük meg a kérést, de sokkal később, mint az előzőt.
- Kerüljön logolásra valahol, hogy jelenleg melyik kép kerül feldolgozásra, és mennyi képet dolgoztunk fel eddig.