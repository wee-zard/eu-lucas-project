---
id: 178
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - frontend
sprint: 
creation-time: 2025-06-20T19:53:00
---
Aktuális működés:
- Jelenleg, amennyiben a felhasználó megpróbálja letölteni a kiválasztott képeit, akkor a mappa neve valami default név, de ezzel nem lehet beazonosítnai azt, hogy mi van az adott mappában.

Elvárt működés: 
- Amennyiben letölti a felhasználó a zip-et, akkor a zip neve a következő legyen:
	- <MAPPA_NEVE>: A mappa neve
	- <OWNER/SHARED>: Megmondja, hogy az adott mappát, az adott felhasználó birtokolja, vagy csak megosztásra kapta
	- <TIMESTAMP>: A letöltés dátuma.