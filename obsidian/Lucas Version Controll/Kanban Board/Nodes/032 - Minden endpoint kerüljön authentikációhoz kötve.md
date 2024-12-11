---
id: 32
type:
  - 🟥Bug
priority:
  - Medium
related: 
platform:
  - backend
sprint: 
creation-time: 2024-12-07T10:02:00
---
Aktuális működés:
- Nem minden endpoint van levédve. Ezzel a backend sebezhetővé válik mások számára, mivel a publikum képes lenne behívni ezen pontokra, és lekérdezni az adatbázisban lévő adatokat, vagy esetleg módosítani az adatokat!

Elvárt működés: 
- CSAK az authentikáción átmenő felhasználók juthassanak el az egyes endpoints-ig.
- Kérdés. Lehet-e ezt dinamikusan megcsinálni, hogy ne minden controller-ben legyen egy *@Authentication* annotáció megvalósítva, hanem ez legyen egy külső fájlban, ami minden alkalommal meghívásra kerülne, ha http request érkezik?
- https://docs.spring.io/spring-security/reference/servlet/authorization/authorize-http-requests.html