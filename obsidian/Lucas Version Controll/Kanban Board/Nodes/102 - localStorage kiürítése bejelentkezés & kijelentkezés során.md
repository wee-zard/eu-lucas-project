---
id: 102
type:
  - 🟦Todo
priority:
  - Low
related:
  - "[[101 - Profile - Kijelentkezés implementálása]]"
platform:
  - frontend
sprint: 
creation-time: 2024-12-26T10:11:00
---
Aktuális működés:
- Bizonyos esetekben szükségünk van arra, hogy a *localStorage*-et kiürítsük. Előfordulnak esetek, amikor a fejlesztés során megváltoztatjuk az egyes típusokat, amiket eltárolunk a *localStorage*-bne, és ezen esetben hibára futhatunk, ha megpróbáljuk ezen tárolóból betölteni az adatokat.

Elvárt működés: 
- Bejelentkezés és kijelentkezés során, kerüljön kiürítésre a *localStorage*.
- Ezzel biztosra megyünk, hogy a felhasználók ki tudják üríteni a tárolójukat, mivel előfordulhat olyan eset, hogy folyton hibára futnak a felhasználók a *localStorage*-ből betöltött adatok használatával, MIKÖZBEN nem tudják törölni azon adatokat. Nem kérhetjük (nem várhatjuk el) a felhasználóktól, hogy manuálisan töröljék a *localStorage* tartalmát, mivel lehet:
	- hogy eleve nem tudják, hogy az adatok itt vannak eltárolva
	- hogy nem tudják, hogy a *localStorage* az hol van, és hogyan tudnak hozzáférni
- Mivel ezeket nem várhatjuk el, hogy tudják a felhasználók, így ezt magunknak kell megoldanunk az által, hogy töröljük a tároló tartalmát minden bejelentkezés és kijelentkezés során.