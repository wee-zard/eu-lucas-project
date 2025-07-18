---
id: 175
type:
  - 🟦Todo
priority: 
related: 
platform:
  - frontend
sprint: 
creation-time: 2025-06-20T17:36:00
---
Aktuális működés:
- Amennyiben a felhasználó kiválaszt pár képet egy szűrést követően, akkor azok mindegyiket megjelenítésre kerül a *szűrési oldal* főoldalán.
- Mi van akkor, amennyiben több sűrés eredményeit akarjuk megjeleníteni ezen az oldalon? A kiválasztott képek egymás után jelennének meg, és nem lenne közöttük semmi elkülönítés.

Elvárt működés: 
- A kiválasztott képek kerüljenek csoportosításra a szűrési lekérdezés alapján.
- pl. 
	- WHERE YEAR = 2018
		- IMAGE_1
		- IMAGE_2
		- IMAGE_3
		- (CLICK HERE TO SHOW MORE)
	- WHERE COUNTRY = HU
		- IMAGE_A1
		- IMAGE_A2
- Fontos, hogy akár 10K képet is kiválaszthat a felhasználó, így a biztonság kedvéért csak MAXIMUM 9/10 kép kerüljön megjelenítésre a csoportosításokon belül