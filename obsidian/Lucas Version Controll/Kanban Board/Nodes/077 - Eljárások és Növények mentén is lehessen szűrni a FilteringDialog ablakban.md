---
id: 77
type:
  - 🟪Epic
  - 🟨Client
priority:
  - High
related: 
platform:
  - frontend
  - backend
sprint: 1
creation-time: 2024-12-22T13:41:00
---
Aktuális működés:
- Jelenleg nem minden szűrési feltétel van implementálva, ami miatt korlázotva van, hogy a felhasználó mi mentén tudjon szűrni. A hiányos szűrési opciók kerüljenek implementálásra.

Elvárt működés: 
- A hiányzó szűrési opciók:
	- [ ] **Eljárás** mentén lehessen szűrni:
		- [ ] *Eljárás neve* alapján
		- [ ] *Eljárás paraméterei* alapján
		- [ ] Operátor mentén szűrni:
			- [ ] *Megtalálható* a képen (pl. 1.png képen a *Képelemző 40K* az *Megtalálható/Alkalmazva* legyen.)
			- [ ] *NEM megtaláható* a képen
	- [ ] **Növények** mentén lehessen szűrni:
		- [ ] *Köznév + Tudományos név* alapján
		- [ ] *Növényfajta* alapján
		- [ ] Operátor mentén szűrni:
			- [ ] *Megtalálható* a képen (pl. 1.png képen a *Pitypang* az *Megtalálható* legyen.)
			- [ ] *NEM megtaláható* a képen
	- [ ] **Befoglaló téglalapok** mentén lehessen szűrni
		- [ ] *Növény találat* valószínűsége alapján szűrni
		- [ ] *Homogén*-e a detektált felület?