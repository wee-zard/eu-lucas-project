---
id: 159
type:
  - 🟥Bug
priority:
  - Medium
related: 
platform:
  - frontend
sprint: 
creation-time: 2025-02-23T22:22:00
---
Aktuális működés:
- Amennyiben kiválasztunk egy képet, és eltűntetjük azt a kiválasztott képek listájából, akkor a "Clear All" gomb még mindig klikkelhető lesz.
- Amennyiben egyesével törlöm a képeket és NEM nyomom meg a "Clear All" gombot, akkor el tudok érni egy olyan állapotba, amikor nincsen kép kiválasztva a szűrési oldalon, de a gomb még mindig azt mutatja, mintha még lenne kép kiválasztva a felhasználó által.

Elvárt működés: 
- A "Clear All" gomb NE legyen klikkelhető, mivel nincsen egyetlen egy kép sem megjelenítve az ablakban.