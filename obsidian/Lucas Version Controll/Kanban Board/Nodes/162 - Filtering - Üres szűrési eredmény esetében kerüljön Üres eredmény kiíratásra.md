---
id: 162
type:
  - 🟥Bug
priority:
  - High
related: 
platform:
  - frontend
sprint: 
creation-time:
---
Aktuális működés:
- Tegyük fel, hogy egymásnak ellentmondó szűrési feltételeket adunk meg, aminek köszönhetően egy üres tömböt kapunk vissza a backend-től (miszerint nincs rekord, ami megfelelne a szűrés eredményének)

Elvárt működés: 
- A küldés gomb megnyomását követően NEM lehet látni egy olyan szöveget, ami a felhasználót jelzi, hogy "A szűrési feltétel(ek) üres eredményt adtak vissza". Ezzel jelezzük a felhasználó felé, hogy adjon meg egy jobb szűrést.