import { getLocalStorageItem } from "../../helper/localStorageUtil";
import {
  NotificationSeverity,
  throwNotification,
} from "../../helper/notificationUtil";
import CoordinateXDto from "../../model/dto/CoordinateXDto";
import {
  BackendCoordinateXControllerEndpoints,
  LocalStorageKeys,
  ServersToConnectTo,
} from "../../model/enum";
import { getCommand } from "../handler/requestHandler";

export const getCoordinateXList = async () => {
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
      BackendCoordinateXControllerEndpoints.GetCoordinateXList,
      {},
      authToken
    );
    if (response.status !== 200) {
      throwNotification(NotificationSeverity.Error, response.data.message);
      return null;
    }
    const listOfCreationYears: CoordinateXDto[] = response.data;
    return listOfCreationYears;
  } catch (error) {
    throwNotification(
      NotificationSeverity.Error,
      "Error while executing the fetch of x coordinates!"
    );
    return null;
  }
};
