import {
  NotificationSeverity,
  throwNotification,
} from "../../helper/notificationUtil";
import ExifKeyDto from "../../model/dto/ExifKeyDto";
import {
  BackendExifKeyControllerEndpoints,
  ServersToConnectTo,
} from "../../model/enum";
import { getAuthToken } from "../handler/requestAuthToken";
import { getCommand } from "../handler/requestHandler";

export const getExifKeyList = async () => {
  try {
    const authToken = getAuthToken();
    if (!authToken) {
      return null;
    }
    const response = await getCommand(
      ServersToConnectTo.Backend,
      BackendExifKeyControllerEndpoints.GetExifKeyList,
      {},
      authToken
    );
    if (response.status !== 200) {
      throwNotification(NotificationSeverity.Error, response.data.message);
      return null;
    }
    const listOfCreationYears: ExifKeyDto[] = response.data;
    return listOfCreationYears;
  } catch (error) {
    throwNotification(
      NotificationSeverity.Error,
      "Error while executing the fetch of exif keys!"
    );
    return null;
  }
};
