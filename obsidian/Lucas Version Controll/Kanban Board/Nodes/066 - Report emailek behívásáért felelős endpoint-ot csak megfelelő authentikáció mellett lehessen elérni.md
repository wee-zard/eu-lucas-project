---
id: 66
type:
  - 🟥Bug
priority:
  - Low
related:
  - "[[026 - Report oldal implementálása]]"
platform:
  - backend
sprint: 1
creation-time: 2024-12-11T23:47:00
---
Aktuális működés:
- Tesztelés céljából, az *api/email/report-log* endpointra teljesen tetszőlegesen el lehet érni, mindenféle authentikáció nélkül. Ez nem elfogadott.

Elvárt működés: 
- Ezen endpoint kerüljön levédésre, és csak megfelelő jogoslutság mellett lehessen elérni (pl. csak bejelentkezett felhasználók legyenek képesek használni).