---
id: 76
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - frontend
sprint: 1
creation-time: 2024-12-21T23:30:00
---
Aktuális működés:
- Amennyiben megnyitjuk a szűrési ablakot, akkor valamilyen formában, renderelésre kerülnek az ablakban lévő szűrési opciók. Amennyiben ezt követően én megváltoztatom a zoom-ot, pl. nagyítok vagy kicsinyítek, akkor a szűrési ablak magassága (height értéke) nem tölti ki az egész böngészői képernyő magasságának pl. 70%-át, hanem egy fix px értékű magasságot tölt ki.

Elvárt működés: 
- Amennyiben én változtatom a zoom-ot, akkor a szűrési oldal magassága dinamikusan maradjon meg 70% azért, hogy több szűrési feltételt és csoportot lehessen egyszerre megjeleníteni az ablakban.