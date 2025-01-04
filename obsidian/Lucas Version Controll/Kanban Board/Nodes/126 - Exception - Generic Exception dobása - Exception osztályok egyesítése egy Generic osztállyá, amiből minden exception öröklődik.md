---
id: 126
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - backend
sprint: 
creation-time: 2025-01-04T12:23:00
---
Aktuális működés:
- Jelenleg van egy *BaseException* osztály, ami öröklődik a *RuntimeException* osztályból. Ennek köszönhetően tudunk *Exception*-t dobni a backend oldalán.
- Látszik, hogy több féle saját *Exception*-t sikerült létrehozni a backend fejlesztése során:
	- ImageException
	- ProcedureException
	- EncryptionException
	- ...
- Ezek mindegyiket pontosan ugyan úgy épül fel.
	- Egy konstruktor, ami egy `<T>` típusú enum értéket vár, mint hibaüzenet.
	- Egy konstruktor, ami egy `<T>` típusú enum értéket és egy param-ot vár, ami mentén került a hiba dobásra.

Elvárt működés: 
- Azt szeretném, hogy legyen egy *GenericBaseException*, ami egy `<T>` típusú Generic Enum értéket vár, ami a hibaüzenet lesz.
- Minden *Custom Exception* ezen *GenericBaseException* osztályból öröklődjön.
- Minden leszármazott osztályában CSAK a generikus osztály definiálásához szükséges Enum-ot kelljen csak megadni. Ne kelljen külön kiírni a konstruktorokat és a javadoc dokumentációkat.

Elért dolgok:
- Java NEM támogatja a generikus *Exception* osztályokat, mivel nem tudná megkülönböztetni azokat. Ámde ez nem azt jelenti, hogy lehetetlen megvalósítani ezt, csupán bonyolult és nehéz lenne.