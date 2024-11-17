import { jwtDecode } from "jwt-decode";
import { getLocalStorageItem, removeLocalStorageItem } from "../helper/localStorageUtil";
import { LocalStorageKeys } from "../model/enum";
import { googleLogout } from "@react-oauth/google";

export const guardGoogleAccount = () => {
  const isGoogleAccountProvided = () => {
    const googleOAuthToken = getLocalStorageItem(LocalStorageKeys.GoogleOAuthToken);
    if (googleOAuthToken) {
      const decoded = jwtDecode(googleOAuthToken);
      const currentTime = Math.floor(new Date().getTime()/1000);
      if (
        decoded?.iat &&
        decoded.exp &&
        decoded.iat <= currentTime &&
        currentTime <= decoded.exp
      ) {
        return true;
      } else {
        removeLocalStorageItem(LocalStorageKeys.GoogleOAuthToken);
        googleLogout();
        /** TODO: User failed upon token validation! displaying error message */
      }
    } else {
      removeLocalStorageItem(LocalStorageKeys.GoogleOAuthToken);
      googleLogout();
      /** TODO: User failed upon token validation! displaying error message */
    }
  };

  return (
    isGoogleAccountProvided() ?? false
  );
};
