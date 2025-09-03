---
id: 217
type:
  - 🟦Todo
priority:
  - High
related:
  - "[[214 - Lokálisan tárolt képek használata checkbox]]"
platform:
  - frontend
sprint:
creation-time: 2025-08-31T19:23:00
---
Aktuális működés:
- Jelenleg, minden kép a távoli gisco szerverről kerül lekérésre (esetleges fájlok letöltése a backend oldalán is található → Ez akkor van, amikor letöltenénk egy mappa tartalmát)

Elvárt működés: 
- Amennyiben a *lokális kép szerver* az bekapcsolásra került és működik a felhasználó oldalán, úgy kerüljenek ezen szerverről lekérésre a képek.