---
id: 208
type:
  - 🟨Client
priority:
  - High
related:
  - "[[178 - Letöltött mappák neve legyen egyedi, előre specifikált]]"
platform:
  - frontend
  - backend
sprint: 
creation-time: 2025-08-09T22:38:00
---
Elvárt működés: 
- Lehessen letölteni a mappákat.
- A mappákban benne kell szerepelnie a kiválasztott képeknek, és a képekhez tartozó befoglaló téglalapok.
- További teendő:
	- [x] Mappa letöltése (funkcionalitás implementálása tesztelés nélkül)
	- [ ] Mappa letöltésének ellenőrzése, hogy tényleg működik-e
	- [ ] Mappák letöltése esetén, egy olyan progressbar kerüljön megjelenítésre, ami mutatja számszerűen kiírva a zip fájl letöltésének a státuszát (pl. 3/37 kép letöltve, 4/37 kép letöltve)
	- [ ] Mappák letöltése esetén kerüljön egy hibaüzenet dobásra, hogy "*Váratlan hiba történt a mappa letöltése során!*"
	- [ ] Mappák letöltése esetén a mappában lévő képek kerüljenek bele a zip fájlba
	- [ ] Megoldani, hogy mind a kiválasztott képek (amik még nincsenek mappához kötve), és a mappában lévő képek egyaránt letölthetőek legyenek. Ezt esetleg meg lehet valósítani azzal, hogy két publikus metódust adunk meg a *helper*-ben
	- [ ] A mappában lévő befoglaló téglalapok is kerüljenek rá a képekre, és azokkal együtt kerüljenek letöltésre a képek.