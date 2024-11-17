import { toast } from "react-toastify";

export enum NotificationSeverity {
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error",
}

export type NotificationObj = {
  type: NotificationSeverity;
  message: string;
};

export const throwNotification = (
  type: NotificationSeverity,
  message: string
) => {
  const handler = Object.freeze({
    [NotificationSeverity.Success]: () => toast.success(message),
    [NotificationSeverity.Info]: () => toast.info(message),
    [NotificationSeverity.Warning]: () => toast.warn(message),
    [NotificationSeverity.Error]: () => toast.error(message),
  });
  handler[type].call(() => null);
};
