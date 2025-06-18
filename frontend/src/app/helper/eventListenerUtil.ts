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

  /**
   * Based on the provided enum key and the optional object, retrieves the corresponding
   * name for the event listener.
   *
   * @param idKey An enum key.
   * @param opt The specific and unique name for the event.
   * @return Returns a unique name for the event listener.
   */
  public static getEventIdNameFromEventListenerIdEnum = (
    idKey: EventListenerIdEnum,
    id?: number | string,
  ) => {
    const handler = {
      [EventListenerIdEnum.CREATE_USER_DIALOG]: IdUtils.getUserCreationFormName(id),
    };
    return handler[idKey];
  };
}
