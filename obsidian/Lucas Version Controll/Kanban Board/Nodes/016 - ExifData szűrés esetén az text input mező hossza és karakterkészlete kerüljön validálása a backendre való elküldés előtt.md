---
id: 16
type:
  - 🟥Bug
priority:
  - Low
related: 
platform:
  - backend
  - frontend
creation-time: 2024-12-07T09:24:00
---
Elvárt működés: 
- Ezen részt a felhasználó eltörheti úgy, hogy nagyon hosszú szöveget szolgáltat az exif data-nak, aminek köszönhetően akár a http request sem fog elküldésre kerülni (mivel túllépnénk a maximális limitjét az http üziknek).