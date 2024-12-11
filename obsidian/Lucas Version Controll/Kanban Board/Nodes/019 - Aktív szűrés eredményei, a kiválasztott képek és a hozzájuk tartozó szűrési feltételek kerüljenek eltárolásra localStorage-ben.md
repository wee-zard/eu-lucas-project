---
id: 19
type:
  - 🟦Todo
priority:
  - High
related: 
platform:
  - frontend
creation-time: 2024-12-07T09:25:00
---
Aktuális működés:
- Jelenleg, amennyiben a felhasználó megpróbál megadni egy szűrési feltételt, akkor az eltárolásra kerül az aktív szűrési táblázatban.
- Minden adat a React Redux Storage-ben van eltárolva, így amennyiben a felhasználó újratölti az oldalt (mondjuk véletlenül, vagy azért, mert lejárt a Google token-je), akkor 

Elvárt működés: 
- Minden aktív szűrés eredményét, és a hozzájuk tartozó kilistázott képek, és a kiválasztott képek, és a kijelölt befoglaló téglalapok kerüljenek letárolásra a localStorage-ben. Így, amennyiben a felhasználó újratölteni az oldalt, akkor semmilyen adata ne kerüljön elvesztésre.
	- Szűrési oldal (szűrési feltételek megadása ablak)
		- Aktív szűrés táblában listázott komponensek
		- Aktív szűrési táblában listázott csoportok
		- A komponensek és a csoportok közötti logikai kapcsolatok
		- Az aktív szűrést eredményét (azon 6/9 kép, ami megjelenítésre kerülne a jobb oldali ablakban), ezek adatai és maguk a képek is kerüljenek eltárolásra (a képeket eltárolhatjuk base64string formájában)
	- Szűrési oldal (kiválasztott képek megjelenítése ablak)
		- Minden kiválasztott kép legyen elmentve localStorage-ben
		- Minden képhez tarozó, aktív szűrési feltételek kerüljenek eltárolásra
		- A képeken lehet a befoglaló téglalapokat is megjeleníteni úgy, hogy kiválasztjuk az egyes eljárás logokat a képeken. Ezen kiválasztott eljárás logok is kerüljenek eltárolásra.