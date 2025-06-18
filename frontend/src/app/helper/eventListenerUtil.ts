import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { IdUtils } from "./idUtils";

export default abstract class EventListenerUtil {
  /**
   * Dispatches a synthetic event event to target.
   *
   * @param idKey An enum key.
   * @param id The specific and unique name for the event.
   * @returns Returns true if either event's cancelable attribute value is false
   * or its preventDefault() method was not invoked, and false otherwise.
   */
  public static dispatchEvent = (idKey: EventListenerIdEnum, id?: number | string) => {
    return window.dispatchEvent(new Event(this.getEventIdNameFromEventListenerIdEnum(idKey, id)));
  };

  public static getEventIdNameFromEventListenerIdEnum = (
    idKey: EventListenerIdEnum,
    id?: number | string,
  ) => {
    return IdUtils.getFormName(idKey, id);
  };
}
