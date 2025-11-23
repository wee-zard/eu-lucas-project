---
id: 222
type:
  - 🟥Bug
priority:
  - Low
related:
platform:
  - backend
sprint:
creation-time: 2025-11-22T16:08:00
---
Aktuális működés:
- Minden egyes alkalommal, amennyiben egy új felhasználó létrehozásra kerül a "Felhasználók kezelése" oldalon, egy email kerül kiküldésre a kérdéses felhasználó email címére, amivel "meghívásra" kerül az adott személy az alkalmazásba. A probléma ott van, hogy az email törzsében nem kerül expliciten taglalva, hogy milyen felhasználónév segítségével jelentkezhet be a felhasználó az alkalmazásba, ami nagyban hátráltathatja a felhasználót abban, hogy hatékonyan használja az alkalmazást (nem is beszélve arról, hogy nem fog tudni belépni oda).

Elvárt működés: 
- Egy lehetséges megoldás: A felhasználó email címe kerüljön megadásra az email törzsében, hogy "Hello, ezen email címmel fogsz tudni bejelentkezni az alkalmazásba".