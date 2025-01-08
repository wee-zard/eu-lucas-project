---
id: 130
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - backend
sprint: 
creation-time: 2025-01-05T09:37:00
---
Aktuális működés:
- Amennyiben egy *ProcedureLog*-ot töltünk fel az alkalmazásba, akkor eltároljuk a *CreationTime*-ot (tehát azon időpontot, amikor létrehozásra került a log), ami az aktuális világóra időpontját tárolja.

Elvárt működés: 
- A *CreationTime* PONTOSAN azon időpontot tárolja el, ami az XML fájlban található *CreationTime*.