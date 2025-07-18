---
id: 171
type:
  - 🟦Todo
priority:
  - High
related: 
platform:
  - frontend
sprint: 
creation-time: 2025-06-20T17:14:00
---
Reprodukálás lépései:
1. Menjünk a Filtering oldalra
2. Adjunk meg egy tetszőleges szűrési feltételt
3. Amennyiben a képek megjenítésre kerültek a szűrési oldalon (arra várva, hogy a felhasználó rájuk nyomjon), válasszuk ki az összes képet
4. Legyen egy olyan szűrési feltétel, ami 10000+ eredményt ad vissza
5. Válasszuk ki az összes képet

Aktuális működés:
- Amennyiben az összes képet ki akarjuk választani, akkor 10000 kattintás után tudnánk kiválasztani a képeket, ami nem előnyös.

Elvárt működés: 
- Legyen két gomb
	- Az egyik gomb segítségével az adott oldalon megjelenítésre kerülő 9 képet kiválasztja.
	- A másik gomb kiválasztja a szűrés összes eredményét (akár mind a 10K képet).