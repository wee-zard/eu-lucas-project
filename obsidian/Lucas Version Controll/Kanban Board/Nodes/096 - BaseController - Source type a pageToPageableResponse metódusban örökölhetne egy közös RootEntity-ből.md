---
id: 96
type:
  - 🟦Todo
priority:
  - Low
related: 
platform:
  - backend
sprint: 
creation-time: 2024-12-24T10:35:00
---
Aktuális működés:
- Van a *pageToPageableResponse* metódus a *BaseController* osztályban, ami megvalósítja az objektumok átalakítását *Page*-ről *PageableResponse*-ra. Ezen metódusnak van két generikus típusa, amik közül a *TargerType* az CSAK a *RootDto* osztályból származó típus lehet.

Elvárt működés: 
- A *SourceType* az CSAK a *RootEntity* osztályból származónak kellene lennie.