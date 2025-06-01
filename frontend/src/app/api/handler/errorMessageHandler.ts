import { getNewAccessToken } from "@helper/authenticationUtils";
import { setLocalStorageItem } from "@helper/localStorageUtil";
import { ToastSeverity, throwNotification } from "@helper/notificationUtil";
import { LocalStorageKeys, UniqueErrorResponseTypes } from "@model/enum";
import LoginAuthenticationError from "@model/error/LoginAuthenticationError";
import RequestCommandError from "@model/error/RequestCommandError";
import RequestCommand from "@model/RequestCommand";
import { AxiosError } from "axios";
import { genericDispatcher } from "./requestHandler";

export default abstract class ErrorMessageHandler {
  /**
   * Handle the throw of error messages to the user in a form of popup
   * by matching which constructor of the class built the error object.
   *
   * @param error The error object that could be any {@link Error} type of object.
   * @param axiosErrorMessage The base error message of the command.
   */
  public static throwNotificationByErrorType = (error: any, axiosErrorMessage: string) => {
    // TODO: If any error is thrown from the server, then unauthorized error is thrown. It is not good. Change it later.
    switch (error.constructor) {
      case AxiosError:
        if (error.status === 401) {
          return UniqueErrorResponseTypes.UNAUTHORIZED;
        } else {
          throwNotification(ToastSeverity.Error, error.message);
          return null;
        }
      case LoginAuthenticationError:
      case RequestCommandError:
        throwNotification(ToastSeverity.Error, error.message);
        return null;
      default:
        throwNotification(ToastSeverity.Error, axiosErrorMessage);
        return null;
    }
  };

  public static handleUnauthorizedError = <T>(command: RequestCommand): Promise<T> => {
    return new Promise((resolve, reject) => {
      // Authentication failed, we need to update the access token by the refresh token
      getNewAccessToken()
        .then((accessTokenResponse) => {
          // Set the new access token in the storage.
          // TODO: This should be saved in the db as well.
          setLocalStorageItem(accessTokenResponse.id_token, LocalStorageKeys.GoogleOAuthToken);

          // Resend the request to the server by the provided command and return the final results.
          genericDispatcher<T>(command)
            .then(resolve)
            .catch(() => {
              // Error occurred during the 2nd api request. Display an error message and terminate the process.
              throwNotification(ToastSeverity.Error, command.errorMessage);
              reject();
            });
        })
        .catch(reject);
    });
  };
}
