import commandHandler from "@api/handler/requestHandler";
import FolderDtoSlice from "@model/dto/FolderDtoSlice";
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
  });
};

export const getFoldersCommand = (
  pageableProperties: PageableProperties,
): Promise<PageableResponse<FolderDtoSlice>> => {
  return commandHandler<PageableResponse<FolderDtoSlice>>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendFolderControllerEndpoints.GetFolders,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
      pageableProperties: pageableProperties,
    },
  });
};

export const getOwnedAndSharedFoldersCommand = (): Promise<FolderDtoSlice[]> => {
  return commandHandler<FolderDtoSlice[]>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendFolderControllerEndpoints.GetFoldersByUserIdSortedByUpdatedAt,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
    },
  });
};
