---
id: 10
type:
  - 🟦Todo
priority:
  - Medium
related:
  - "[[009 - Szűrt képek megjelenítése a jobb oldali képernyőn]]"
platform:
  - backend
  - frontend
creation-time: 2024-12-07T09:24:00
---
Elvárt működés: 
- Mivel 6 vagy 9 kép kerül mindig megjelenítésre a frontend oldalon, így a felhasználóknak lehetőséget kell adnunk, hogy lapozzanak az így kinyert képek között.
- Minden lapozás során, a következő 6-ot, vagy az előző 6-ot kell visszaadnunk, és megjelenítnünk a frontend oldalon.
- Legyen lekezelve, hogy:
	- Amennyiben elértük a 0. lapot, akkor annál visszább ne lehessen menni
	- Amennyiben elértük az utolsó lapot, akkor annál tovább ne lehessen menni
- Az aktuális lap oldala kerüljön megjelenítésre az ablakban