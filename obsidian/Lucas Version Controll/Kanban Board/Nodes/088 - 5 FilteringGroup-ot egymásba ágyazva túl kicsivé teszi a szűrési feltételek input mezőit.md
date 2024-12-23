---
id: 88
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - frontend
sprint: 
creation-time: 2024-12-22T23:02:00
---
Aktuális működés:
- Amennyiben megpróbálok 5 *Filtering Group*-ot egymásba ágyazni, és így megtekinteni, hogy a fehérben szereplő, szűrési opciókat megadó űrlap mező mező túl kicsira zsugorodik össze.
- Az alkalmazás csak nagyon későn teszi lehetővé, hogy az ablak horizontálisan is görgethető legyen. Ezen görgethetőség esetén egy sokkal vastagabb *Scrollbar* jelenik meg, ami nagyon elüt a vertikális *Scrollbar*-tól.
- ![[Pasted image 20241222230213.png]]

Elvárt működés: 
- Legyen egy minimális szélessége a fehérben megjelenő *QueryComponen*-eknek. Amennyiben túl kicsire nyomnánk össze ezen komponenseket, akkor vertikálisan görgethető legyen az ablak.
- Amennyiben görgethetővé tesszük az ablakot, akkor a *Scrollbar* pontosan olyan vastagsággal jelenjen meg, mint a vertikális.