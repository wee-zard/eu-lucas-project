---
id: 153
type:
  - 🟦Todo
priority:
  - Low
related: 
platform:
  - frontend
sprint: 2
creation-time: 2025-02-08T16:06:00
---
Elvárt működés: 
- Ugyebár most már fordítani akarjuk az alkalmazásunkban lévő üzeneteket. Ezek egy **Raw** változatban vannak eltárolva. Elsőnek az jutott eszembe, hogy már formázva dobjuk át a **Raw** üzeneteket a komponenseknek, de ez NEM jó megoldás, mivel a komponensen kívül kéne MÉG extrába le kéne kezelni több mindent (pl. visszaállítsuk a **Raw** értékre az adott kiválasztott értéket a *SelectComponent*-ből)
- A formázás már magában a *SelectComponent* belsejében történjen meg, és amikor onnan kifelé mozogna az adat, akkor onnan CSAK a **Raw** adat kerüljön elküldésre, és semmilyen formában se a fordított/formázott adat!