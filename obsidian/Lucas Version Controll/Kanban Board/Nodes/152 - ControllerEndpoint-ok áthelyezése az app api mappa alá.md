---
id: 152
type:
  - 🟦Todo
priority:
  - Low
related: 
platform:
  - frontend
sprint: 
creation-time: 2025-02-08T20:43:00
---
Aktuális működés:
- Van több szerverünk, amihez a frontend alkalmazás csatlakozhat, illetve ezen szerverekre lebontva megtalálhatóak az endpoint-ok, amihez az alkalmazásunk behívhat.

Elvárt működés: 
- Ez mind az enum fájlban található, ami egy igen nagy helyet foglal, így jobb lenne áthelyezni az app/api mappába.
- Ezt követően át kéne szervezni ezen enum értékek felépítését, hogy sokkal átláthatóbb legyen.