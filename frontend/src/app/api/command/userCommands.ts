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

export const validateEmailAddress = (): Promise<BaseResponse> => {
  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.Backend,
    endpoint: BackendUserControllerEndpoints.ValidateEmail,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
    },
    errorMessage:
      "Váratlan hiba történt az email cím ellenőrzése során! Próbáld meg újra a bejelentkezést!",
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
    errorMessage: "Váratlan hiba történt a felhasználó aktiválása során!",
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
    errorMessage: "Felhasználóhoz tartozó session nem elérhető a szerveren!",
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
    errorMessage: "Felhasználók lekérése nem sikerült egy váratlan hiba miat!",
  });
};
