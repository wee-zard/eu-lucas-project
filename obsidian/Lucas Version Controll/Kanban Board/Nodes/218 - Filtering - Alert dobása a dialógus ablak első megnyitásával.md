---
id: 218
type:
  - 🟦Todo
priority:
related:
platform:
  - frontend
sprint:
creation-time:
---
Aktuális működés:
- A *Szűrési* és a *Mappák* oldalon kerülnek a képek többsége letöltése, és éppen emiatt nem kerülnek a felhasználók kellően tájékoztatásra, hogy a képek egy távoli szerverről kerülnek lekérésre, ami miatt a képek lekérése sokáig tarthat (akár 10 másodpercig is, míg minden kép betölt).

Elvárt működés: 
- Kerüljön egy *Alert* megjelenítésre a felhasználó számára, hogy tudassuk vele, hogy a *Rendszerbeállítások* oldalon lehetősége van beállítani, hogy a lokális gépén lévő képek kerüljenek beolvasásra a távoli szerver helyett.
- A felhasználónak legyen lehetősége egy "X" gombra rányomni az *Alert*-ra.
	- Amennyiben az X gombra rányom a felhasználó, utána ezen üzenet NE kerüljön megjelenítésre mégegyszer.
	- Ezen *emlékezést* mentsük el a *localStorage*-ban egy objektumban, vagy tömbben (úgy csináljuk, hogy több hasonló *Alert* idekerülhessen, amennyiben szükséges)
	- Mi lenne, hogyha az adatbázis oldalán mentenénk el ezeket?