---
id: 196
type:
  - 🟥Bug
priority:
  - Medium
related: 
platform:
  - backend
sprint: 
creation-time: 2025-07-13T17:53:00
---
Aktuális működés:
- Amennyiben van egy *@Cachable* metódusom, ami már eltárolt bizonyos *Entity* értékeket, akkor azt szeretném, hogy ugyan azon az osztályon belül meghívhassam azon metódust, ami letárolta a Cache-be az entityk listáját.
- *SonarCube* a címben látható hibát dobja. Ez úgy nyílvánul meg, hogy annak ellenére, hogy a rekordok letárolásra kerülnek a *Cache*-be, attól függetlenül azon metódus ismét meghívásra kerül, ami az adatbázisból lekéri az entity listát.

Elvárt működés: 
- Kerüljön itt valami megoldásra olyan szinten, hogy amennyiben a *Cache*-ben már el vannak tárolva az adatok, akor azon adatokat olvassuk be, és NE kérjük le mégegyszer az adatokat az adatbázisból. Ezzel csökkenthetjük az alkalmazásunk válaszidejét a kliens és a szerver között.