---
id: 214
type:
  - 🟨Client
  - 🟪Epic
priority:
  - High
related:
  - "[[025 - Settings oldal - Fordítás nyelvének beállítása]]"
platform:
  - frontend
  - image-server
sprint:
creation-time: 2025-08-23T10:58:00
---
Előfeltétel:
- A következő task implementálása: [[025 - Settings oldal - Fordítás nyelvének beállítása]]

Aktuális működés:
- Amennyiben képeket kell lekérni ahhoz, hogy megjelenítsük az esetleges szűrési eredményeket, avagy a befoglaló téglalapokat rárajzoljuk képekre, ahhoz a képeket le kell kérnünk egy távoli szerverrről, de ezen szerver túlterhelésre kerülhet, amennyiben egy időben túl sok kérést küldünk ki felé.

Elvárt működés: 
- A kliens kérte, hogy amennyiben ő biztosítja a képek jelenlétét, akkor az alkalmazás képes legyen beolvasni ezen lokálban tárolt képeket. Ezt a következő módon valósíthatnánk meg:
	- Legyen egy *checkbox*, amivel ki-be lehet kapcsolni, hogy a távoli, vagy a lokális szerverről kerüljenek a képek lekérésre.
	- A *checkbox*-ra a következő szöveg kerülhetne: *Lokálisan tárolt képek használata*
	- A *checkbox* alapértelmezett értéke legyen *false*
	- A *checkbox* mellett legyen egy *Info* ikon, amiben *tooltip* formájában a következő szöveg kerülhetne kiíratásra: *Amennyiben a gisco szerveren lévő képek lokálisan vannak eltárolva neked és kifejezetten ezen lokális képeket szeretnéd használni az alkalmazás futtatása során, akkor használd ezen opciót. Ennek segítségével a képek gyorsabban kerülhetnek megjelenítésre a teljes alkalmazásba*
	- Amennyiben a felhasználó *true*-ra állítja a *checkbox*-ot, akkor egy ellenőrzést kell végeznünk az alkalmazás oldaláról azért, hogy az *image-server* az működik-e vagy sem. Ezen *image-server* azért szükséges, hogy a képeket visszakaphassuk.
		- Ellenőriznünk kell, hogy az *image-server* az elérhető-e az alkalmazás számára (egyáltalán fut-e)
		- Amennyiben az alkalmazás nem elérhető, akkor kerüljön egy *Dialógus* ablak megjelenítésre, ahol informáljuk a felhasználót arról, hogy az alkalmazás nincsen letöltve számára, és ajánjuk fel számára, hogy letöltsük számára azon XYZ alkalmazást, aminek futtatásának segítségével lehet a lokálisan tárolt képeket használni. Ezen XYZ alkalmazás egy zip fájlban kerülhetne letöltésre.
		- Teszt ellenőrzés, hogy egy teszt-endpoint, és egy teszt kép letöltése működik-e. Erre azért van szükség, hogy a frontend alkalmazás biztosra menjen, hogy a kapcsolat a *frontend* és az *image-server* között helyesen létrejött, és minden kép megfelelően került beolvasásra és megjelenítésre. 
			- Esetleg pont emiatt kellene lennie egy *kép megjelenítése mezőnek*, ahol egy teszt kép kerülhetne betöltésre a lokálisan tárolt képek közül azon célból, hogy a felhasználó láthassa, hogy a képek sikeresen betöltésre kerültek-e vagy sem.
		- Visszacsatolás a felhasználónak
			- Amennyiben minden sikeresen lezajlott, akkor egy zöld alert ikon és message kerülhetne megjelenítésre a *checkbox* mellett
			- Amennyiben bármilyen hiba került megfigyelésre az ellenőrzés során, akkor egy piros *alert* kerülhetne megjelenítésre. Amennyiben lehet, a hiba részletesen kerüljön megjelenítésre a felhasználóknak, és lehetséges *feedback* is kerül megadásra a felhasználók számára, hogy mit tehetnek a feldobott hiba orvoslása céljából.