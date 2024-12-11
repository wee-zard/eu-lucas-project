---
id: 51
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - frontend
sprint: 
creation-time: 2024-12-07T21:14:00
---
Aktuális működés:
- Jelenleg, csak Textfield input mező van megadva a Filtering Dialog, Exifdata menüpont kiválasztása során az űrlapon belül. Amennyiben kiválasztunk egy tetszőleges ExifKey-t, akkor nem lehet tudni, hogy milyen lehetséges értékeket vettek fel a képek.

Elvárt működés: 
- A Textfield kerüljön lecserélése egy Autocomplete input mezővel.
	- Csak akkor lehessen ezt kitölteni, amennyiben a felhasználó már eleve kiválasztott egy ExifKey értéket. Ha ezen érték megváltoztatásra kerül, akkor az Autocomplete-ben lévő érték kerüljön törlésre.
	- A kiválasztott Exifkey-hez tartozó lehetséges opciók kerüljenek megjelenítésre az Autocomplete options mezőjében. Amennyiben lehetséges, akkor az egyes opciók betöltésre lapozás (Paging) segítségével történjen meg, tehát legfeljebb 30 opció jelenlen meg egyszerre, és ha elérünk a lista végére, akkor a következő 30 jelenjen meg.