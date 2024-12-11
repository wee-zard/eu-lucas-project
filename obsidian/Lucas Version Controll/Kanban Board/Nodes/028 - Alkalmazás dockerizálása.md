---
id: 28
type:
  - 🟨Client
priority:
  - High
related: 
platform:
  - backend
  - database
  - frontend
  - image-server
sprint: 
creation-time: 2024-12-07T09:46:00
---
Elvárt működés: 
- A Lucas projekt mindegyik komponensét dockerizálni kell. Amennyiben ezen megtörténik, akkor a docker container-ben lévő komponenseknek kommunikálnia kell egymással ahhoz, hogy az alkalmazás működhessen.
- Az adatbázis egyenlőre lokálban lesz, így meg kell oldani azt, hogy a *client* oldalán lévő képeket használhassuk (és azok adatait feltölthessük az adatbázisba)
- Dokumentáció kerüljön létrehozásra azon célból, hogy bárki képes legyen beüzemelni a docker-t és az abban futó konténereket.