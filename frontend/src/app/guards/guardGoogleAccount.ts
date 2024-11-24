import { jwtDecode } from "jwt-decode";
import { getLocalStorageItem, removeLocalStorageItem } from "../helper/localStorageUtil";
import { LocalStorageKeys } from "../model/enum";
import { googleLogout } from "@react-oauth/google";
import { NotificationSeverity, throwNotification } from "../helper/notificationUtil";

export const guardGoogleAccount = () => {
  const googleOAuthToken = getLocalStorageItem(LocalStorageKeys.GoogleOAuthToken);
  if (googleOAuthToken) {
    const decoded = jwtDecode(googleOAuthToken);
    const currentTime = Math.floor(new Date().getTime()/1000);
    if (
      decoded.exp &&
      currentTime <= decoded.exp
    ) {
      return true;
    } else {
      removeLocalStorageItem(LocalStorageKeys.GoogleOAuthToken);
      googleLogout();
      throwNotification(NotificationSeverity.Error, "Hiba! A Google OAuth Token lejárt! Kérem jelentkezzen be újra!")
      return false;
    }
  } else {
    removeLocalStorageItem(LocalStorageKeys.GoogleOAuthToken);
    googleLogout();
    throwNotification(NotificationSeverity.Error, "Hiba! A Google OAuth Token nem található! Kérem jelentkezzen be újra!")
    return false;
  }
};
