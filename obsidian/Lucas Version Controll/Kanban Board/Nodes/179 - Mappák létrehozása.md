---
id: 179
type:
  - 🟦Todo
  - 🟨Client
priority:
  - High
related: 
platform:
  - frontend
  - backend
  - database
sprint: 
creation-time: 2025-06-20T19:56:00
---
Elvárt működés: 
- Lehessen mappákat létrehozni
- A mappáknak legyen:
	- Neve
	- Leírása
- Képeket lehessen hozzáadni ezen mappákhoz
- Amennyiben van már egy létező mappa, akkor ennek tartalmához lehessen hozzáadni további képeket.
- A mappákban lévő képeket lehessen törölni
	- Lehessen egyesével törölni
	- Legyen Bulk Delete is (egyszerre több kép kiválasztása, és utána a törlés gombra rányomva, a kiválasztott elemek törlésre kerülnek). Ezen esetben, a sorok bal oldalán lehetne egy checkbox. A törlés gomb lehetne egy column header cellájában.
---
- Képek szűrése
- Legyen lehetőség arra, hogy a felhasználó által már kiválasztott képeket elmentsük az adatbázisban "Mappákban", és ezen "Mappák" a bal oldalt megjelenő navbar-on megjelenítésre kerülnének? Amennyiben a felhasználó el akarja menteni az általa kiválasztott képeket, és magukat a szűrési feltételeket, akkor legyen rá lehetősége.
- Ehhez fel kell venni több táblát, hogy mindez megvalósítható legyen.
	- Album
		- album_id
		- album_neve
		- album_leirasa
		- Felhasználó.tulajdonos_id
		- album_létrehozás_ideje
	- Album_Megosztása_Másokkal
		- album_id: *Az album, amit meg akarunk osztani mással*
		- Felhasználó.id: *A felhasználó, akinek megosztotta az album tulajdonosa az albumot*
	- Képek_Linkelése_Albumhoz
		- Album.album_id
		- Kép.kép_id
		- Szűrési_feltételek_JSON: *megmondja, hogy milyen szűrési feltételek segítségével lett kiválasztva az adott kép*
		)
	- Képekhez tartozó befoglaló téglalapok letárolása!!!