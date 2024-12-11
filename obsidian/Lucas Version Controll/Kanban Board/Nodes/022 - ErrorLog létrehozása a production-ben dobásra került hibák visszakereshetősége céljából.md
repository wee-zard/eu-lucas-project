---
id: 22
type:
  - 🟦Todo
priority:
  - Medium
related: 
platform:
  - image-server
  - backend
  - frontend
creation-time: 2024-12-07T09:25:00
---
Aktuális működés:
- Amennyiben hiba kerül dobásra az alkalmazás bármelyik oldalán production környezetben, azokról nem fogunk tudni, mivel nincs olyan felület, ahol a hibaüzenetek kiíratásra kerülnek.

Elvárt működés: 
- Kerüljön létrehozásra egy ErrorLog file, amibe beleírhatnánk a következőket:
	- Hibaüzenet kódja
	- Hibaüzenet neve
	- Az error üzenet maga
- Ezek mind lekérdezhetőek legyenek (tehát, amennyiben akarom, azokat ki tudjam nyerni az alkalmazásból)