---
id: 215
type:
  - 🟥Bug
priority:
  - High
related:
platform:
  - backend
sprint:
creation-time: 2025-08-31T08:57:00
---
Aktuális működés:
- Simán lehetséges, hogy az *application.properties* fájl publikusan elérhető a backend futtatása során, ami nem lenne megfelelő, mivel mások hozzáférhetnének a jelszavak titkosításának kulcsához.

Elvárt működés: 
- Valamilyen módon le lehessen tiltani, hogy kívülről NE lehessen hozzáférni a resource mappa tartalmához. Csak a VM-en belül lehessen lekérni ezen mappában lévő fájlok tartalmait.