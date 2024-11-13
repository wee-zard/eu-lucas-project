import { jwtDecode } from "jwt-decode";
import { googleLogout } from "@react-oauth/google";
import { getAuthToken, removeAuthToken } from "../helper/localStorageUtil";

export const guardGoogleAccount = () => {
  const isGoogleAccountProvided = () => {
    const googleOAuthToken = getAuthToken();
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
        removeAuthToken();
        googleLogout();
        /** TODO: User failed upon token validation! displaying error message */
      }
    } else {
      removeAuthToken();
      googleLogout();
      /** TODO: User failed upon token validation! displaying error message */
    }
  };

  return (
    isGoogleAccountProvided() ?? false
  );
};
