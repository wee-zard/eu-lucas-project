import ExifKeyDto from "@model/dto/ExifKeyDto";
import {
  BackendExifKeyControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import commandHandler from "@api/handler/requestHandler";

export const getExifKeyList = async () => {
  return commandHandler<ExifKeyDto[]>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendExifKeyControllerEndpoints.GetExifKeyList,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
    },
  });
};
