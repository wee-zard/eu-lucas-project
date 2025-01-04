---
id: 118
type:
  - 🟨Client
priority:
  - Medium
related: 
platform:
  - backend
  - database
sprint: 
creation-time: 2025-01-02T19:28:00
---
Aktuális működés:
- Jelenleg az EXIF adatokat NEM töltjük fel az adatbázisba, mivel magukat a képeket sem töltjük le a távoli Lucas kép adatbázisból.

Elvárt működés: 
- Amennyiben tudjuk, hogy a *2006*-os képhez tartozó legfontosabb adatok le vannak mentve, akkor kérjük le ezen képekhez tartozó EXIF adatokat is. (ez sokkal több erőforrásba is kerülhet, mivel a képeket magukat ténylegesen le kellene töltenünk, ami azt eredményezi, hogy *100GB+* -nyi képet letöltsünk és azok EXIF adatait feltöltsük)
- Jó hír, hogy amennyiben letöltjük a képeket, akkor azokat felhasználhatjuk arra, hogy a lokálban lévő képeket jelenítsük meg az alkalmazásban, és NE a távoli kép adatbázisban lévő képeket.