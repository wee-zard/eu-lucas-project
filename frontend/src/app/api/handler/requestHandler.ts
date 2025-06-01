import axios from "axios";
import RequestCommand from "@model/RequestCommand";
import { ConversionUtils } from "@helper/conversionUtils";
import { RequestCommandTypes, UniqueErrorResponseTypes } from "@model/enum";
import RequestCommandError from "@model/error/RequestCommandError";
import { RequestParamType } from "@model/types/RequestParamType";
import ErrorMessageHandler from "./errorMessageHandler";
import RequestHeaderHandler from "./requestHeaderHandler";
import { clearLocalStorage } from "@helper/localStorageUtil";

/**
 * Try to send out the request to the server. If the response is an object or null,
 * that it will return to the sender. If the response is an 'Unauthorized' message, then
 * it will resend the request, after updating the access token of the user by the refresh token.
 *
 * @param command A request command template which will be used to construct a new http request.
 * @returns Returns
 */
const commandHandler = <T>(command: RequestCommand): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    // Send out the first request to the server.
    genericDispatcher<T>(command)
      .then(resolve)
      .catch((error) => {
        const isUnauthorizedError = ErrorMessageHandler.throwNotificationByErrorType(
          error,
          command.errorMessage,
        );

        if (isUnauthorizedError === UniqueErrorResponseTypes.UNAUTHORIZED) {
          ErrorMessageHandler.handleUnauthorizedError<T>(command)
            .then(resolve)
            .catch(() => {
              // If you got a 2nd unauthorized request, then you are denied to use the application.
              reject(error.response.data.detail);
              clearLocalStorage();
            });
        } else {
          console.error(error);
          reject(error);
        }
      });
  });
};

/**
 * A dispatcher that based on the generic type
 * will return the http response data.
 *
 * Sends out an http request and returns a T type of object or list of objects.
 *
 * @param command A request command template which will be used to construct a new http request.
 * @returns Returns
 */
export const genericDispatcher = <T>(command: RequestCommand): Promise<T> => {
  return new Promise((resolve, reject) => {
    commandHandlerDispatcher(command)
      .then((response) => resolve(response.data))
      .catch(reject);
  });
};

/**
 * Based on the {@link RequestCommandTypes} attribute of the {@link RequestCommand},
 * the method will call the corresponding request command and send out an
 * http request with the provided command template.
 *
 * @param command A request command template which will be used to construct a new http request.
 * @returns Returns the response of the {@link axios} request.
 */
const commandHandlerDispatcher = (command: RequestCommand) => {
  switch (command.type) {
    case RequestCommandTypes.GET:
      return axios.get(
        initServerUrlPath(command),
        RequestHeaderHandler.initRequestHeader(command, true),
      );
    case RequestCommandTypes.POST:
      return axios.post(
        initServerUrlPath(command),
        command.obj,
        RequestHeaderHandler.initRequestHeader(command),
      );
    case RequestCommandTypes.DELETE:
      return axios.delete(
        initServerUrlPath(command),
        RequestHeaderHandler.initRequestHeader(command, true),
      );
    case RequestCommandTypes.PUT:
      // TODO: Implement the put command method here...
      throw new RequestCommandError("Put request method have not been implemented yet!");
    default:
      throw new RequestCommandError("Request method type is not provided!");
  }
};

const getRequestParamPath = (requestParams: unknown) => {
  return Array.isArray(requestParams)
    ? requestParams.map((item: RequestParamType) => `${item.key}=${item.value}`).join("?")
    : "";
};

/**
 * Init the server url path where the request will be sent out.
 *
 * @param command A request command template which will be used to construct a new http request.
 * @returns Returns the constructed server url path.
 */
const initServerUrlPath = (command: RequestCommand) => {
  const endpoint = `${ConversionUtils.ServerConnectionToServerPath(command.server)}${command.endpoint}`;
  const requestParams = command.obj;

  return command.type === RequestCommandTypes.GET
    ? `${endpoint}?${getRequestParamPath(requestParams)}`
    : `${endpoint}`;
};

export default commandHandler;
