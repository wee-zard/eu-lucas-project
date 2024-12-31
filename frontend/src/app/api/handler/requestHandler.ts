import axios from "axios";
import { RequestHeaderHandler } from "@api/handler/requestHeaderHandler";
import RequestCommand from "@model/RequestCommand";
import { ConversionUtils } from "@helper/conversionUtils";
import { RequestCommandTypes } from "@model/enum";
import RequestCommandError from "@model/error/RequestCommandError";
import getAuthToken from "@api/handler/requestAuthToken";
import handleNotificationThrowOfErrorMessage from "@api/handler/errorMessageHandler";

/**
 * Sends out a http request and returns a T type of object or list of objects.
 *
 * @param command A request command template which will be used to construct a new http request.
 * @param T The set result type of the {@link axios} response.
 * @returns Returns
 */
async function commandHandler<T> (command: RequestCommand) {
  try {
    const response = await commandHandlerDispatcher(command);
    if (response.status !== 200) {
      // Server specific error message will be thrown here.
      throw new RequestCommandError(response.data.message);
    }
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
}

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
