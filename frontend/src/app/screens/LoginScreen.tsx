import React, { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { LocalStorageKeys, ScreenUrls } from "../model/enum";
import { redirectToUrl } from "../providers/RedirectionProvider";
import { validateEmailAddress } from "../api/command/userCommands";
import { getAuthToken } from "../helper/localStorageUtil";

const LoginScreen = () => {

  const handleLogin = (credential: string) => {
    localStorage.setItem(LocalStorageKeys.GoogleOAuthToken, credential);
  };

  useEffect(() => {
    const credential = getAuthToken();
    if (credential) {
      /**
       * If user has a Google OAuth Cookie, then redirect to the Lucas site.
       * When arriving to the site, an automatic guard will run to check
       * if the user has a valid, non-expired token.
       * If the token expired, then the cookie will be deleted there, and
       * the user will be redirected to this place again.
       */
      redirectToUrl(ScreenUrls.LucasScreenPath);
    }
  }, []);

  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          /** The credentialResponse is a jwt token */
          if (credentialResponse?.credential) {
            validateEmailAddress(credentialResponse.credential).then(
              (isEmailValid) => {
                if (isEmailValid && credentialResponse?.credential) {
                  handleLogin(credentialResponse.credential);
                  redirectToUrl(ScreenUrls.LucasScreenPath);
                } else {
                  /** TODO: Throw error in the page. */
                  console.error("[GoogleLogin onError]: Login Failed");
                }
              }
            );
          }
        }}
        onError={() => {
          /** TODO: Throw error in the page. */
          console.error("[GoogleLogin onError]: Login Failed");
        }}
      />
    </div>
  );
};

export default LoginScreen;
