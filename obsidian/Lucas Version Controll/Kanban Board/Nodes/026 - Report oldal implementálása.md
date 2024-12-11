---
id: 26
type:
  - 🟦Todo
priority:
  - High
related:
  - "[[024 - Manual oldal implementálása]]"
platform:
  - frontend
creation-time: 2024-12-07T09:16:00
---
Elvárt működés: 
- Amennyiben a felhasználó valamilyen hibát talál, vagy hibát tapasztal, avagy nem tetszik neki valami az oldallal kapcsolatban, avagy nehezen tudja értelmezni az oldal és a szűrési felület működését, akkor bejelentéseket tehetnek.
- Lehessen kiválasztani a bejelentés témáját: *Bug*, *UI Bug*, vagy *Others*.
- Amennyiben egy felhasználó elküld egy ilyen bejelentést, akkor az eltárolásra kerülhetne az adatbázisban.
	- Továbbá azt, hogy ki küldte
	- Azt, hogy megvalósításra/fixálásra került-e
	- Azt, hogy mikor küldték be
	- A bejelentés tartalma
- Amennyiben bejelentéseket tesznek a felhasználók, azokról a fejlesztő (azaz én) kapjon azonnali visszajelzést, email formájában.
	- A saját, privát email címemre kerüljön egy üzenet elküldés a bejelentés legfontosabb adataival.
	- Miért jó ez így? Mivel, amennyiben nem dolgozom a projekten aktívan, akkor a bejelentéseket sem fogom aktívan nézni. Amennyiben email-ben kapok üzenetet (amit napi szinten nézek), akkor biztos fogok is arra reagálni valamit.
- Fejlesztőnek:
	- Az email küldést meg lehet valósítani mind a frontend és a backend oldaláról (legyen inkább a backend)
	- Az email címéből lehessen kiolvasni, hogy ki küldte, és mi a problémája az alkalmazással.
	- Minden bejelentett hibát fel kell venni a backlog-ba.