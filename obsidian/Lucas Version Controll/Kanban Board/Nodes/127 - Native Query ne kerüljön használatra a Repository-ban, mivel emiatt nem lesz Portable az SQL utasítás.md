---
id: 127
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - backend
sprint: 
creation-time: 2025-01-04T21:28:00
---
Aktuális működés:
- A *Repository*-ban két féle lekérdezés típust tudok külön definiálni a *@Query* annotációval.
	- Native
		- Native SQL lekérdezéseket lehet írni, ami 100%-ban futtatható az adatbázis oldalán is.
	- Non-Native
		- A Spring Boot-ban definiált *Entity* osztályokat használja fel ahhoz, hogy véghez vigye a lekérdezéseket. Ezen SQL utasítások NEM futtathatóak az adatbázis oldalán, amiért objektumokat használunk.

Elvárt működés: 
- Non-Native *@Query* lekérdezések kerüljenek írásra minden esetben, mivel így lesznek a lekérdezések *Portable* azon esetben, ha az adatbázist le kéne cserélni a háttérben.