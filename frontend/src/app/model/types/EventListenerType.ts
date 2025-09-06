import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";

type EventListenerType = {
  key: EventListenerIdEnum;
  id?: string | number;
  method?: (param?: any) => any;
  methodParam?: any;
};

export default EventListenerType;
