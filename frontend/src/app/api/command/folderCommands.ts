import commandHandler from "@api/handler/requestHandler";
import FolderDto from "@model/dto/FolderDto";
import {
  BackendFolderControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import { FolderCreationRequest } from "@model/forms/FolderCreationFormGroup";
import PageableProperties from "@model/PageableProperties";
import BaseResponse from "@model/response/BaseResponse";
import PageableResponse from "@model/response/PageableResponse";

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

export const getFoldersCommand = (
  pageableProperties: PageableProperties,
): Promise<PageableResponse<FolderDto>> => {
  return commandHandler<PageableResponse<FolderDto>>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendFolderControllerEndpoints.GetFolders,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
      pageableProperties: pageableProperties,
    },
    errorMessage: "Váratlan hiba történt a felhasználó mappáinak lekérése során!",
  });
};
