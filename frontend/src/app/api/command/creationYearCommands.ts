import { getAuthToken } from "../../helper/localStorageUtil";
import CreationYearDto from "../../model/CreationYearDto";
import {
  BackendCreationYearControllerEndpoints,
  ServersToConnectTo,
} from "../../model/enum";
import { getCommand } from "../handler/requestHandler";

export const getCreationYears = async () => {
  try {
    const authToken = getAuthToken();
    if (!authToken) {
      return null;
    }
    const response = await getCommand(
      ServersToConnectTo.Backend,
      BackendCreationYearControllerEndpoints.GetCreationYears,
      {},
      authToken
    );
    if (response.status !== 200) {
      /** TODO: Display error message popup */
      console.error(response.data.message);
      return null;
    }
    const listOfCreationYears: CreationYearDto[] = response.data;
    return listOfCreationYears;
  } catch (error) {
    /** TODO: Display error message popup */
    console.error(error);
    return null;
  }
};
