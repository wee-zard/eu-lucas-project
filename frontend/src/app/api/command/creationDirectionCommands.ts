import { getLocalStorageItem } from "../../helper/localStorageUtil";
import {
  NotificationSeverity,
  throwNotification,
} from "../../helper/notificationUtil";
import CreationDirectionDto from "../../model/CreationDirectionDto";
import {
  BackendCreationDirectionControllerEndpoints,
  LocalStorageKeys,
  ServersToConnectTo,
} from "../../model/enum";
import { getCommand } from "../handler/requestHandler";

export const getCreationDirections = async () => {
  try {
    const authToken = getLocalStorageItem(LocalStorageKeys.GoogleOAuthToken);
    if (!authToken) {
      throwNotification(
        NotificationSeverity.Error,
        "Error! Authentication token is not found!"
      );
      return null;
    }
    const response = await getCommand(
      ServersToConnectTo.Backend,
      BackendCreationDirectionControllerEndpoints.GetCreationDirections,
      {},
      authToken
    );
    if (response.status !== 200) {
      throwNotification(NotificationSeverity.Error, response.data.message);
      return null;
    }
    const listOfCreationYears: CreationDirectionDto[] = response.data;
    return listOfCreationYears;
  } catch (error) {
    throwNotification(
      NotificationSeverity.Error,
      "Error while executing the fetch of Directions!"
    );
    return null;
  }
};
