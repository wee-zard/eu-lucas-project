---
id: 5
type:
  - 🟦Todo
priority:
  - Low
related: 
platform:
  - frontend
creation-time: 2024-12-07T09:23:00
sprint: 1
---
Elvárt működés: 
- Minden error üzenet, amit az axios api hívásokból kapunk a commands mappában, azok legyenek kiszervezve a commons mappában lévő fájlokba. Ezen mappában lévő metódusok kerüljenek meghívásra.
- Miért? Minden hibaüzenet kiíratás így egységes tud lenni, és amennyiben javítani kellene ezeket, akkor csak egy helyen kell ezeket elvégezni, és nem kell több helyen egyszerre is.