import {
  NotificationSeverity,
  throwNotification,
} from "../../helper/notificationUtil";
import CreationCountryDto from "../../model/dto/CreationCountryDto";
import {
  BackendCreationCountryControllerEndpoints,
  ServersToConnectTo,
} from "../../model/enum";
import { getAuthToken } from "../handler/requestAuthToken";
import { getCommand } from "../handler/requestHandler";

export const getCreationCountries = async () => {
  try {
    const authToken = getAuthToken();
    if (!authToken) {
      return null;
    }
    const response = await getCommand(
      ServersToConnectTo.Backend,
      BackendCreationCountryControllerEndpoints.GetCreationCountries,
      {},
      authToken
    );
    if (response.status !== 200) {
      throwNotification(NotificationSeverity.Error, response.data.message);
      return null;
    }
    const listOfCreationYears: CreationCountryDto[] = response.data;
    return listOfCreationYears;
  } catch (error) {
    throwNotification(
      NotificationSeverity.Error,
      "Error while executing the fetch of creation Countries!"
    );
    return null;
  }
};
