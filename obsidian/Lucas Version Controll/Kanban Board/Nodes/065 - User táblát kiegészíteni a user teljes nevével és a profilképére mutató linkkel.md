---
id: 65
type:
  - 🟦Todo
priority:
  - Low
related: 
platform:
  - backend
  - database
sprint: 
creation-time: 2024-12-11T23:28:00
---
Aktuális működés:
- Jelenleg a felhasználó nevét tároljuk el a felhasználóknak.

Elvárt működés: 
- El akarom tárolni a felhasználók teljes nevét, ami egy sikeres Google bejelentkezést követően történik meg.
- Ha elsőnek jelentkezel be az alkalmazásba (mikor az email címed elérhető az alkalmazásban)
	- Akkor a felhasználó státusza álljon át → AKTÍV
	- A felhasználó profilképe és teljes neve kerüljön eltárolásra az adatbázisban
- Miért van erre szükségem?
	- Amikor az adott felhasználó el akarna küldeni egy *Report* üzenetet a szerver felé, akkor szükségem van az adott felhasználó nevére (lehet ugyan a neve null, de az meg hogy néz ki?)
	- Kell nekem a felhasználó profil képe, mivel egy *Avatar* komponens keretén belül, a *Toolbar* jobb felső sarkában meg akarom jeleníteni a felhasználó profilképét.