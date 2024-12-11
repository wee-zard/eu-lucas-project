---
id: 54
type:
  - 🟥Bug
priority:
  - Low
related:
  - "[[052 - Loading komponens megjelenítése]]"
platform:
  - frontend
sprint: 
creation-time: 2024-12-08T16:57:00
---
Aktuális működés:
- Amennyiben megnyitjuk a FilteringDialog ablakot, akkor automatikusan lekérdezésre kerülnek az egyes filter opciókhoz tartozó lehetséges értékek. Előfordulhat az, hogy amennyiben a felhasználó túl gyorsan nyitja meg a select komponenseket, akkor az opció mezőben nem jelenik meg semmi.

Elvárt működés: 
- Loading ikon jelenjen meg, amíg a backend oldaláról nem kérjük le az egyes szűrési feltételekhez tartozó értékeket.