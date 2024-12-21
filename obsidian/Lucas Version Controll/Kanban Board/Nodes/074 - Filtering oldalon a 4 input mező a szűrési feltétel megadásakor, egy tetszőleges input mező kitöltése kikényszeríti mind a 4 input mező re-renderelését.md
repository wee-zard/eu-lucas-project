---
id: 74
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - frontend
sprint: 
creation-time: 2024-12-21T10:28:00
---
Aktuális működés:
- Amennyiben a felhasználó kiválasztotta, hogy mi alapján akar szűrni a Filtering oldalon, akkor 3 vagy 4 input mező kerül megjelenítésre egy sorban. Amennyiben a felhasználó kiválasztja bármelyik input mezőt és ott megad egy értéket, akkor ez kikényszeríti a React-ot, hogy mind a 4 input mezőt újratöltse.

Elvárt működés: 
- Amennyiben beírok tetszőleges input mezőbe, akkor csak azon input mező kerüljön re-renderelésre, amelyiket a felhasználó módosította. Amelyiket nem módosítottuk, akkor az ne kerüljön módosításra.
- Pl. amennyiben az *Operator* input mező értékét módosítom, akkor csak ezen input mező kerüljön re-renderelésre, miközben a *Query By*, *Year by*, input mezők ne kerüljenek re-renderelésre.