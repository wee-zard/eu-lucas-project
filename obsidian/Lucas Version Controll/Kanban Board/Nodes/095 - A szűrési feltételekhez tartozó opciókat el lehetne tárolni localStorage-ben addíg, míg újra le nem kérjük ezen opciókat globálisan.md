---
id: 95
type:
  - 🟦Todo
priority:
  - Low
related: 
platform:
  - frontend
sprint: 
creation-time: 2024-12-23T23:21:00
---
Aktuális működés:
- Minden egyes alkalommal, amikor a felhasználó újratölti a weboldalt, akkor a *React Redux Storage* kiürítésre kerül. Ennek köszönhetően, mindig lekérjük az egyes szűrési feltételekhez tartozó opciókat a szerverről.
- Lenne később egy globális beállítás, amely segítségével lehetne lekérni a képeket a távoli kép adatbázisból. Amennyiben ez nem kerül újból meghívásra, addig a szűrési feltételekhez tartozó opciók sem fognak változni. Emiatt érdemes lenne őket eltárolni a localStorage-ben.

Elvárt működés: 
- Eltárolni ezen értékeket a localStorage-ben.
	- [ ] Amennyiben nincsenek benne a localStorage-ben, akkor kérjük le a megfelelő szűrési feltétel opcióit, és eredményüket tároljük el a localStorage-ben.
	- [ ] Amennyiben ezen opciók már el vannak tárolva a localStorage-ben, akkor NE kérjük le őket még egyszer a szerverről, hanem kérjük le elsőbbségiben ezen tárolóból.