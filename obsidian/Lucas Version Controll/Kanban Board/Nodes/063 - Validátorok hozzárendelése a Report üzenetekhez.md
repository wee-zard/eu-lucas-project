---
id: 63
type:
  - 🟥Bug
priority:
  - Low
related:
  - "[[026 - Report oldal implementálása]]"
platform:
  - backend
  - frontend
sprint: 
creation-time: 2024-12-11T23:20:00
---
Aktuális működés:
- Jelenleg nincsenek validátorok hozzárendelve a report üzenetekből jövő objektumokhoz a backend oldalán. Ezeket validálni kell azon célból, hogy a backend ne szálljon el egy hibakóddal.
- Milyen validálások lehetnek?
	- *Title*
		- Hossza legfeljebb 100 karakter hosszú lehet
		- Karakterei csak egy véges karakterkészletből kerülhet ki (pl. 0-9, a-z, a-Z, és egy kevés szimbólum)
		- NEM lehet üres
	- *Message*
		- Hossza legfeljebb 2000 karakter hosszú lehet.
		- Karakterei csak egy véges karakterkészletből kerülhet ki (pl. 0-9, a-z, a-Z, és egy kevés szimbólum)
		- NEM lehet üres
-  Validálni a Query Build Model egyes elemeit, és amennyiben azok nem mennek át a validáláson (pl. túl hosszú szöveg megadása input mezőben, nem engedélyezett karakterek kerülnek használara text input mezőben) → 
	- [ ] Hibaüzenet megjelenítése a komponensek alatt egy piros üzenetben
	- [ ] Maga az input mező is piros legyen.
	- [ ] Amennyiben a felhasználó módosítja az adott input mező értékét, akkor a hibaüzenet kerüljön eltűntetésre azonnal.

Elvárt működés: 
- Validálásért felelős annotációk hozzárendelése a Request objektumhoz.