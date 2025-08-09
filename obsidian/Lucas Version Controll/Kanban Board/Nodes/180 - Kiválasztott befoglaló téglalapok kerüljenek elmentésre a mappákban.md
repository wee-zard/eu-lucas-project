---
id: 180
type:
  - 🟦Todo
  - 🟪Epic
  - 🟨Client
priority:
  - Medium
related: 
platform:
  - frontend
  - backend
  - database
sprint: 
creation-time: 2025-06-20T20:26:00
---
Aktuális működés:
- Van egy *befoglaló téglalapok* oldal, ahol a képekhez lehet befoglaló téglalapokat kijelölni a log-ok alapján. Amennyiben a felhasználó ellépne ezen oldalról, akkor azzal együtt a befoglaló téglalapok is eltűnnek.

Elvárt működés: 
- A képekhez tartozó kiválasztott befoglaló téglalapokat is lehessen elmenteni a mappákban a képek mellett.
	- Kép1
		- Lekérdezés legyen ott
		- Befoglaló téglalapok: A, B, C
	- Kép2
		- Lekérdezés (WHERE YEAR = 2012)
		- Befoglaló téglalapok: A, B, C
- Fonts, hogy a befoglaló téglalapok mellett lehet módosítani a téglalapok színét, a téglalapokhoz tartozó címkék nevét, betűméretét, illetve a megjelenítendő képnek a nevét egy fekete dobozban fehér betűkkel.
- Ezen adatok mindegyike kerüljön elmentésre, hogy amennyiben a felhasználó letölteni a képet, akkor mindezen módosítások együttesen kerüljenek megjelenítésre a zip fájlban lévő képeken