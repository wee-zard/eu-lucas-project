---
id: 213
type:
  - 🟦Todo
priority:
  - Medium
related: 
platform:
  - frontend
sprint: 
creation-time: 2025-08-16T17:16:00
---
Aktuális működés:
- Amennyiben GET vagy DELETE http üzeneteket küldünk ki a backend szerver felé, akkor *payload*-nak egy *RequestParamType* típusú objektumot kell átadnunk, ami NEM hatékony, mivel minden más metód típus esetén egy tetszőleges objektumot adhatunk meg.

Elvárt működés: 
- Amennyiben lehet, akkor egy dinamikus objektum szerkezetet lehessen megadni, beolvasni az objektum *kulcsait*, majd ahhoz bind-olni a *value* értékeket
- Amennyiben ez megvalósításra kerül, akkor sokkal könnyebben lehet követni a kódnak a szerkezetét, nem is beszélve arról, hogy a kód komplexitása kisebb lenne, illetve a fejlesztő is sokkal könnyebben tudná használni a kódot.