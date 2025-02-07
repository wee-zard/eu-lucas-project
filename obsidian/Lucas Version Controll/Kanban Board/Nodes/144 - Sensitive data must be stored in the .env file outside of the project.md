---
id: 144
type:
  - 🟥Bug
priority:
  - High
related: 
platform:
  - frontend
  - backend
sprint: 
creation-time: 2025-02-01T18:47:00
---
Aktuális működés:
- Jelenleg minden szenzitív adat el van mentve a ==.env==, vagy ==.environments== fájlokban, de ezen fájlok adatai fel is vannak töltve github-ra, és azon felül feltöltésre kerültek a docker hub-ra.

Elvárt működés: 
- Mivel nem tudom, hogy lesz-e olyan ember, aki leszedi a projektet, ezen felül még ellopná esetleg az abban szereplő adatokat, így minden szenzitív adatot törölni kell a projektből.
- A ==.env== fájl nem kerülhet feltöltésre semelyik platformra sem!
- Minden szenzitív adat, ami kiszivárgott a publikum számára, azokat meg kell változtatni.
	- pl. AES256 kulcs és só megváltoztatása
	- Google api key megváltoztatása
	- Google email címek és azokhoz tartozó jelszavak NE legyenek a projektben eltárolva.