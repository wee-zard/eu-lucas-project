---
id: 119
type:
  - 🟪Epic
priority: 
related: 
platform:
  - frontend
  - backend
sprint: 
creation-time: 2025-01-02T19:50:00
---
Elvárt működés: 
- Azt szeretném, hogy a felhasználók maguk legyenek képesek, akár évente egyszer is, de frissíteni a lokálban lévő adatbázisban lévő adatokat. 
- Mit kellene megvalósítani?
	- [ ] Legyen egy felület, ahol kerüljön megjelenítésre az, hogy:
		- [ ] ... egy *Progress Spinner* vagy valamilyen másik grafikus felület segítségével azt, hogy a backend aktívan lekéri-e a képeket a távoli Lucas kép adatbázisból vagy sem.
		- [ ] ... mennyi ideje fut ezen funkcionalitás a backend oldalán.
		- [ ] ... mennyi fájlt dolgozott már fel eddig a backend (leginkább a könyvtárak feldolgozását mutassuk meg, mert az a könnyebb).
	- [ ] Amennyiben elküldünk egy http üzenetet a backend szerver felé, akkor NE várjuk meg, hogy a backend oldalán lévő algoritmus teljesen véget nem ér, mivel ezen algoritmus 4-5 óra alatt fog véget érni, amiből adódóan a *Request* az egy *Request Timed Out*-ot adna vissza.
		- [ ] Amennyiben elküldünk egy üzenetet a backend felé, akkor az állítson be valamit az adatbázisban, hogy "a következő *Sheduler* ciklusban indíts el a képek letöltését".
		- [ ] A backend oldalán kerüljön létrehozásra egy *Scheduler*, ami minden percben CSAK azt ellenőrzi, hogy beállításra került-e az adatbázisban ezen *switch*, aminek jelzésére az algoritmus elindulhatna-e vagy sem. (ez percenként lekérné az adatbázisból ezen rekordot, ami nem optimális)