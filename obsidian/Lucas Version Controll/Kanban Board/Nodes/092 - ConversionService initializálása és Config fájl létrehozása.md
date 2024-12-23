---
id: 92
type:
  - 🟦Todo
priority:
  - Low
related: 
platform:
  - backend
sprint: 1
creation-time: 2024-12-23T23:08:00
---
Aktuális működés:
- Ahhoz, hogy a *ConversionService* által nyújtott funkcionalitásokat használhassuk, szükségünk van initializálni ezen *Service*-t, amihez létre kell hozni egy külön *ConfigFile*-t.

Elvárt működés: 
- Lehessen *ConversionService*-t létrehozni, és ez legyen elérhető egy *BaseController* osztályban, amiből minden *Controller* származhat. Ezen osztályt NE lehessen példányosítani. Csak a *ConversionService* legyen egyedüli adattagja. Metódusai a *PageableRequest*-hez szükséges metódusok legyenek.