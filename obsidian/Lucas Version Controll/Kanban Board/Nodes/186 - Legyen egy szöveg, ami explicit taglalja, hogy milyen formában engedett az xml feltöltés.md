---
id: 186
type:
  - 🟦Todo
priority:
  - Medium
related: 
platform:
  - frontend
sprint: 
creation-time: 2025-06-20T21:29:00
---
Aktuális működés:
- Jelen implementáció esetén, a felhasználó képes XML fájlokat feltölteni, de azt nem tudja, hogy az XML-nek pontosan hogyan is kell kinéznie struktúrailag. Éppen emiatt, csak a hiba üzenetekből lehet kikövetkeztetni, hogy hogyan is kellene a fájloknak kinéznie, ami nem előnyös.

Elvárt működés: 
- Legyen egy gomb, vagy szöveg, ami explicit leírja az XML fájl tartalmát. Az XML-hez alapból van egy DTD, amit fel lehetne használni.
- Külön kiíratásra kerüljön, hogy az egyes XML elemeket hogyan olvassuk be, pontosan a parzolás hogyan történik.
- "Amennyiben a feltöltendő fájlod nem ilyen formátumú, akkor rád van hárítva a kötelesség, hog ilyen fájlt tölts fel".