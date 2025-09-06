import i18n from "@i18n/i18nHandler";
import { SnackEnum } from "@model/enum/SnackEnum";
import { BaseErrorResponse } from "@model/response/BaseErrorResponse";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import { TranslateOptions } from "i18n-js/typings/typing";
import { toast } from "react-toastify";

export enum ToastSeverity {
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error",
}

/**
 * Throws a toast message with a default message.
 *
 * @param type The type of the severity.
 * @param message The message.
 * @param isNotThrowable Tells whether the message should be NOT thrown.
 */
export const throwNotification = (
  type: ToastSeverity,
  message: string,
  isNotThrowable?: boolean,
) => {
  if (isNotThrowable) {
    return;
  }

  const handler: GenericHandlerType<ToastSeverity, () => void> = {
    [ToastSeverity.Success]: () => toast.success(message),
    [ToastSeverity.Info]: () => toast.info(message),
    [ToastSeverity.Warning]: () => toast.warn(message),
    [ToastSeverity.Error]: () => toast.error(message),
  };
  handler[type]();
};

export const baseErrorResponseToErrorMessage = (
  baseError: BaseErrorResponse,
  isNotThrowable: boolean = false,
) => {
  const { key, param0, param1 } = baseError;
  const message = i18n.t(`errors.${key}`, { param0, param1 });
  throwNotification(ToastSeverity.Error, message, isNotThrowable);

  return message;
};

/**
 * Throws a new snackbar message with the provided enum. The message will be displayed
 * in the top right corner of the application, with the content of the enum. The enum holds
 * a path to the message that is stored inside the i18n folder.
 * The message is parsed by {@link i18n}, so it can be translated to the designated language.
 *
 * @param snack The message enum to display on the snackbar
 * @param options optional variables provided to the {@link i18n} function.
 */
export const openSnackbar = (snack: SnackEnum, options?: TranslateOptions): void => {
  throwNotificationBySnackEnum(snack, options);
};

const throwNotificationBySnackEnum = (snack: SnackEnum, options?: TranslateOptions) => {
  const message = i18n.t(snack, options);
  const throwSuccessToast = () => throwNotification(ToastSeverity.Success, message);
  const throwErrorToast = () => throwNotification(ToastSeverity.Error, message);
  const throwWarningToast = () => throwNotification(ToastSeverity.Warning, message);

  const handler: GenericHandlerType<SnackEnum, () => void> = {
    // Successful toast messages
    [SnackEnum.LOGS_ARE_DELETED]: () => throwSuccessToast(),
    [SnackEnum.REPORT_SENT_OUT]: () => throwSuccessToast(),
    [SnackEnum.UPLOADED_XML_FILES]: () => throwSuccessToast(),
    [SnackEnum.FOLDER_IS_CREATED]: () => throwSuccessToast(),
    [SnackEnum.IMAGES_TO_FOLDER]: () => throwSuccessToast(),
    [SnackEnum.FOLDER_IS_DELETED]: () => throwSuccessToast(),
    [SnackEnum.FOLDER_IS_CLEARED]: () => throwSuccessToast(),
    [SnackEnum.IMAGE_SERVER_IS_TURNED_ON]: () => throwSuccessToast(),
    [SnackEnum.ZIP_DOWNLOADED]: () => throwSuccessToast(),

    // Error toast messages
    [SnackEnum.LOG_NOT_FOUND]: () => throwErrorToast(),
    [SnackEnum.REFRESH_TOKEN_IS_MISSING]: () => throwErrorToast(),
    [SnackEnum.ACCESS_TOKEN_IS_MISSING]: () => throwErrorToast(),
    [SnackEnum.CANNOT_SELECT_MORE_LOGS]: () => throwErrorToast(),
    [SnackEnum.REPORT_NOT_SENT_OUT]: () => throwErrorToast(),
    [SnackEnum.ERROR_ON_LOGIN]: () => throwErrorToast(),
    [SnackEnum.NO_IMAGE_TO_ADD_TO_FOLDER]: () => throwErrorToast(),
    [SnackEnum.ERROR_WHILE_DOWNLOADING_ZIP]: () => throwErrorToast(),
    [SnackEnum.UPLOADED_ERROR_NOTIFICATION]: () => throwErrorToast(),

    // Warning toast messages
    [SnackEnum.IMAGE_SERVER_IS_TURNED_ON_BUT_NOT_FOUND]: () => throwWarningToast(),
  };
  handler[snack]();
};
