import axios from "axios";
import { RequestHeaderHandler } from "@api/handler/requestHeaderHandler";
import RequestCommand from "@model/RequestCommand";
import { ConversionUtils } from "@helper/conversionUtils";
import {
  LocalStorageKeys,
  RequestCommandTypes,
  UniqueErrorResponseTypes,
} from "@model/enum";
import RequestCommandError from "@model/error/RequestCommandError";
import getAuthToken from "@api/handler/requestAuthToken";
import handleNotificationThrowOfErrorMessage from "@api/handler/errorMessageHandler";
import { getNewAccessToken } from "@helper/authenticationUtils";
import { setLocalStorageItem } from "@helper/localStorageUtil";

/**
 * Try to send out the request to the server. If the response is an object or null,
 * that it will return to the sender. If the response is an 'Unauthorized' message, then
 * it will resend the request, after updating the access token of the user by the refresh token.
 *
 * @param command A request command template which will be used to construct a new http request.
 * @param T The set result type of the {@link axios} response.
 * @returns Returns
 */
const commandHandler = async <T>(command: RequestCommand) => {
  const response = await genericDispatcher<T>(command);
  return response === UniqueErrorResponseTypes.UNAUTHORIZED
    ? await handleUnauthorizedError<T>(command)
    : response;
};

const handleUnauthorizedError = async <T>(command: RequestCommand) => {
  // Authentication failed, we need to update the access token by the refresh token
  const accessTokenResponse = await getNewAccessToken();
  if (
    accessTokenResponse &&
    accessTokenResponse !== UniqueErrorResponseTypes.UNAUTHORIZED
  ) {
    // Set the new access token in the storage.
    // TODO: This should be saved in the db as well.
    setLocalStorageItem(
      accessTokenResponse.id_token,
      LocalStorageKeys.GoogleOAuthToken
    );

    // Resend the request to the server by the provided command and return the final results.
    const response = await genericDispatcher<T>(command);
    return response === UniqueErrorResponseTypes.UNAUTHORIZED ? null : response;
  } else {
    return null;
  }
};

/**
 * A dispatcher that based on the generic type,
 * will return the http response data.
 *
 * Sends out a http request and returns a T type of object or list of objects.
 *
 * @param command A request command template which will be used to construct a new http request.
 * @param T The set result type of the {@link axios} response.
 * @returns Returns
 */
export const genericDispatcher = async <T>(command: RequestCommand) => {
  try {
    const response = await commandHandlerDispatcher(command);
    //handleResponseStatus(response);
    const resultObj: T = response.data;
    return resultObj;
  } catch (error) {
    return handleNotificationThrowOfErrorMessage(error, command.errorMessage);
  }
};

/**
 * Based on the {@link RequestCommandTypes} attribute of the {@link RequestCommand},
 * the method will call the corresponding request command and send out a
 * http request with the provided command template.
 *
 * @param command A request command template which will be used to construct a new http request.
 * @returns Returns the response of the {@link axios} request.
 */
const commandHandlerDispatcher = (command: RequestCommand) => {
  switch (command.type) {
    case RequestCommandTypes.GET:
      return getCommand(command);
    case RequestCommandTypes.POST:
      return postCommand(command);
    case RequestCommandTypes.DELETE:
      // TODO: Implement the delete command method here...
      throw new RequestCommandError(
        "Delete request method have not been implemented yet!"
      );
    case RequestCommandTypes.PUT:
      // TODO: Implement the put command method here...
      throw new RequestCommandError(
        "Put request method have not been implemented yet!"
      );
    default:
      throw new RequestCommandError("Request method type is not provided!");
  }
};

/**
 * Send out a get http request to the provided server, to the provided endpoint.
 * It is optionally carries the auth token of the currently logged-in user,
 * with their pageable properties.
 *
 * @param command A request command template which will be used to construct a
 * new http request.
 * @returns Returns the response of the {@link axios} request.
 */
const postCommand = (command: RequestCommand) => {
  const authToken = command.header.isAuthTokenNeeded
    ? getAuthToken()
    : undefined;
  return axios.post(
    `${ConversionUtils.ServerConnectionToServerPath(command.server)}${command.endpoint}`,
    command.obj,
    RequestHeaderHandler.getRequestHeader(
      authToken,
      command.header.pageableProperties
    )
  );
};

/**
 * Send out a get http request to the provided server, to the provided endpoint.
 * It is optionally carries the auth token of the currently logged-in user,
 * with their pageable properties.
 *
 * @param command A request command template which will be used to construct a
 * new http request.
 * @returns Returns the response of the {@link axios} request.
 */
const getCommand = (command: RequestCommand) => {
  const authToken = command.header.isAuthTokenNeeded
    ? getAuthToken()
    : undefined;
  return axios.get(
    `${ConversionUtils.ServerConnectionToServerPath(command.server)}${command.endpoint}`,
    {
      ...RequestHeaderHandler.getRequestHeader(authToken),
      params: !!command.obj ? command.obj : undefined,
    }
  );
};

export default commandHandler;
