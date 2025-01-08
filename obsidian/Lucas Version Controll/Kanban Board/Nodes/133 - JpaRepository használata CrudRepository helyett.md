---
id: 133
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - backend
sprint: 
creation-time: 2025-01-07T10:16:00
---
Aktuális működés:
- Jelenleg *CrudRepository*-t használok a backend oldalán ahhoz, hogy az egyes adatbázis műveleteket elvégezhessem. Szembejött velem a *JpaRepository* használata, ahol képes vagyok már a repository abstract metódus nevében megadni a kívánt lekérdezést, mint pl. (findbyPlantScientificNameByPlantScientificName(String name)).
- Ennek segítségével, el tudnám azt nagyban kerülni, hogy a *@Query* annotációval ellátott lekérdezéseket használjam, nem is beszélve azok írásáról. Nagyon nehéz és időigényes ezen *@Query* lekérdezéseket írni, mivel objektum központű, és többször el szoktam rontani.

Elvárt működés: 
- *JpaRepository* használata *CrudRepository* helyett.
- Minden metódus, ami *@Query* annotációval van ellátva, azok átírása.