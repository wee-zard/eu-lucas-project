---
id: 104
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - frontend
sprint: 1
creation-time: 2024-12-26T11:44:00
---
Aktuális működés:
- Amikor indítunk egy szűrést, akkor lekérdezésre kerül legfeljebb 10 kép a szerverről. Ezen képek megjelenítésre kerülnek a frontend oldalán.
- Amennyiben a felhasználó újratölti az oldalt, a szűrési feltételek megmaradnak, de a képek NEM kerülnek megjelenítésre az ablak újbóli megnyitása során (avagy akkor, amikor rányomunk a kiválaszott képre, mivel ezen esetben betöltésre kerülne az adott képhez tartozó szűrési feltételek, de a képek nem)

Elvárt működés: 
- Amennyiben van egy kiválasztott képem, és rákattintok, akkor az adott szűrési feltételhez tartozó képek kerüljenek lekérdezésre automatikusan a szerverről, hogy azok láthatóak legyenek a felhasználó számára.