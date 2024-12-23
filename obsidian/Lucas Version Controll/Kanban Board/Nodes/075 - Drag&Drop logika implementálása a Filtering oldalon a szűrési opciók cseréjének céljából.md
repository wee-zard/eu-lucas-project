---
id: 75
type:
  - 🟦Todo
priority:
  - Medium
related:
  - "[[068 - Új Query Builder implementálása a frontenden]]"
platform:
  - frontend
sprint: 1
creation-time: 2024-12-21T21:27:00
---
Elvárt működés: 
- Adott egy szűrési komponens, ami meghatározza, hogy egy adott szűrési feltételnek milyen értéket adtunk. Lehessen ezen komponens átmozgatni egy másik *Group*-ba és hozzáadni azon *Group*-hoz.
- Implementálni egy saját *Drag&Drop* logikát React-ban.
---
Kód:
```typescript
import { QueryTypes } from "./QueryBuilderModel";

export default class DraggableDataModel {
  constructor(
    /**

     * The id of the {@link QueryComponent} that has been

     * dragged & dropped to another {@link QueryGroup}.

     */
    public id: number,
    public type: QueryTypes
  ) {}
}
```

```typescript
  const handleAllowDropElement = (ev: React.DragEvent) => ev.preventDefault();

  const handleDragElement = (ev: React.DragEvent) => {

    const draggableData: DraggableDataModel = {
      id: id,
      type: QueryTypes.QUERY_COMPONENT,
    };
    ev.dataTransfer.setData("draggableComponent",JSON.stringify(draggableData));
  };

  const handleDropElement = (ev: React.DragEvent) => {
    ev.preventDefault();
    const retrievedDraggableData: DraggableDataModel = JSON.parse(ev.dataTransfer.getData("draggableComponent") as string);
    //ev.target.appendChild(document.getElementById(data));
    // TODO: The filter component needs to be added to a new group (implement a setState(...))
    // TODO: The filter component must be removed from the old group
  };
```
