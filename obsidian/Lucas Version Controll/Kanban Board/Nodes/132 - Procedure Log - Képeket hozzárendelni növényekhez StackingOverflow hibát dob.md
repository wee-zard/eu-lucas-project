---
id: 132
type:
  - 🟥Bug
  - 🟪Epic
priority:
  - High
related: 
platform:
  - backend
sprint: 1
creation-time: 2025-01-05T09:45:00
---
Aktuális működés:
- Képekhez lehet növényeket rendelni (hogy milyen növények lettek a képeken detektálva), és fordítva (hogy milyen képek lettek hozzárendelve a növényekhez).

Elvárt működés: 
- Amikor lekérjük a növényekkel kapcsolatos adatokat, akkor csak a növény objektumokat kérjük le, DE nem kérjük le a növények kapcsolatát a képekkel. Ez egy hibát okoz az algoritmusban, ami *StackOverflow* hibát dob, amennyiben KÉPEKET akarunk hozzáadni a növényekhez. Ez kerüljön javításra, mert így nem lehet képeket hozzárendelni növényekhez.