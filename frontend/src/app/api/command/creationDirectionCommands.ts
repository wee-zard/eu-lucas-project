import CreationDirectionDto from "@model/dto/CreationDirectionDto";
import {
  BackendCreationDirectionControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import commandHandler from "@api/handler/requestHandler";

export const getCreationDirections = async () => {
  return commandHandler<CreationDirectionDto[]>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendCreationDirectionControllerEndpoints.GetCreationDirections,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
    },
  });
};
