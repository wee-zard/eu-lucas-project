---
id: 73
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - frontend
sprint: 
creation-time: 2024-12-21T10:21:00
---
Aktuális működés:
- Vannak a TextField komponensek, ahol a felhasználók szöveget tudnak megadni. A jelenlegi implementáció mellett, minden egyes leütött karakter után, a TextField-be aktuálisan szereplő szöveget elmentjük, ami potenciálisan kikényszeríti a React-tól, hogy indítson egy re-rendert az ősön.
- Miért problémás a re-render? Mi van, ha a felhasználó 200 karakter hosszú szöveget akar beírni? Ez azt eredményezi a jelenlegi implementáció mellett 200 re-render történik meg.

Elvárt működés: 
- Jó lenne, hogyha nem minden karakter leütése során történne re-render, hanem csak akkor, amennyiben nem érkezik 300ms-en belül karakter leütés a felhasználótól. Ezen idő letelte után kerüljön elmentésre a TextField aktuális értéke.
- Ezzen csökkenteni tudjuk a re-renderek számát.