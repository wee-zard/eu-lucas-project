---
id: 1
type:
  - 🟥Bug
priority:
  - Medium
creation-time: 2024-12-07T09:54:00
platform:
  - frontend
related:
  - "[[042 - Google OAuth oldal befejezése]]"
---
- Aktuális működés:
	- A google bejelentkezés nem működik teljesen. Amennyiben már be voltunk jelentkezve az alkalmazásba, de kilépünk, és egy óra múlva újra megtekintjük az alkalmazást, akkor a bejelentkezési oldalon 3 hibaüzenet fog fogadni minket az invalid authentikációval kapcsolatban.
- Elvárt működés:
	- Amennyiben hiba kerül dobásra a google bejelentkezéssel kapcsolatba, akkor csak 1 popup üzenet kerüljön megjelenítésre. (ez mind azért történhet, mivel localStorage-ben el van tárolva a token, és ezen token ellenőrzése történik?)