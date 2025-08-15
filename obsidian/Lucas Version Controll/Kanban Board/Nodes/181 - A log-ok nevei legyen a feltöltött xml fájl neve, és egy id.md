---
id: 181
type:
  - 🟥Bug
  - 🟨Client
priority:
  - Low
related: 
platform:
  - frontend
sprint: 
creation-time: 2025-06-20T20:51:00
---
Aktuális működés:
- Amennyiben a felhasználó a *Bounding Box* oldalon van, akkor az adott kép melett, jobb oldalt kerülnek megjelenítésre a log-ok.
- Megjelenítendő elemek:
	- Log neve
	- Log adatai:
		- Eljárás neve
		- Eljárás paraméterei
- A logok nevei a következő formában kerülnek kiíratásra:
	- **LOG #<LOG_ID>**
- Ezen konvenció NEM elfogadott, mivel nem fogunk tudni megfelelően szűrni a log-ok között, illetve lényegesebb különbséget sem fogunk tudni tenni a lok-ok között.

Elvárt működés: 
- A log-ok nevei a következő legyen:
	- **<UPLOADED_XML_FILE_NAME> <LOG_ID>**
- Ezen konvenciót követve, minden egyes log-nak egyedi neve van, illetve még egy id értéket is hozzájuk fűzünk.