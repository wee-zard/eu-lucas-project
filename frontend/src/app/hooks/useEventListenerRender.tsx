import EventListenerUtil from "@helper/eventListenerUtil";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import EventListenerType from "@model/types/EventListenerType";
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

    const event: EventListenerType = {
      key: key,
      id: id,
      method: updateElement,
    };

    EventListenerUtil.create(event);
    return () => EventListenerUtil.removeEventListener(event);
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

    const event: EventListenerType = {
      key: key,
      id: id,
      method: updateElement,
    };

    EventListenerUtil.create(event);
    return () => EventListenerUtil.removeEventListener(event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
