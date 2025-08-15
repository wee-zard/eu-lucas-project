---
id: 212
type:
  - 🟦Todo
priority:
  - Medium
related: 
platform:
  - backend
  - database
sprint: 
creation-time: 2025-08-15T14:59:00
---
Aktuális működés:
- Jelenleg egy AES-hez hasonló titkosítás van megvalósítva, de az nincsen megvalósítva, hogy hash alapján hasonlítsuk össze a kulcsokat. Tehát, ha van egy titkosított kulcs, míg mellette egy nem-titkosított kulcs, akkor a kettő csak akkor vethető össze, amennyiben mind a kettő már nem-titkosított változatban van. Ez nem annyira előnyös biztonsági kockázatok miatt.

Elvárt működés: 
- Esetleg valami jobb titkosítási formátumot választani az email-ek és további szenzitív adatok titkosítására.