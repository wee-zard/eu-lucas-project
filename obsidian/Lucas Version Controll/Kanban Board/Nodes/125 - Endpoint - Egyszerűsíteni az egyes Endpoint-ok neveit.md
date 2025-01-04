---
id: 125
type:
  - 🟥Bug
priority: 
related: 
platform:
  - backend
  - frontend
sprint: 1
creation-time: 2025-01-03T21:39:00
---
Aktuális működés:
- Látom, hogy a *CoordinateXController*-ben csak 1 endpoint van definiálva, de azt a következő url-en keresztül lehet csak elérni: `api/coordinate-x/get-coordinate-x`, ami egyszerűsítésre kerülhetne

Elvárt működés: 
- Adott a következő endpoint: `api/coordinate-x/get-coordinate-x`
- Inkább a következő formátumot használjuk: `api/coordinate-x/`,
- Ezen egyszerűsítés kerüljön javításra mindegyik *Coordinate* komponensben.