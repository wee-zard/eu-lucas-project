---
id: 17
type:
  - 🟦Todo
priority:
  - Low
related:
  - "[[194 - Nyelv választó gomb input mező a bejelentkezés oldalra]]"
platform:
  - backend
  - frontend
creation-time: 2024-12-07T09:25:00
sprint: 2
---
Aktuális működés:
- Jelenleg felváltva vannak angol és magyar szövegek megjelenítve az alkalmazásban. Emiatt egységesíteni kéne, hogy alapértelmezetten csak magyar, vagy csak angol szöveg jelenjen meg.

Elvárt működés: 
- Az oldal alapértelmezetten legyen magyar nyelvű. Minden magyar nyelven kerüljön megjelenítésre. Ebbe beletartozik minden. Minden input komponens neve, a hibaüzenetek neve, illetve a leírások nevei is.
- Mit lehetne használni ehhez? [npm react-i18next - MIT license](https://www.npmjs.com/package/react-i18next)