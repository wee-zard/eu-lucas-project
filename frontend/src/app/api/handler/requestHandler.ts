import axios from "axios";
import { RequestHeaderHandler } from "@api/handler/requestHeaderHandler";
import RequestCommand from "@model/RequestCommand";
import { ConversionUtils } from "@helper/conversionUtils";
import { LocalStorageKeys, RequestCommandTypes, UniqueErrorResponseTypes } from "@model/enum";
import RequestCommandError from "@model/error/RequestCommandError";
import getAuthToken from "@api/handler/requestAuthToken";
import handleNotificationThrowOfErrorMessage from "@api/handler/errorMessageHandler";
import { getNewAccessToken } from "@helper/authenticationUtils";
import { setLocalStorageItem } from "@helper/localStorageUtil";
import { RequestParamType } from "@model/types/RequestParamType";

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
  if (accessTokenResponse && accessTokenResponse !== UniqueErrorResponseTypes.UNAUTHORIZED) {
    // Set the new access token in the storage.
    // TODO: This should be saved in the db as well.
    setLocalStorageItem(accessTokenResponse.id_token, LocalStorageKeys.GoogleOAuthToken);

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
      return axios.get(
        initServerUrlPath(command, command.obj as RequestParamType[]),
        initRequestHeader(command, true),
      );
    case RequestCommandTypes.POST:
      return axios.post(initServerUrlPath(command), command.obj, initRequestHeader(command));
    case RequestCommandTypes.DELETE:
      return axios.delete(initServerUrlPath(command), initRequestHeader(command, true));
    case RequestCommandTypes.PUT:
      // TODO: Implement the put command method here...
      throw new RequestCommandError("Put request method have not been implemented yet!");
    default:
      throw new RequestCommandError("Request method type is not provided!");
  }
};

/**
 * Init the auth token of the request if it is requested.
 *
 * @param command A request command template which will be used to construct a new http request.
 * @returns Returns the auth token if it is required to send out by the {@link RequestCommand}.
 */
const initAuthToken = (command: RequestCommand) => {
  return command.header.isAuthTokenMandatory ? getAuthToken() : undefined;
};

/**
 * Init the server url path where the request will be sent out.
 *
 * @param command A request command template which will be used to construct a new http request.
 * @returns Returns the constructed server url path.
 */
const initServerUrlPath = (command: RequestCommand, requestParams?: RequestParamType[]) => {
  const endpoint = `${ConversionUtils.ServerConnectionToServerPath(command.server)}${command.endpoint}`;

  if (requestParams && requestParams.length > 0) {
    const requestParamPath = requestParams.map((item) => `${item.key}=${item.value}`).join("?");

    return `${endpoint}?${requestParamPath}`;
  }

  return `${endpoint}`;
};

/**
 * Init the header of the requests. Provides the params if the command states them
 * to be there.
 *
 * @param command A request command template which will be used to construct a new http request.
 * @param isParamProvided Tells whether the request contains request params or not.
 * @returns Returns an object that contains the header of the request.
 */
const initRequestHeader = (command: RequestCommand, isParamProvided: boolean = false) => {
  return {
    ...RequestHeaderHandler.getRequestHeader(
      initAuthToken(command),
      command.header.pageableProperties,
    ),
    param: isParamProvided ? (!!command.obj ? command.obj : undefined) : undefined,
  };
};

export default commandHandler;
