---
id: 42
type:
  - 🟨Client
  - 🟥Bug
priority:
  - High
related:
  - "[[042 - Google OAuth oldal befejezése]]"
platform:
  - frontend
sprint: 
creation-time: 2024-12-07T20:39:00
---
Aktuális működés:
- Jelenleg van egy működő bejelentkezési oldal, de ott nem minden működik kellően.

Elvárt működés: 
- Valamilyen szöveg kerüljön megjelenítésre az oldalhoz, jelezve a felhasználónak, hogy jelentkezzen be a gomb segítségével.
- Teendő:
	- [x] Access Token és Refresh Token lekérése a Google szerveréről.
	- [ ] Access Token és Refresh Token eltárolása az adatbázisban.
	- [ ] Access Token és Refresh Token lekérése az adatbázisból azon esetben, ha ezen a frontend oldalán üresek lennének.
	- [ ] Minden *axios* http üzenetküldést a frontend oldaláról a *commands* mappába legyen kiszervezve.
	- [ ] Amennyiben *Unauthorized Statud 401* errort kapunk vissza a backend-től:
		- [ ] A *Refresh Token* segítségével, kérjünk le egy új *Access Token*-t.
		- [ ] Ezen *Access Token* kerüljön eltárolásra a szükséges helyeken (frontend, database).
		- [ ] Az új *Access Token*-el, indítsuk újra a http request-et a backend felé.