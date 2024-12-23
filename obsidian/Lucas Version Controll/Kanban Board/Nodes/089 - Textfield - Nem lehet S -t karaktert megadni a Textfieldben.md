---
id: 89
type:
  - 🟥Bug
priority:
  - High
related: 
platform:
  - frontend
sprint: 1
creation-time: 2024-12-23T10:16:00
---
Aktuális működés:
- Van a *Textfield*, amiben a felhasználó megadhat tetszőleges szöveget. Úgy tűnik, hogy amennyiben S karaktert nyom le a felhasználó, akkor az a React azt nem akarja megjeleníteni a *Textfield*-ben.
- Egy issue link: https://github.com/mui/material-ui/issues/19116
- Úgy tűnik ez azért lehet, mivel a Textfield egy Menu komponensen belül van, ami miatt ha első karakterként adjuk meg ezt, akkor a fókusz a MenuComponensre helyeződik, aminek következtében a felhasználó azt látja, hogy a gomb lenyomását követően az egész MeniComponent fókuszálva lett, miközben nem tudsz a TextField-be írni.

Elvárt működés: 
- Lehessen S karaktert begépelni az inputmezőbe anélkül, hogy a fókusz eltűnne az input mezőről (tehát lehessen folyamatosan, tetszőleges karaktereket begépelni az inputmezőbe).
___
Eredmény:
- Egy lehetséges megoldás: https://github.com/mui/material-ui/issues/19116#issuecomment-572367454