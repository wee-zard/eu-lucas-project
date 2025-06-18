import commandHandler from "@api/handler/requestHandler";
import {
  BackendFolderControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import FolderCreationRequest from "@model/request/FolderCreationRequest";
import BaseResponse from "@model/response/BaseResponse";

export const createNewFolderCommand = (request: FolderCreationRequest): Promise<BaseResponse> => {
  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.Backend,
    endpoint: BackendFolderControllerEndpoints.CreateFolder,
    obj: request,
    header: {
      isAuthTokenMandatory: true,
    },
    errorMessage: "Váratlan hiba történt az új mappa létrehozása során!",
  });
};
