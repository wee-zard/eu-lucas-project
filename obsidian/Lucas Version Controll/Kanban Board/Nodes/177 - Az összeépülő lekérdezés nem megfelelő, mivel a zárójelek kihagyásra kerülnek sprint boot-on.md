---
id: 177
type: 
priority:
  - High
related: 
platform:
  - backend
sprint: 
creation-time: 2025-06-20T17:47:00
---
Elvárt működés: 
- A query összerakása a spring boot oldalán talán nem működik, mivel a zárójeleket nem rakja bele az api a lekérdezésbe, ami potenciálisan hátráltatja a képek lekérdezését.
- Mi van akkor, ha van a következő lekérdezés?
- Tervezett lekérdezés:
	- YEAR = 2018 AND (COUNTRY = 'HU' OR PLANT = 'XYZ')
- A Sprint boot ezt köpheti ki:
	- YEAR = 2018 AND COUNTRY = 'HU' OR PLANT = 'XYZ'