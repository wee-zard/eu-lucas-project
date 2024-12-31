import {
  BackendUserControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import commandHandler from "@api/handler/requestHandler";

export const validateEmailAddress = async () => {
  return commandHandler<any>({
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
