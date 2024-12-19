---
id: 67
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - frontend
sprint: 1
creation-time: 2024-12-13T22:20:00
---
Aktuális működés:
- Jelenleg a különböző fájlokat, az src mappához képes, egy relatív útvonalon töltjük be. Emiatt előfordulnak olyan esetek, amennyiben mappák igen mélyen vannak az app-on belül, hogy az elérési útvonaluk így néz ki: *../../...*.

Elvárt működés: 
- Legyenek *Path alias*-ok használva, ahol *../../...* importok helyett *@app/helper* importokat használunk. Ezek szebbek néznek ki.
- Jelenleg az a probléma, hogy *Path alias*-t meg tudok adni a konfigurációs fájlban, és a typescript compiler szintén megtalálja a *Path alias*-al ellátott modulokat, de amikor futtatjuk az alkalmazást, akkor futtatási időben a typescript nem találja meg a modulokat, ami miatt hibát kapunk.