---
id: 63
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - backend
  - frontend
sprint: 
creation-time: 2024-12-11T23:20:00
---
Aktuális működés:
- Jelenleg nincsenek validátorok hozzárendelve a report üzenetekből jövő objektumokhoz. Ezeket validálni kell azon célból, hogy a backend ne szálljon el egy hibakóddal.

Elvárt működés: 
- Validálásért felelős annotációk hozzárendelése a Request objektumhoz.