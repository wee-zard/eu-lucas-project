---
id: 174
type:
  - 🟦Todo
priority:
  - High
related: 
platform:
  - frontend
sprint: 
creation-time: 2025-06-20T17:31:00
---
Aktuális működés:
- Amennyiben a *progressbar*, vagy a backdrop megjelenítésre kerül, akkor a *backdrop* addig van a képernyőn, míg a háttérben lévő logika be nem fejeződik.
- Mi van azon esetben, ha ezen logika akár eltart több másodpercig, akár percig is? Honnan tudja a felhasználó, hogy az alkalmazás dolgozik a háttérben, vagy már feldolgozott mindent?

Elvárt működés: 
- A progress kerüljön megjelenítésre a *backdrop* komponens során.
- Pl. 1/39, 2/39, 3/39, 4/39, ... 38/39, 39/39