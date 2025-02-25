---
id: 163
type:
  - 🟥Bug
priority:
  - Medium
related: 
platform:
  - frontend
sprint: 2
creation-time: 2025-02-24T23:16:00
---
Aktuális működés:
- Amennyiben megnyitjuk a szűrési oldalt, akkor ott ki tudjuk választani, hogy milyen szűrési opciók mentén szűrjünk a képekre. Úgy tűnik, hogy azon lista, ami átadásra került ezen "Query By" mezőbe, azok eredetileg angolul lettek átadva és nem magyarul (amennyiben már magyarul jelenítjük meg az adatokat).
- ![[Pasted image 20250224231640.png]]

Elvárt működés: 
- Amennyiben a felhasználó által kiválasztott nyelv az magyar (és egyenlőre csak ez lesz elérhető), akkor a magyar nyelv mentén kerüljenek sorbarendezésre az "Query By" input mező alatt megjelenő opciók egyes elemei.