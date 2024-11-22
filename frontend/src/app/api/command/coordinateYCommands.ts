import {
  NotificationSeverity,
  throwNotification,
} from "../../helper/notificationUtil";
import CoordinateYDto from "../../model/dto/CoordinateYDto";
import {
  BackendCoordinateYControllerEndpoints,
  ServersToConnectTo,
} from "../../model/enum";
import { getAuthToken } from "../handler/requestAuthToken";
import { getCommand } from "../handler/requestHandler";

export const getCoordinateYList = async () => {
  try {
    const authToken = getAuthToken();
    if (!authToken) {
      return null;
    }
    const response = await getCommand(
      ServersToConnectTo.Backend,
      BackendCoordinateYControllerEndpoints.GetCoordinateYList,
      {},
      authToken
    );
    if (response.status !== 200) {
      throwNotification(NotificationSeverity.Error, response.data.message);
      return null;
    }
    const listOfCreationYears: CoordinateYDto[] = response.data;
    return listOfCreationYears;
  } catch (error) {
    throwNotification(
      NotificationSeverity.Error,
      "Error while executing the fetch of y coordinates!"
    );
    return null;
  }
};
