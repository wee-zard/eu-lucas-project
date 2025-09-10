import commandHandler from "@api/handler/requestHandler";
import FolderDtoSlice from "@model/dto/FolderDtoSlice";
import {
  BackendFolderControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import {
  FolderCreationRequest,
  FolderImageAdditionRequest,
  FolderUpdateRequest,
} from "@model/forms/FolderCreationFormGroup";
import PageableProperties from "@model/PageableProperties";
import BaseResponse from "@model/response/BaseResponse";
import PageableResponse from "@model/response/PageableResponse";
import { RequestParamType } from "@model/types/RequestParamType";

export const updateFolderCommand = (request: FolderUpdateRequest): Promise<BaseResponse> => {
  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.Backend,
    endpoint: BackendFolderControllerEndpoints.UpdateFolder,
    obj: request,
    header: {
      isAuthTokenMandatory: true,
    },
  });
};

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

export const imageToFolderCommand = (
  request: FolderImageAdditionRequest,
): Promise<BaseResponse> => {
  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.Backend,
    endpoint: BackendFolderControllerEndpoints.ImageToFolderAddition,
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

export const deleteFolderCommand = (folderId: number): Promise<BaseResponse> => {
  const paramObj: RequestParamType[] = [
    {
      key: "folderId",
      value: `${folderId}`,
    },
  ];

  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.DELETE,
    server: ServersToConnectTo.Backend,
    endpoint: BackendFolderControllerEndpoints.DeleteFolder,
    obj: paramObj,
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
    endpoint: BackendFolderControllerEndpoints.ClearFolder,
    obj: paramObj,
    header: {
      isAuthTokenMandatory: true,
    },
  });
};
