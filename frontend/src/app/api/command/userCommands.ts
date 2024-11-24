import {
  NotificationSeverity,
  throwNotification,
} from "../../helper/notificationUtil";
import {
  BackendUserControllerEndpoints,
  ServersToConnectTo,
} from "../../model/enum";
import { postCommand } from "../handler/requestHandler";

export const validateEmailAddress = async (authtoken: string) => {
  try {
    const response = await postCommand(
      ServersToConnectTo.Backend,
      BackendUserControllerEndpoints.ValidateEmail,
      {},
      authtoken
    );
    if (response.status !== 200) {
      throwNotification(NotificationSeverity.Error, response.data.message);
      return null;
    }
    return true;
  } catch (error) {
    throwNotification(
      NotificationSeverity.Error,
      "Váratlan hiba történt a bejelentkezés során! Próbáld meg újra a bejelentkezést később!"
    );
    return null;
  }
};
