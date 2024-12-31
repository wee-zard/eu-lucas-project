import CoordinateYDto from "@model/dto/CoordinateYDto";
import {
  BackendCoordinateYControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import commandHandler from "@api/handler/requestHandler";

export const getCoordinateYList = async () => {
  return commandHandler<CoordinateYDto[]>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendCoordinateYControllerEndpoints.GetCoordinateYList,
    obj: {},
    header: {
      isAuthTokenNeeded: true,
    },
    errorMessage: "Error while executing the fetch of y coordinates!",
  });
};
