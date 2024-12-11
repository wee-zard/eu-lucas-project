---
id: 27
type:
  - 🟦Todo
priority:
  - High
related:
  - "[[023 - Sidebar-on lévő menüpontok véglegesítése]]"
platform:
  - backend
  - frontend
  - database
creation-time: 2024-12-07T09:16:00
---
Elvárt működés: 
- Legyen egy olyan olda, ahol az egyes felhasználókat felvehetjük az alkalmazásban.
- Csak ezen az oldalon keresztül lehessen a felhasználókat felvenni.
- Lehessen megadni a felhasználó email címét és a szerepkörüket. Ezek tudatában kerüljenek a felhasználó felvételre az adatbázisban.
- Lehessen egyszerre több felhasználót is létrehozni (jelenleg a backend oldalán csak 1 felhasználót várunk, akit felveszünk, de ez legyen kiterjesztve több felhasználóra is).
- Ezen oldal, a képen látható módon nézhetne ki:
	- ![[Pasted image 20241207090805.png]]
- Amennyiben *Admin* felhasználó vagy, akkor képes legyél felhasználókat törölni, avagy tiltólistára tenni (törlés legyen inkább)
	- Ilyenkor a felhasználóhoz tartozó adatok ne kerüljenek törlésre. A felhasználó *SoftDeletable*-legyen.
	- Egy ilyen felhasználó, bejelentkezéskor NE legyen képes belépni az alkalmazásba. (UserEntity osztályába egy *@SqlRestriction* vagy *@Where* annotációt kell használni azzért, hogy azon felhasználók NE legyenek kilistázva, akiknek a *deletedAt* értéke NEM null).