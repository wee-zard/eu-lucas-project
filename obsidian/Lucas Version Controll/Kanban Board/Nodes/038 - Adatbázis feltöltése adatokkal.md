---
id: 38
type:
  - 🟦Todo
priority:
  - Medium
related: 
platform:
  - database
sprint: 
creation-time: 2024-12-07T20:16:00
---
Elvárt működés: 
- Az adatbázis NE üresen kerüljön átadásra a kliensnek. A *docker*-ben lehetőség van arra, hogy létrehozzunk egy új mysql docker container-t, amiben létrehozhatjuk a saját adatbázisunkat, amibe feltölthetjük az adatbázist létrehozó sql szkriptet, és feltölthetjük az adatbázis rekordjait egyben.
- Kerüljön minden kép adata feltöltésre az adatbázisba. A tényleges képeket NE töltsük le, de azok adatait pedig igen. Az alkalmazás oldalán, csak a képekre mutassunk egy link segítségével.
- Ezen megvalósítás megvalósíthatónak tűnik, és nem kell hozzá letölteni a képeket.