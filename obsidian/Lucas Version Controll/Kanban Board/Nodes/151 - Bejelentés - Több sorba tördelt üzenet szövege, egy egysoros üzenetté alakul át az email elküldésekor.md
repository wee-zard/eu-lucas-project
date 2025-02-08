---
id: 151
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - frontend
  - backend
sprint: 
creation-time: 2025-02-08T15:58:00
---
Aktuális működés:
- Amennyiben megírok egy tetszőleges üzenetet, amit be akarok jelenteni, akkor van annak előnye, hogy az ember több sorba tördeli az üzenetét. A teszt üzenet a következő:

```txt
Aktuális működés:
- Egyenlőre a frontend oldalon, minden *import* fájl teljesen random kerül behúzásra az adott komponensbe. Nincsenek sorrendben az import fájlok.

Elvárt működés: 
- Legyenek az import fájlok ABC sorrendben azért.
```

Elvárt működés: 
- Ezen szöveg, ami több sorba van tördelve, egy egysoros üzenetként kerül elküldésre a fejlesztő felé. Elvárás az, hogy amennyiben tördelve van az üzenet, akkor az üzenet, az elküldéskor is tördelve van.

Eredmény:
```txt
Aktuális működés: - Egyenlőre a frontend oldalon, minden *import* fájl teljesen random kerül behúzásra az adott komponensbe. Nincsenek sorrendben az import fájlok. Elvárt működés: - Legyenek az import fájlok ABC sorrendben azért.
```