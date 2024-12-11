---
id: 33
type:
  - 🟦Todo
priority:
  - Low
related: 
platform:
  - backend
sprint: 
creation-time: 2024-12-07T10:20:00
---
Aktuális működés:
- Egyenlőre, minden adatot olyan formában adunk vissza, mint ahogyan az adatbázisból kinyerjük azokat. Ez security issue-t vonhat maga után, mivel a felhasználó tudomást szerezhetnek arról, hogy milyen szerkezetű az adatbázisunk, és rálátást kapnának annak belső logikájára.

Elvárt működés: 
- Minden rekordot, amit lekérdeztünk az adatbázisból, azt át kell alakítanunk DTO-vá, és azt adjuk vissza a frontend-nek.
- ConversionService megvalósítása
- BaseController megvalósítása
	- Ami tartalmazza a ConversionService-t
	- Ami átalakítja a bejövő Page<T>-t egy Pageable<T> objektummá.