import commandHandler from "@api/handler/requestHandler";
import {
  BackendFolderContentControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import {
  FolderCreationRequest,
  FolderImageAdditionRequest,
} from "@model/forms/FolderCreationFormGroup";
import PageableProperties from "@model/PageableProperties";
import BaseResponse from "@model/response/BaseResponse";
import PageableResponse from "@model/response/PageableResponse";
import { QueriedImagePropertyType } from "@model/SelectedImagesModel";
import { RequestParamType } from "@model/types/RequestParamType";

export const getFolderContentByFolderIdCommand = (
  folderId: string | number,
  pageable: PageableProperties,
): Promise<PageableResponse<QueriedImagePropertyType>> => {
  return commandHandler<PageableResponse<QueriedImagePropertyType>>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendFolderContentControllerEndpoints.GetContentOfFolderById,
    obj: [
      {
        key: "folderId",
        value: folderId,
      } as RequestParamType,
    ],
    header: {
      isAuthTokenMandatory: true,
      pageableProperties: pageable,
    },
  });
};

export const createNewFolderCommand = (request: FolderCreationRequest): Promise<BaseResponse> => {
  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.Backend,
    endpoint: BackendFolderContentControllerEndpoints.CreateFolder,
    obj: request,
    header: {
      isAuthTokenMandatory: true,
    },
  });
};

export const imageToFolderCommand = (
  request: FolderImageAdditionRequest,
): Promise<BaseResponse> => {
  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.Backend,
    endpoint: BackendFolderContentControllerEndpoints.ImageToFolderAddition,
    obj: request,
    header: {
      isAuthTokenMandatory: true,
    },
  });
};

export const clearFolderCommand = (folderId: number): Promise<BaseResponse> => {
  const paramObj: RequestParamType[] = [
    {
      key: "folderId",
      value: `${folderId}`,
    },
  ];

  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.DELETE,
    server: ServersToConnectTo.Backend,
    endpoint: BackendFolderContentControllerEndpoints.ClearFolder,
    obj: paramObj,
    header: {
      isAuthTokenMandatory: true,
    },
  });
};

export const deleteFolderContentCommand = (
  folderId: number,
  imageId: number,
): Promise<BaseResponse> => {
  const paramObj: RequestParamType[] = [
    {
      key: "folderId",
      value: `${folderId}`,
    },
    {
      key: "imageId",
      value: `${imageId}`,
    },
  ];

  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.DELETE,
    server: ServersToConnectTo.Backend,
    endpoint: BackendFolderContentControllerEndpoints.DeleteFolderContent,
    obj: paramObj,
    header: {
      isAuthTokenMandatory: true,
    },
  });
};
