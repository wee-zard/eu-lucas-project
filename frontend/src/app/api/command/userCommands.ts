import {
  BackendUserControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import commandHandler from "@api/handler/requestHandler";
import BaseResponse from "@model/response/BaseResponse";
import UserStatusChangeRequest from "@model/request/UserStatusChangeRequest";
import UserToolpadSessionResponse from "@model/response/UserToolpadSessionResponse";
import UserDto from "@model/dto/UserDto";
import { UserCreationRequest } from "@model/request/UserCreationRequest";
import { RequestParamType } from "@model/types/RequestParamType";

export const createUserCommand = (request: UserCreationRequest[]): Promise<BaseResponse> => {
  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.Backend,
    endpoint: BackendUserControllerEndpoints.CreateUser,
    obj: request,
    header: {
      isAuthTokenMandatory: true,
    },
  });
};

export const activateUserCommand = (request: UserStatusChangeRequest) => {
  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.Backend,
    endpoint: BackendUserControllerEndpoints.ActivateUser,
    obj: request,
    header: {
      isAuthTokenMandatory: true,
    },
  });
};

export const getToolpadSessionCommand = () => {
  return commandHandler<UserToolpadSessionResponse>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendUserControllerEndpoints.ToolpadSession,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
    },
  });
};

export const getUsersCommand = () => {
  return commandHandler<UserDto[]>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendUserControllerEndpoints.Users,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
    },
  });
};

export const deleteUserById = (userId: number) => {
  const obj: RequestParamType = {
    key: "id",
    value: `${userId}`,
  };

  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.DELETE,
    server: ServersToConnectTo.Backend,
    endpoint: BackendUserControllerEndpoints.DeleteUser,
    obj: [obj],
    header: {
      isAuthTokenMandatory: true,
    },
  });
};

export const reactivateDeletedUserByIdCommand = (userId: number) => {
  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.Backend,
    endpoint: BackendUserControllerEndpoints.ActivateDeleted,
    obj: { id: userId },
    header: {
      isAuthTokenMandatory: true,
    },
  });
};
