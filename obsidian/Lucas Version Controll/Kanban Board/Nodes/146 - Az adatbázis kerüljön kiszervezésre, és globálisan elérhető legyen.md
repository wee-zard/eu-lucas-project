---
id: 146
type:
  - 🟦Todo
priority:
  - High
related: 
platform:
  - database
sprint: 
creation-time: 2025-02-02T09:58:00
---
Aktuális működés:
- Jelenleg az adatbázist csak lokálisan érhetjük el, és az egyes módosításokat is lokálban tároljuk. Ez nem előnyös azon esetben, hogyha 10 ember használná az alkalmazás. Az általuk felvitt adatok elveszhetnek, amit pedig nem engedhetünk meg.

Elvárt működés: 
- Az adatbázis kerüljön kiszervezésre egy olyan helyre, ahol a felhasználók globálisan elérhetik azt.
- Állítólag az lenne a legjobb, hogyha az egyetem szolgáltatna egy adatbázist, amit használhatnánk, de végső soron az is játszhat, ha egy VM-en bérlünk, és ott futtatjuk az adatbázist, a többi docker container-el.