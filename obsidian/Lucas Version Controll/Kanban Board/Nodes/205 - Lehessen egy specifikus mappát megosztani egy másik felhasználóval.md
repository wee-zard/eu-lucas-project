---
id: 205
type:
  - 🟦Todo
priority:
  - Medium
related: 
platform:
  - frontend
  - backend
sprint: 
creation-time:
---
Elvárt működés: 
- Amennyiben a felhasználók létrehoznak mappákat, és feltöltik azokat képekkel, akkor lehessen ezen mappákat megosztani a felhasználók között.
- A megosztás mellett azt is lehessen beállítani, hogy az adott mappához, az adott felhasználó milyen jogosultságokkal rendelkezik
	- Írási jogosultság: Írhatja a mappa tartalmát
	- Olvasási: Csak olvashatja a mappa tartalmát
- Ezek mellett legyen lehetőség törölni egy felhasználó hozzáférését a megosztott mappához (tehát, ha egy felhasználót már hozzáadtunk, akkor törölni is tudjuk onnan)
- Lehessen megváltoztatni egy felhasználó jogosultságát egy mappánál (ezt csak a mappa tulajdonosa legyen képes megcsinálni)
- Egyértelműen, de csak a felhasználó által "Tulajdonban" lévő mappák oszthatóak meg más felhasználókkal. Amennyiben egy mappához írási jogai is van a felhasználónak, attól még NEM oszthatja meg egy harmadik felhasználóval. (mivel ezen esetben lehetséges lenne az, hogy:)
	- Tulajdonos -> Olvasási jog -> Írási jog adása (ezt pedig el akarjuk kerülni)