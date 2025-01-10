import {
  BackendUserControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import commandHandler from "@api/handler/requestHandler";
import BaseResponse from "@model/response/BaseResponse";

export const validateEmailAddress = async () => {
  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.Backend,
    endpoint: BackendUserControllerEndpoints.ValidateEmail,
    obj: {},
    header: {
      isAuthTokenNeeded: true,
    },
    errorMessage: "Váratlan hiba történt a bejelentkezés során! Próbáld meg újra a bejelentkezést később!",
  });
};
