---
id: 56
type:
  - 🟦Todo
priority:
  - Low
related:
  - "[[052 - Loading komponens megjelenítése]]"
platform:
  - frontend
sprint: 
creation-time: 2024-12-08T17:07:00
---
Elvárt működés: 
- Amennyiben létrehozzuk a *Timeline* komponenst (azzért, hogy az egyes képeken megjeleníthessük a befoglaló téglalapokat), akkor egy lekérdezést fogunk indítani a távoli szerver felé, hogy lekérdezhessük az adott képhez tartozó *Eljárás Log*-okat.
- Ameddig a backend nem adja vissza a felhasználó számára az *Eljárás Log*-okat, addig kerüljön megjelenítésre itt egy loading ikon.
- Itt meg lesz valósítva egy olyan választható mező is, ahol ki lehet választani *Eljárás Log* párokat, amelyek együttes kiválasztásával, befoglaló téglalapokat lehet megjeleníteni a képen (ezen felül megjeleníteni, hogy a befoglaló téglalapok hány %-ban egyeznek).