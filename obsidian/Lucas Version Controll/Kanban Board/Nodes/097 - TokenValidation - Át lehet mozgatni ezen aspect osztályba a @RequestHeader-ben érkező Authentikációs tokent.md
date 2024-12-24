---
id: 97
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - backend
sprint: 
creation-time: 2024-12-24T10:46:00
---
Aktuális működés:
- Egyenlőre minden egyes esetben, amikor az *Authentikációt* ellenőrizzük, akkor ki kell tennünk a *@TokenValidation* és a *@RequestHeader(HTTP.Authorization)* annotációkat a megfelelő *Controller* metódusához. Az a baj, hogy ez két annotáció. Nem lehetne ezekből csinálni csak 1 annotációt?

Elvárt működés: 
- Mennyire lehet lekérdezni a *@RequestHeader(HTTP.Authorization)* értékét a *@TokenValidation* osztályában? Amennyiben igen, akkor ide mozgassuk át az authentikáció ezen részét, és egyszerűsítsük a *Controller*-ek metódusainak komplexitását.