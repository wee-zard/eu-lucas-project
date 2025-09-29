import {
  BackendExifDataControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import commandHandler from "@api/handler/requestHandler";
import { RequestParamType } from "@model/types/RequestParamType";

export const getExifDataListByExifKey = async (keyId: number): Promise<string[]> => {
  const requestParamType: RequestParamType[] = [
    {
      key: "keyId",
      value: `${keyId}`,
    },
  ];

  return commandHandler<string[]>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendExifDataControllerEndpoints.GetExifDataList,
    obj: requestParamType,
    header: {
      isAuthTokenMandatory: true,
    },
  });
};
