import CoordinateXDto from "@model/dto/CoordinateXDto";
import {
  BackendCoordinateXControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import commandHandler from "@api/handler/requestHandler";

export const getCoordinateXList = async () => {
  return commandHandler<CoordinateXDto[]>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendCoordinateXControllerEndpoints.GetCoordinateXList,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
    },
    errorMessage: "Error while executing the fetch of x coordinates!",
  });
};
