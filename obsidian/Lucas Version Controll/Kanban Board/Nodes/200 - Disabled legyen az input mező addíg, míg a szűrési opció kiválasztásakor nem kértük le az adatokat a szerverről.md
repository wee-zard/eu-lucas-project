---
id: 200
type:
  - 🟥Bug
priority:
  - Medium
related: 
platform:
  - frontend
sprint: 
creation-time: 2025-07-24T18:46:00
---
Aktuális működés:
- Amennyiben a felhasználó rányom a "Query By" inputmezőre, akkor a háttérben lekérjük az adott szűrési feltételhet tartozó opciókat a szerverről. Éppen emiatt, az simán megtörténhet, hogy a felhasználó rányom ezen inputmezőtől jobbra lévő mezőre, jelen esetünkben az "Év" input mezőre és azt veszi észre, hogy *nincsen* egy opció sem.
- Ameddig a kérés nem fejeződik be, addig a felhasználónak lehetősége van ezen "év" input mezőt megtekinteni. Ez nem eredményes, mivel a felhasználó azt hiheti, hogy az adott szűrési feltételhez nem található opció.

Elvárt működés: 
- Ameddig MÉG nem kértük le az adatokat a szerverről, addig ezen input mezőnek disabled-nek kéne lennie (esetle egy loading indikátort kéne megjeleníteni). Ezzel is jelezhetnénk a felhasználónak, hogy az input mező MÉG nem kitölthető.
- Esetleg egy tooltip is használatra kerülhetne, ami a következő szöveget jeleníthetné meg: *"A kiválasztott [SZŰRÉSI FELTÉTEL] szűrési feltételhez tartozó opciókat még nem kerültek lekérésre a szerverről. Amennyiben lekérésre kerültek, az input mező újra elérhető lesz. Addig is szíves türelmedet kérjük!"*
- ![[Pasted image 20250724184703.png]]