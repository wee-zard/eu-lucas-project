---
id: 194
type:
  - 🟦Todo
priority:
  - Low
related:
  - "[[017 - i18n hozzáadása az alkalmazáshoz és minden magyar szöveg kiszervezése i18n json fájlba]]"
platform:
  - frontend
sprint: 
creation-time: 2025-07-12T08:46:00
---
Aktuális működés:
- Jelenleg csak a magyar nyelv az, ami közül választani lehet az alkalmazás használatakor, de mi van akkor, amennyiben egy külföldi, angol nyelven tudó személy szeretne hozzáférni ezen alkalmazáshoz és használni azt? Nem lesz rá lehetősége, mivel az alkalmazás csak magyarul van.

Elvárt működés: 
- Legyen egy nyelvválasztási funkció az alkalmazásban, aminek a segítségével a felhasználó ki tudja választani, hogy milyen nyelven szeretné használni az alkalmazást.
- Ha a felhasználó már bejelentkezett, akkor az alkalmazáson belül is legyen lehetőség a nyelvet megváltoztatni a Felhasználó >> Settings oldalon.
- Amennyiben a felhasználó már kiválasztott egy nyelvvet, akkor ezen nyelv kerüljön eltárolásra az adatbázisban is.
- A kiválasztott nyelv kerüljön localStorage-ben is eltárolásra.
- Az alapértelmezett nyelv legyen MAGYAR.
- A nyelvválasztó gomb kinézete lehetne olyan, mint ami a Neptun oldalán van:
	- ![[Pasted image 20250712085053.png]]
	- Fontos, hogy az egyes menüpontok megjelenítése esetén azt is fel kell tűntetni, hogy az egyes nyelv opciónak mi a neve és milyen országra vonatkozik.