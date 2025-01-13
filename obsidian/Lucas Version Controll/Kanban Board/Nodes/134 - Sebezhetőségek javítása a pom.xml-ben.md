---
id: 134
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - backend
sprint: 
creation-time: 2025-01-12T12:15:00
---
Aktuális működés:
- Amennyiben a backend oldalán megnyitom a *pom.xml* fájlt, akkor a függőségek megkeresése során a következő error üzenetet lehet észre venni: *vulnerabilities found in dependency*

Elvárt működés: 
- Amennyiben tényleg vannak sebezhetőségek a *pom.xml* fájlban, akkor ezek kerüljenek fixálásra.