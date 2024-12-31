import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { LocalStorageKeys, ScreenUrls } from "@model/enum";
import { redirectToUrl } from "@providers/RedirectionProvider";
import { validateEmailAddress } from "@api/command/userCommands";

const LoginScreen = () => {
  const handleLogin = (credential?: string) => {
    if (credential) {
      localStorage.setItem(LocalStorageKeys.GoogleOAuthToken, credential);
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleLogin(credentialResponse.credential);
          if (credentialResponse?.credential) {
            validateEmailAddress().then((isEmailValid) => {
              if (isEmailValid && credentialResponse?.credential) {
                handleLogin(credentialResponse.credential);
                redirectToUrl(ScreenUrls.LucasScreenPath);
              }
            });
          }
        }}
      />
    </div>
  );
};

export default LoginScreen;
