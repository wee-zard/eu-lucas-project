---
id: 31
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - frontend
  - backend
sprint: 
creation-time: 2024-12-07T09:59:00
---
Aktuális működés:
- Tegyük fel, hogy van két felhasználó, akik be vannak jelentkezve egyenként az alkalmazásba
- Az egyik user törli a másikat.
- A törlésre kerülő user még képes mozogni az alkalmazáson belül addíg, míg nem frissíti újra a böngészői oldalt
- Képes a törlésre kerülő user api hívásokat indítani a backend felé (pl. felhasználókat létrehozni, szűrést végezni, módosítani adatokat, stb.)

Elvárt működés: 
- Amennyiben valaki törlésre került, akkor ő NE tudjon api hívásokat indítani a backend felé, és ne legyen képes adatokat lekérni onnan.
- Amennyiben valaki törlésre került, és a backend ezt detektálta, akkor kerüljön visszaadásra egy ilyen különleges hibaüzenet (pl. *Deleted user has no authority to access to these resources*)
- A törölt felhasználó, kerüljön azonnal kijelentkeztetve az alkalmazásból.