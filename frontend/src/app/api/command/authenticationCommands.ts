import {
  BackendAuthenticationEndpoints,
  GoogleTokenEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import commandHandler from "@api/handler/requestHandler";
import AuthorizationModel from "@model/AuthorizationModel";
import NewAccessTokenPayloadRequest from "@model/request/NewAccessTokenPayloadRequest";
import AuthenticatedUserResponse from "@model/response/AuthenticatedUserResponse";

export const validateEmailAddress = (): Promise<AuthenticatedUserResponse> => {
  return commandHandler<AuthenticatedUserResponse>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.Backend,
    endpoint: BackendAuthenticationEndpoints.Validate,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
    },
  });
};

export const getNewAccessTokenCommand = (payload: NewAccessTokenPayloadRequest) => {
  return commandHandler<AuthorizationModel>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.GoogleServer,
    endpoint: GoogleTokenEndpoints.Token,
    obj: payload,
    header: {
      isAuthTokenMandatory: true,
    },
  });
};
