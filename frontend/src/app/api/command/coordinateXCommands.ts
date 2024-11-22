import {
  NotificationSeverity,
  throwNotification,
} from "../../helper/notificationUtil";
import CoordinateXDto from "../../model/dto/CoordinateXDto";
import {
  BackendCoordinateXControllerEndpoints,
  ServersToConnectTo,
} from "../../model/enum";
import { getAuthToken } from "../handler/requestAuthToken";
import { getCommand } from "../handler/requestHandler";

export const getCoordinateXList = async () => {
  try {
    const authToken = getAuthToken();
    if (!authToken) {
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
