import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { LocalStorageKeys, ScreenUrls } from "../model/enum";
import { redirectToUrl } from "../providers/RedirectionProvider";
import { validateEmailAddress } from "../api/command/userCommands";
import {
  NotificationSeverity,
  throwNotification,
} from "../helper/notificationUtil";

const LoginScreen = () => {
  const handleLogin = (credential: string) => {
    localStorage.setItem(LocalStorageKeys.GoogleOAuthToken, credential);
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse?.credential) {
            validateEmailAddress(credentialResponse.credential).then(
              (isEmailValid) => {
                if (isEmailValid && credentialResponse?.credential) {
                  handleLogin(credentialResponse.credential);
                  redirectToUrl(ScreenUrls.LucasScreenPath);
                }
              }
            );
          }
        }}
        onError={() => {
          throwNotification(
            NotificationSeverity.Error,
            "Hiba! Bejelentkezést nem sikerült!"
          );
        }}
      />
    </div>
  );
};

export default LoginScreen;
