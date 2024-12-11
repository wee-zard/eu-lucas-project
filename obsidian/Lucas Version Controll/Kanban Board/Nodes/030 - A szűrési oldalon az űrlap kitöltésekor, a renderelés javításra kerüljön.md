---
id: 30
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - frontend
sprint: 
creation-time: 2024-12-07T09:54:00
---
Elvárt működés: 
- Amikor a felhasználó kitölt egy tetszőleges input mezőt a szűrési oldalon az űrlapnál, akkor a mentés gombra kattintva, több komponens kerül újra renderelésre, mint kellene. Ezt lehetne optimalizálni, hogy ne mindenki kerüljön újra renderelésre.
- Esetleg ref megfelelő használata megoldja ezt.