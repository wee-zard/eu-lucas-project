---
id: 221
type:
  - 🟥Bug
priority:
  - High
related:
platform:
  - backend
sprint:
creation-time: 2025-11-22T16:06:00
---
Aktuális működés:
- Amennyiben rányomok a Rendszerbeállítások oldalon található "Lokálisan tárolt képek haszálata" checkbox-ra, akkor megjelenítésre kerül egy popup, hogy letöltsem a kép szervert (hogy lokálisan kerüljenek beolvasásra a képek, mintsem a távoli gisco kép szerverről), de egy "internal server error" kerül dobásra az alkalmazástól, és a loading indikátor nem szűnik meg a hibaüzenet megjelenítése után.

Elvárt működés: 
- Ne kerüljön hiba dobásra
- A fájlok kerüljenek letöltésre a szerverről
- A szerver oldalán a hibát kapjuk el, és a tényleges hiba kerüljön logolásra, hogy a hiba oka visszakereshető legyen.