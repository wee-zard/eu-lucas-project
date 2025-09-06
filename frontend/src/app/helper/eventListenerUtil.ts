import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { IdUtils } from "./idUtils";
import EventListenerType from "@model/types/EventListenerType";

export default abstract class EventListenerUtil {
  /**
   * Dispatches a synthetic event event to target.
   *
   * @param idKey An enum key.
   * @param id The specific and unique name for the event.
   * @returns Returns true if either event's cancelable attribute value is false
   * or its preventDefault() method was not invoked, and false otherwise.
   */
  public static dispatchEvent = (
    idKey: EventListenerIdEnum,
    id?: number | string,
    methodParam?: any,
  ) => {
    return window.dispatchEvent(
      new CustomEvent(this.getEventIdNameFromEventListenerIdEnum(idKey, id), {
        detail: methodParam,
      }),
    );
  };

  public static create = (event: EventListenerType): void => {
    if (!event.method) {
      return;
    }

    const eventName = EventListenerUtil.getEventIdNameFromEventListenerIdEnum(event.key, event.id);
    window.addEventListener(eventName, event.method, event.methodParam);
  };

  public static removeEventListener = (event: EventListenerType): void => {
    if (!event.method) {
      return;
    }

    const eventName = EventListenerUtil.getEventIdNameFromEventListenerIdEnum(event.key, event.id);
    window.removeEventListener(eventName, event.method, event.methodParam);
  };

  public static getEventIdNameFromEventListenerIdEnum = (
    idKey: EventListenerIdEnum,
    id?: number | string,
  ) => {
    return IdUtils.getFormName(idKey, id);
  };
}
