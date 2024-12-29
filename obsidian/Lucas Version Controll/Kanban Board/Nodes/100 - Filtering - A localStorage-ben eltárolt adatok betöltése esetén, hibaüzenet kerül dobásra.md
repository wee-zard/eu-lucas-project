---
id: 100
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - frontend
sprint: 
creation-time: 2024-12-26T10:03:00
---
Aktuális működés:
- A *Filtering* oldallal kapcsolatos adatok lesznek eltárolva első sorban a *localStorage*-ben, de ezen felül a szűrési feltételekhez tartozó opciók is eltárolásra kerülnek a jövőben a *localStorage*-ben.
- Nagyon sok módosítás történt az alkalmazásban, ami miatt előfordult már velem az, hogy nem tudtam rendesen betölteni a *localStorage*-ben lévő adatokat, mivel az futtatási hibára futott a *FilteringDialog* renderelése során, aminek következtében az adatok még nem is kerültek törlésre a *localStorage*-ből.

Elvárt működés: 
- Amennyiben beolvassuk a *localStorage*-ben lévő adatokat, akkor meg kellene bizonyosodni, hogy az ott eltárolt adatokat be tudjuk-e olvasni, és az ottani adatokat le tudjuk-e kérdezni. Nagy eséllyel beolvashatóak lesznek a *localStorage*-ben lévő adatok, de van rá esély, hogy nem fogjuk tudni meghívni az egyes attribútumaikat, mivel az megváltozott idővel. Amennyiben ezt bebizonyososik, akkor ürítsük ki a hibát okozó kulcs-érték párokat a *localStorage*-ből.