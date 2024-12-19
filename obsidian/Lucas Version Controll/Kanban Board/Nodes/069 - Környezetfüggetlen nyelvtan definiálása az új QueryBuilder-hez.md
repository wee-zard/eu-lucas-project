---
id: 69
type:
  - 🟦Todo
priority:
  - Low
related:
  - "[[068 - Új Query Builder implementálása a frontenden]]"
platform: 
sprint: 
creation-time: 2024-12-13T22:28:00
---
Elvárt működés: 
- Definiálni egy környezetfüggetlen nyelvtant, ami validálja a felhasználók által elfogadható QueryBuilder-eket.
- Jelenleg ezen könyezetfüggetlen nyelvtan a következő képpen halad.
- ![[query-builder-grammar.png]]

| Symbols     | →   |       |         |       |           |             |             |
| ----------- | --- | ----- | ------- | ----- | --------- | ----------- | ----------- |
| S           | →   | And G | Or G    | G''   |           |             |             |
| G           | →   | G' G  | G' G'   |       |           |             |             |
| G'          | →   | S     | G''     |       |           |             |             |
| G''         | →   | And C | Or C    | C'    |           |             |             |
| C           | →   | C' C  | C' C'   |       |           |             |             |
| C'          | →   | Year  | Country | Plant | Direction | CoordinateX | CoordinateY |
| Year        | →   | a     |         |       |           |             |             |
| Country     | →   | b     |         |       |           |             |             |
| Plant       | →   | c     |         |       |           |             |             |
| Direction   | →   | d     |         |       |           |             |             |
| CoordinateX | →   | e     |         |       |           |             |             |
| CoordinateY | →   | f     |         |       |           |             |             |
| And         | →   | g     |         |       |           |             |             |
| Or          | →   | h     |         |       |           |             |             |
