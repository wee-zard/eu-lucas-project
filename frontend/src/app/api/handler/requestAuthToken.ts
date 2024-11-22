import { getLocalStorageItem } from "../../helper/localStorageUtil";
import { NotificationSeverity, throwNotification } from "../../helper/notificationUtil";
import { LocalStorageKeys } from "../../model/enum";

export const getAuthToken = () => {
    const authToken = getLocalStorageItem(LocalStorageKeys.GoogleOAuthToken);
    if (!authToken) {
      throwNotification(
        NotificationSeverity.Error,
        "Error! Authentication token is not found!"
      );
      return null;
    }
    return authToken;
}
