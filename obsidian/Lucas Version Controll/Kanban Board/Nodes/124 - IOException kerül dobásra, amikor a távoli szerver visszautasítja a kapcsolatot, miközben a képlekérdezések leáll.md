---
id: 124
type:
  - 🟥Bug
priority: 
related: 
platform:
  - backend
sprint: 
creation-time: 2025-01-02T22:54:00
---
Aktuális működés:
- Amennyiben *IOException* kerül dobásra a http request kiküldése során a távoli lucas kép adatbázis felé, akkor a teljes algoritmus leáll (ami feltölteni a képek adatait a lokális adatbázisba).
- Miért nem jó ez? Lehal tőle a program, ami miatt nem tud tovább futni. Ezt nem szabad megengedni.

Elvárt működés: 
- Függetlenül attól, hogy hibaüzenet kerül-e dobásra vagy sem, semmilyen körülmények közepette NE kerüljön a *Main Thread* terminálásra. Ez NEM következhet be.