import {
  NotificationSeverity,
  throwNotification,
} from "@helper/notificationUtil";
import LoginAuthenticationError from "@model/error/LoginAuthenticationError";
import RequestCommandError from "@model/error/RequestCommandError";

/**
 * Handle the throw of error messages to the user in a form of popup,
 * while giving back null.
 * 
 * @param error The error object that could be any {@link Error} type of object.
 * @param axiosErrorMessage The base error message of the command.
 * @returns Returns null and throw a notification about the error message to the user.
 */
export const handleNotificationThrowOfErrorMessage = (
  error: any,
  axiosErrorMessage: string
) => {
  if (
    error instanceof LoginAuthenticationError ||
    error instanceof RequestCommandError
  ) {
    throwNotification(NotificationSeverity.Error, error.message);
  } else {
    throwNotification(NotificationSeverity.Error, axiosErrorMessage);
  }
  return null;
};

export default handleNotificationThrowOfErrorMessage;
