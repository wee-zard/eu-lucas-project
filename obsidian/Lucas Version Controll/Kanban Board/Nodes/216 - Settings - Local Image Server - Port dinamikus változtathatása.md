---
id: 214
type:
  - 🟦Todo
priority:
  - Low
related:
platform:
  - image-server
  - frontend
sprint:
creation-time: 2025-08-31T19:18:00
---
Aktuális működés:
- Jelenleg a lokális szerver az a *6792*-es porton keresztül kerül hosztolásra, de mi van azon esetben, hogyha a felhasználónak NEM szabad ezen portja?

Elvárt működés: 
- Adjunk lehetőséges a felhasználóknak, hogy a portot változtathassák.
- Egy új input mezőt kéne felvenni, ahol a felhasználó változtathatja a *Lokális kép szerver* port számát, amihez csatlakozik az alkalmazás. Valahogy dinamikusan meg kellene valósítani, hogy ezen érték módosítása esetén a letöltésre került zip-ben is kerüljenek módosításra az adatok.
- Legyen egy input mező, amiben a felhasználó megadhatja, hogy milyen porton kerül az *image-server* hosztolásra lokálisan. Az alkalmazás ezen porton keresztül próbál meg hallgatózni és lekérni a képeket.
	- Legyen egy *Infó* ikon az input mellett
	- Legyen egy tooltip az ikon-hoz a következő szöveggel: *Adja meg azon port számot, amin keresztül az XYZ alkalmazás elérhető a Lucas-Image-Analyzer számára. Ezt úgy tudja megtenni, hogy megnyitja az XYZ mappájában lévő .env fájlt és kiolvassa az ott található "port" kulcshoz tartozó értéket, ami alapértelmezetten 8937*