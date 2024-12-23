---
id: 68
type:
  - 🟦Todo
priority:
  - Low
related: 
platform:
  - frontend
sprint: 
creation-time: 2024-12-13T22:27:00
---
Elvárt működés:
- Szeretnék egy új Query buildert definiálni, ami sokkal átláthatóbban definiálja az egyes komponensek és csoportok közötti relációkat, és amit sokkal könnyebben lehetne validálni, hogy tényleg jól lett-e összerakva vagy sem egy parser segítségével.
---
Query Builder TODO:
- [x] Lehessen component-et törölni
- [x] Lehessen group-ot törölni
- [x] Lehessen mindent is törölni
- [x] Kerüljön megjelenítésre a WHERE, és az AND/OR kulcsszavak
- [x] Lehessen változtatni az AND/OR kapcsolatokat → a szükséges helyen kerüljön frissítésre.
	- [x] Minden QueryGroup-hoz kerüljön megjelenítésre, és szükségszerűen módosíthatóak legyenek.
	- [x] Minden QueryBuilderModel-hez kerüljön megjelenítésre, és szükség esetén lehessen módosítani azokat.
- [x] Legyen egy gomb, amivel alkalmazni lehet a felhasználó által összerakott Query Buildert. Itt egy olyan sor kerüljön felvételre, ahol az ADD CONDITION, ADD GROUP és a SAVE gombok fixen maradnak a pozíciójukon (sticky).
- [x] Stílus alkalmazása az egyes react elemeken.
- [x] UseMemo használata (azért, hogy azon React Component-ek, amiknek a props-ja nem változott meg, ne kerüljenek re-renderelésre. Itt fontos, hogy meg kell változtatni a következőket)
	- [x] Csak azon *Sub-Branch* kerüljön módosításra, amit ténylegesen módosítottunk, a *Branch*-en feljebb lévő ágakat NE kelljen újra renderelni.
	- [x] Érdemes lenne a *QueryBuildModel* objektumot eltárolni a *Redux Storage*-ben, és onnan lekérni mindig az értékét.
---
Desing ötlet:
- ![[Pasted image 20241215185036.png]]
- ![[original-ec8989fb0d57510c0a457662028ebd46.png]]
- ![[original-ec8989fb0d57510c0a457662028ebd46 1.png]]