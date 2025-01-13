---
id: 13
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - backend
sprint: 
creation-time: 2025-01-13T14:52:00
---
Aktuális működés:
- Amennyiben futtatom a backend-et, akkor a következő hibák kerülnek kiíratásra consolra:
	- Typo
		- [ ] *EmbeddablePlanetCommonName* instead of *EmbeddablePlantCommonName*? **Itt egy elírás található az osztály nevében**
	- Class does not overried method:
		- [ ] Composite-id of *EmbeddablePlanetCommonName* class does not override *equals()*:
		- [ ] Composite-id of *EmbeddablePlanetCommonName* class does not override *hashCode()*:
		- [ ] Composite-id of *EmbeddedProcedureLogParam* class does not override *equals()*:
		- [ ] Composite-id of *EmbeddedProcedureLogParam* class does not override *hashCode()*:
	- No default constructor for class
		- [ ] ProcedureLogentity
		- [ ] PlantCommonNameEntity
		- [ ] ExifDataEntity
		- [ ] ExifKeyEntitty
		- [ ] EmbeddablePlanetCommonName

Elvárt működés: 
- Minden hiba javításra kerüljön.