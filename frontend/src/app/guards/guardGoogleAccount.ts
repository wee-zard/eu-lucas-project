import { jwtDecode } from "jwt-decode";
import { getLocalStorageItem, removeLocalStorageItem } from "@helper/localStorageUtil";
import { LocalStorageKeys } from "@model/enum";
import { googleLogout } from "@react-oauth/google";
import { NotificationSeverity, throwNotification } from "@helper/notificationUtil";

const guardGoogleAccount = (isNullable: boolean) => {
  const googleOAuthToken = getLocalStorageItem(LocalStorageKeys.GoogleOAuthToken);
  // Checks if the auth token is exists in the storage.
  if (!googleOAuthToken) {
    const message = "Hiba! A Google OAuth Token nem található! Kérem jelentkezzen be újra!";
    emptyOutTheLocalStorageCell(isNullable, message);
    return false;
  }
  const decoded = jwtDecode(googleOAuthToken);
  const currentTime = Math.floor(new Date().getTime()/1000);
  if (
    decoded.exp &&
    currentTime <= decoded.exp
  ) {
    return true;
  } else {
    const message = "Hiba! A Google OAuth Token lejárt! Kérem jelentkezzen be újra!";
    emptyOutTheLocalStorageCell(isNullable, message);
    return false;
  }
};

const emptyOutTheLocalStorageCell = (isNullable: boolean, message: string) => {
  removeLocalStorageItem(LocalStorageKeys.GoogleOAuthToken);
  googleLogout();
  if (!isNullable) {
    throwNotification(NotificationSeverity.Error, message);
  }
}

export default guardGoogleAccount;
