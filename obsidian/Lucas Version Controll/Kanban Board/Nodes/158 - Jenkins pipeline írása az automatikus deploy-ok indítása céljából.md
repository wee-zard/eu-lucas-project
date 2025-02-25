---
id: 158
type:
  - 🟦Todo
priority:
  - High
related:
  - "[[156 - Docker és alkalmazás futtatása VM-ben]]"
platform:
  - backend
  - database
  - frontend
sprint: 2
creation-time: 2025-02-21T23:27:00
---
Aktuális működés:
- Mivel bérlésre került egy VM, így az lenne a legjobb, hogyha ezen VM-be a fájlok feltöltése automatikusan történne meg, egy könnyen kezelhető felületen keresztül. Erre kívánjuk használni a Jenkinst.

Elvárt működés:
- [x] SSH privát és publik kulcsok kerüljenek létrehozásra, és azok kerüljenek eltárolásra a megfelelő mappákban mind a hoszt és a szerver oldalán.
- [ ] Jenkins pipeline írása, ami kitelepíti a github-ról letöltött fájlokat a VM-ben futó szerverre
- [ ] Mind a frontend-re és a backend-re külön pipeline kerüljön létrehozásra.
- [ ] A VM-ben kerüljön a frontend és a backend dockerizálásra, és általa betöltésre a docker-be. Ezt követően futtassuk őket docker-compose segítségével.
- [ ] Domain hozzárendelése a VM-hez, hogy el lehessen érni publikusan az alkalmazás grafikai felületét (még akkor is, hogyha le van védbe a bejelentkezési felület).
- [ ] Egy dokumentáció írása mindezen folyamatok lépéseiről azon célból, hogy mind az MSc szakdolgozatomban, illetve mind az önéletrajzomban megemlítésre kerülhessen egy ilyen CI/CD folyamat Jenkins-ben.