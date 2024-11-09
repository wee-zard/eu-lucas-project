import { jwtDecode } from "jwt-decode";
import { CookiesTitle, ScreenUrls } from "../model/enum";
import { useCookies } from "react-cookie";
import { googleLogout } from "@react-oauth/google";
import { redirectToUrl } from "../providers/RedirectionProvider";

const useGoogleAccountGuard = () => {
  const cookieManager = useCookies([CookiesTitle.GoogleOAuthToken]);

  const isGoogleAccountProvided = () => {
    const googleCredential = cookieManager[0]?.google_oauth_token;
    if (googleCredential) {
      const decoded = jwtDecode(googleCredential);
      const currentTime = new Date().getTime();
      if (
        decoded?.iat &&
        decoded.exp &&
        decoded.iat <= currentTime &&
        currentTime <= decoded.exp
      ) {
        return true;
      } else {
        cookieManager[2](CookiesTitle.GoogleOAuthToken);
        googleLogout();
        /** TODO: User failed upon token validation! displaying error message */
        redirectToUrl(ScreenUrls.LoginScreenPath);
      }
    } else {
      /** TODO: User failed upon token validation! displaying error message */
      redirectToUrl(ScreenUrls.LoginScreenPath);
    }
  };

  return (
    isGoogleAccountProvided() ?? false
  );
};

export default useGoogleAccountGuard;
