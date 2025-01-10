import {
  NotificationSeverity,
  throwNotification,
} from "@helper/notificationUtil";
import { UniqueErrorResponseTypes } from "@model/enum";
import LoginAuthenticationError from "@model/error/LoginAuthenticationError";
import RequestCommandError from "@model/error/RequestCommandError";
import { AxiosError, isAxiosError } from "axios";

/**
 * Handle the throw of error messages to the user in a form of popup
 * by matching which constructor of the class builded the error object.
 *
 * @param error The error object that could be any {@link Error} type of object.
 * @param axiosErrorMessage The base error message of the command.
 */
export const handleNotificationThrowOfErrorMessage = (
  error: any,
  axiosErrorMessage: string
) => {
  switch(error.constructor) {
    case AxiosError:
      if (isAxiosError(error) && error.status === 401) {
        return UniqueErrorResponseTypes.UNAUTHORIZED;
      } else {
        throwNotification(NotificationSeverity.Error, error.message);
        return null;
      }
    case LoginAuthenticationError:
    case RequestCommandError:
      throwNotification(NotificationSeverity.Error, error.message);
      return null;
    default:
      throwNotification(NotificationSeverity.Error, axiosErrorMessage);
      return null;
  }
};

export default handleNotificationThrowOfErrorMessage;
