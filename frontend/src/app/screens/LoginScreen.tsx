import React from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { LocalStorageKeys, ScreenUrls } from "@model/enum";
import { redirectToUrl } from "@providers/RedirectionProvider";
import { validateEmailAddress } from "@api/command/userCommands";

const LoginScreen = () => {
  const handleLogin = (credential: string) => {
    localStorage.setItem(LocalStorageKeys.GoogleOAuthToken, credential);
  };

  const handleSuccessfulLogin = (credentialResponse: CredentialResponse) => {
    if (credentialResponse?.credential) {
      handleLogin(credentialResponse.credential);
      validateEmailAddress().then((isEmailValid) => {
        if (isEmailValid && credentialResponse?.credential) {
          redirectToUrl(ScreenUrls.LucasScreenPath);
        }
      });
    }
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleSuccessfulLogin} />
    </div>
  );
};

export default LoginScreen;
