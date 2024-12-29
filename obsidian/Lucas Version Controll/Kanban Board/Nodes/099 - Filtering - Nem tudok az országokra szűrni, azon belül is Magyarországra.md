---
id: 99
type:
  - 🟥Bug
priority:
  - High
related: 
platform:
  - backend
sprint: 1
creation-time: 2024-12-25T22:48:00
---
Aktuális működés:
- Kiválasztottam, hogy csak azon képek kerüljenek megjelenítésre, amik a következő ország kódhoz tartoznak: *HU*. Ezen lekérdezés eredménye nem más, mint ürestömb.
- *FONTOS!* Az a baj, hogy a *SelectInput* mezőnek a következő formában adjuk át az országok értékeit: *(${country_code}) ${country_name}*. Látszik, hogy az országok értékeit egy különleges formátumban írjuk ki. Emiatt vissza kell őket alakítanunk ahhoz, hogy az adatbázisból lekérdezhessük a rekordokat. Kellenek új metódusok a *ConversionUtils*-ben, ahol átalakítjuk az országok értékeit a fentebb említett *String Format* kiíratásra és vissza.

Elvárt működés: 
- Mivel vannak képek, amik Magyarországon készültek, így kerüljenek azok lekérdezésre.