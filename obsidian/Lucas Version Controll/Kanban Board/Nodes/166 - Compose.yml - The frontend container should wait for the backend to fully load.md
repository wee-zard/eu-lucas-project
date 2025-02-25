---
id: 166
type:
  - 🟥Bug
priority:
  - Medium
related: 
platform:
  - frontend
sprint: 
creation-time: 2025-02-25T08:30:00
---
Aktuális működés:
- A *Frontend* container futtatása csak azután fog elindulni, hogy a *backend* container elindul (tehát, egyik függ a másiktól). Ez magába foglalja azt is, hogy a *frontend* akkor is elindul, mielőtt még a *backend* teljesen kész nem lenne az egyes api hívások fogadására. Ez potenciális hibákat eredményezhet a kliens oldalán, amit meg kéne akadályozni.

Elvárt működés: 
- A *frontend* container csak akkor kezdjen el futni, miután a *backend* teljesen készen áll az api hívások fogadására.