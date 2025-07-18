---
id: 3
type:
  - 🟨Client
priority:
  - High
related:
  - "[[004 - Eljárás logok automatikus kiválasztása a legnagyobb közös alapján]]"
creation-time: 2024-12-07T09:23:00
sprint: 4
---
Elvárt működés: 
- Szeretném, hogyha az egyes képeken megjelenítésre kerülnének a befoglaló téglalapok. Amennyiben a felhasználó kijelölt egy képek, akkor kerüljön feldobásra egy olyan opció, hogy *befoglaló téglalapok megjelenítése*. Egy mini ablak jelenjen meg a kép mellett.
- A megjelenített ablak egy *Mui Timeline* legyen, amiben sorbarendezve (a legkorábbi legyen legelől) találhatóak meg az egyes eljárás logok. Az eljárás logok olyan eredmények, amiket az egyes eljárásokkal eredményezhetünk.
	- Link: [React Timeline component - Material UI](https://mui.com/material-ui/react-timeline/#alternating-timeline)
	- ![[Pasted image 20241206222934.png]]
- A *Mui Timeline*-on láthatóak a *Node*-ok. Ezek kattinthatóak legyenek. Amennyiben megnyomom ezeket, akkor az azokhoz tartozó eljárás log eredményéből kinyert, képhez tartozó befoglaló téglalapok kerüljenek megjelenítésre, egy előre definiált színnel.
	- A felhasználó legyen képes, akár több eljárás log eredményét megjeleníteni a képen.
	- A képen kerüljenek megkülönböztetésre az egyes eljárás logok eredményei. Amennyiben egy log-ot kiválasztottunk, akkor az kerüljön *pirossal* megjelenítéssel (és az ő hozzá tartozó befoglaló téglalapok), a következő log kiválasztásával, a befoglaló téglalapok legyenek *kékek*, a rákövetkezőek *zöldek*, *sárgák*, *lilák* és így tovább.
	- ![[Pasted image 20241206223448.png]]