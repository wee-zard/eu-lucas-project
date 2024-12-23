---
id: 91
type:
  - 🟦Todo
priority:
  - Low
related: 
platform:
  - backend
sprint: 1
creation-time: 2024-12-23T23:05:00
---
Aktuális működés:
- A backend oldaláról egyenlőre csak FIX *pageSize* és *pageNo* értékekkel adtuk vissza a képeket. Ezek nem voltak paramérezhetőek.

Elvárt működés: 
- Cél, hogy a frontend oldalról lehessen olyan üzeneteket küldeni a backend felé, amiben ezen értékek paraméterben érkeznek. Jó lenne, hogyha ezek a *HttpRequest* szekcióban lennének.