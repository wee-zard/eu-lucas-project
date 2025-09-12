import axios, { AxiosResponse } from "axios";
import RequestCommand from "@model/RequestCommand";
import { ConversionUtils } from "@helper/conversionUtils";
import { LocalStorageKeys, RequestCommandTypes, ScreenUrls } from "@model/enum";
import { RequestParamType } from "@model/types/RequestParamType";
import RequestHeaderHandler from "./requestHeaderHandler";
import { clearLocalStorage, setLocalStorageItem } from "@helper/localStorageUtil";
import { googleLogout } from "@react-oauth/google";
import { redirectToUrl } from "@providers/RedirectionProvider";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import {
  baseErrorResponseToErrorMessage,
  throwNotification,
  ToastSeverity,
} from "@helper/notificationUtil";
import { getNewAccessToken } from "@helper/authenticationUtils";
import i18n from "@i18n/i18nHandler";

const serverErrorMessage = i18n.t("errors.INTERNAL_SERVER_ERROR");

/**
 * Try to send out the request to a server described in the command. If the response is an object or null,
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
        if (error?.status !== 401) {
          const errorMessage = error?.response?.data?.detail;
          throwErrorNotification(command, error);
          reject(errorMessage ?? serverErrorMessage);
        } else {
          handleUnauthorizedError<T>(command)
            .then(resolve)
            .catch((error2) => {
              // Error occurred during the 2nd api request. Display an error message and terminate the process.
              throwErrorNotification(command, error2);
              reject(error2?.response?.data?.detail ?? serverErrorMessage);

              // If you got a 2nd unauthorized request, then you are denied to use the application.
              clearLocalStorage();
              googleLogout();
              redirectToUrl(ScreenUrls.LoginScreenPath);
            });
        }
      });
  });
};

/**
 * Unauthorized error status has been sent back from the server and because of that,
 * this method request a new access token based on the refresh token.
 *
 * @param command A request command template which will be used to construct a new http request.
 * @returns
 */
const handleUnauthorizedError = <T>(command: RequestCommand): Promise<T> => {
  return new Promise((resolve, reject) => {
    // Authentication failed, we need to update the access token by the refresh token
    getNewAccessToken()
      .then((accessTokenResponse) => {
        // Set the new access token in the storage.
        setLocalStorageItem(accessTokenResponse.id_token, LocalStorageKeys.GoogleOAuthToken);

        // Resend the request to the server by the provided command and return the final results.
        genericDispatcher<T>(command).then(resolve).catch(reject);
      })
      // New access token cannot be fetched or an unknown error occurred while fetching a new one.
      .catch(reject);
  });
};

const throwErrorNotification = (command: RequestCommand, error: any) => {
  const errorMessage = error?.response?.data?.detail;

  errorMessage
    ? baseErrorResponseToErrorMessage(JSON.parse(errorMessage), command.isToastHidden)
    : throwNotification(ToastSeverity.Error, serverErrorMessage, command.isToastHidden);
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
const genericDispatcher = <T>(command: RequestCommand): Promise<T> => {
  return new Promise((resolve, reject) => {
    axiosRequestHandler[command.type](command)
      .then((response) => resolve(response.data))
      .catch(reject);
  });
};

/**
 * Based on the {@link RequestCommandTypes} attribute of the {@link RequestCommand},
 * the method will call the corresponding request command and send out an
 * http request with the provided command template.
 *
 * @returns Returns the response of the {@link axios} request.
 */
const axiosRequestHandler: GenericHandlerType<
  RequestCommandTypes,
  (command: RequestCommand) => Promise<AxiosResponse<any, any>>
> = {
  [RequestCommandTypes.GET]: (command: RequestCommand) =>
    axios.get(initServerUrlPath(command), RequestHeaderHandler.initRequestHeader(command, true)),
  [RequestCommandTypes.POST]: (command: RequestCommand) =>
    axios.post(
      initServerUrlPath(command),
      command.obj,
      RequestHeaderHandler.initRequestHeader(command),
    ),
  [RequestCommandTypes.DELETE]: (command: RequestCommand) =>
    axios.delete(initServerUrlPath(command), RequestHeaderHandler.initRequestHeader(command, true)),
  [RequestCommandTypes.PUT]: (command: RequestCommand) =>
    axios.put(
      initServerUrlPath(command),
      command.obj,
      RequestHeaderHandler.initRequestHeader(command),
    ),
};

const getRequestParamPath = (command: RequestCommand) => {
  const allowedMethods = [RequestCommandTypes.POST, RequestCommandTypes.PUT];
  const isRequestParamNeeded = !allowedMethods.includes(command.type);
  const requestParams = command.obj;
  const requestParamPrefix = Array.isArray(requestParams) && requestParams.length > 0 ? "?" : "";
  const requestParam = Array.isArray(requestParams)
    ? requestParams.map((item: RequestParamType) => `${item.key}=${item.value}`).join("&")
    : "";

  return isRequestParamNeeded ? `${requestParamPrefix}${requestParam}` : "";
};

/**
 * Init the server url path where the request will be sent out.
 *
 * @param command A request command template which will be used to construct a new http request.
 * @returns Returns the constructed server url path.
 */
const initServerUrlPath = (command: RequestCommand) => {
  const endpoint = `${ConversionUtils.ServerConnectionToServerPath(command.server)}${command.endpoint}`;

  return `${endpoint}${getRequestParamPath(command)}`;
};

export default commandHandler;
