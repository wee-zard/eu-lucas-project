---
id: 21
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - image-server
creation-time: 2024-12-07T09:25:00
---
Aktuális működés:
- Nem tudni, hogy minden axios request egy try-catch blockban van-e vagy sem. Amennyiben nem, akkor előfordulhat azon eset, hogy a program elszáll, avagy túl sok hibaüzenet kerül kiíratásra a consol log-ra.

Elvárt működés: 
- Minden axios üzenet kerüljön bele egy try-catch blokkba.