import CreationYearDto from "@model/dto/CreationYearDto";
import {
  BackendCreationYearControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import commandHandler from "@api/handler/requestHandler";

export const getCreationYears = async () => {
  return commandHandler<CreationYearDto[]>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendCreationYearControllerEndpoints.GetCreationYears,
    obj: {},
    header: {
      isAuthTokenNeeded: true,
    },
    errorMessage: "Error while executing the fetch of creation years command!",
  });
};
