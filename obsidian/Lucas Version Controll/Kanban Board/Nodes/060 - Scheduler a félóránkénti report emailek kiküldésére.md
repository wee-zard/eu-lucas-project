---
id: 60
type:
  - 🟥Bug
priority:
  - Low
related:
  - "[[026 - Report oldal implementálása]]"
platform:
  - backend
sprint: 1
creation-time: 2024-12-11T20:14:00
---
Aktuális működés:
- Jelenleg, amennyiben a felhasználó rányom a küldés gombra a *Report* oldalon, akkor azonnal létrehozásra kerül az email objektum, és elküldésre kerül a fejlesztőnek. Ez nem optimális, mivel mi van akkor, hogyha valaki 10-szer nyom rá a gombra 10 percen belül? Mi van, ha csak úgy kipróbálja a gombot és 10'000 üzenetet küldene ki? A Gmail nem tudná ezen mennyiségű üzenet mennyiséget feldolgozni, mivel elérnénk egy napi kvótát, ami felül már nem küldhetünk üzeneteket.

Elvárt működés: 
- Minden *Report* oldalról jövő üzenet kerüljön elmentésre az adatbázisban
	- Subject
	- Ki által lett létrehozva
	- Mi a bejelentés tárgya
	- Állapot
- Kerüljön használatra a *@Scheduler* annotáció, aminek segítségével egy pontos időpontot megadni, amikor is kiküldésre kerülhetnének, pontosan 1 email üzenet formájában a bejelentett hibák.
	- Amennyiben 10 üzenet halmozódott fel egy bizonyos idő alatt, akkor ezen 10 üzenet, egyszerre kerüljön, 1 üzenet formájában elküldésre a fejlesztőnek.
	- Esetleg óránként történjen ellenőrzés, vagy naponta történjen ilyen ellenőrzés.
- Ezen elgondolás csak akkor valid, amennyiben csak 1 Backend működik a háttérben, mivel akkor csak 1 backend fogja lekérni az adatokat az adatbázisból, és küldeni el az adminnak.
	- 1. eset: 10 user próbálja a saját lokális környezetén futtatni a programot, és még az előtt lépnek ki az alkalmazásból, hogy az email-ek elküldésre kerülnének.
	- 2. eset: 10 user nagyon sokáig használja az alkalmazást, és futtatni kéne az emailek kiküldését. 10 user közül, ki küldje ki az emaileket?