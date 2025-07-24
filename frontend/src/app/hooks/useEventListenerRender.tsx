import EventListenerUtil from "@helper/eventListenerUtil";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { useEffect, useState } from "react";

export const useEventListenerRender = (
  key: EventListenerIdEnum | undefined,
  renderComponent: () => any,
  id?: string | number,
) => {
  const [element, setElement] = useState(renderComponent());
  const updateElement = () => setElement(renderComponent());

  useEffect(() => {
    if (!key) {
      return;
    }

    const eventName = EventListenerUtil.getEventIdNameFromEventListenerIdEnum(key, id);
    window.addEventListener(eventName, updateElement);
    return () => window.removeEventListener(eventName, updateElement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return element;
};

export const useEventListenerFetcher = (
  key: EventListenerIdEnum | undefined,
  renderComponent: () => any,
  id?: string | number,
) => {
  const updateElement = () => renderComponent();

  useEffect(() => {
    if (!key) {
      return;
    }

    updateElement();

    const eventName = EventListenerUtil.getEventIdNameFromEventListenerIdEnum(key, id);
    window.addEventListener(eventName, updateElement);
    return () => window.removeEventListener(eventName, updateElement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
