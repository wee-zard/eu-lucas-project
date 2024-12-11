---
id: 35
type:
  - 🟦Todo
priority:
  - Low
related: 
platform:
  - backend
sprint: 
creation-time: 2024-12-07T10:27:00
---
Aktuális működés:
- Amennyiben többen használják egyszerre, párhuzamosan az alkalmazást, akkor az elkerülhetetlenné válik, hogy legyen egy olyan időpillanat, amikor versenyhelyzet alakul ki, két http request között. (ez lehetséges hibát fog eredményezni)

Elvárt működés: 
- Spring boot-ban lehetséges az egyes táblákat lehet *Zárolni*. Ezen zárolási metodikákat kell átnézni, és általa zároltatni azon táblákat, metódusokat, ahol a versenyhelyzet kialakulhat.