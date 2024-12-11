---
id: 37
type:
  - 🟦Todo
priority:
  - Medium
related:
  - "[[039 - Procedures oldal létrehozása]]"
platform:
  - frontend
  - backend
sprint: 
creation-time: 2024-12-07T19:49:00
---
Elvárt működés: 
- Legyen egy felület, amin keresztül fel lehet tölteni az egyes eljárások eredményeit. Az fix infó, hogy mindegyik eljárás eredményként egy XML fájlt eredményez. Nekem ezen fájlt kell tovább küldenem a backend-nek.
- Az XML fájlt parsolni kell JSON objektummá, majd ezen objektumból Java objektumokat kell létrehozni. Az így létrehozott objektumokat kell feltölteni az adatbázisba.
- Ezen XML fájlban van eltárolva, hogy:
	- Ki által lett létrehozva
	- Mikor
	- Milyen paraméterek mellett
	- Melyik képen lett végrehajtva
	- Milyen növények lettek detektálva
	- Illetve listázásra kerültek a befoglaló téglalapok is