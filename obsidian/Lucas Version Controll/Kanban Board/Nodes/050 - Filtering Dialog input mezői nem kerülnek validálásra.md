---
id: 50
type:
  - 🟥Bug
priority:
  - High
related:
platform:
  - frontend
  - backend
sprint:
creation-time: 2024-12-07T21:13:00
---
Aktuális működés:
- Nem mindegyikhez, vagy egyik input mezőhöz sem tartozik validálás. Validálásra szükségünk van azért, hogy csak valid aktív szűrési feltételeket vehessünk fel a Filtering Dialog oldalon.

Elvárt működés: 
- Minden input mező kerüljön validálásra. Milyen validálások lehetnek:
	- Minden *required* input mező kitöltésre/kiválasztásra került?
	- Validálni az input mező hosszát 
		- Szöveg esetén 100, vagy 200 karakteren belül van az input?
		- Szám esetén UINT32_MAX-nál kisebb értéket adunk meg az inputban?
		- Valid karaktereket adunk meg az input mezőkbe? Lehet, hogy számok megadása helyett szöveget adunk meg. Lehet, hogy olyan speciális karaktereket adunk meg, amit a backend nem tudna feldolgozni.
- Validálás történjen meg a backend oldalán is, amikor meghívásra kerülnek a szűréssel kapcsolatos metódusok.