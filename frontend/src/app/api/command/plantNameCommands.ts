import commandHandler from "@api/handler/requestHandler";
import {
  BackendPlantNameControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import BaseResponse from "@model/response/BaseResponse";

/**
 * Deletes all plant names from the server.
 */
export const deletePlantNameCommand = async () => {
  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.DELETE,
    server: ServersToConnectTo.Backend,
    endpoint: BackendPlantNameControllerEndpoints.DeletePlantNames,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
    },
    errorMessage: "Váratlan hiba történt a növények törlése során!",
  });
};
