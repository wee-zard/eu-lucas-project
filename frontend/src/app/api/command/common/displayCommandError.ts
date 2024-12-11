import { AxiosResponse } from "axios";
import { NotificationSeverity, throwNotification } from "../../../helper/notificationUtil";

export const handleErrorMessageFromAxiosResponse = (response: AxiosResponse<any, any>) => {
    if (response.status !== 200) {
        throwNotification(NotificationSeverity.Error, response.data.message);
        return false;
    }
    return true;
}

export const handleErrorMessageFromCatchBranch = (message: string) => {
    throwNotification(
        NotificationSeverity.Error,
        message
      );
}