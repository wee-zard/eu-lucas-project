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
      /** TODO: Display error message popup */
      console.error(response.data.message);
      return null;
    }
    return true;
  } catch (error) {
    /** TODO: Display error message popup */
    console.error(error);
    return null;
  }
};
