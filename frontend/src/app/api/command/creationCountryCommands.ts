import CreationCountryDto from "@model/dto/CreationCountryDto";
import {
  BackendCreationCountryControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import commandHandler from "@api/handler/requestHandler";

export const getCreationCountries = async () => {
  return commandHandler<CreationCountryDto[]>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendCreationCountryControllerEndpoints.GetCreationCountries,
    obj: {},
    header: {
      isAuthTokenNeeded: true,
    },
    errorMessage: "Error while executing the fetch of creation Countries!",
  });
};
