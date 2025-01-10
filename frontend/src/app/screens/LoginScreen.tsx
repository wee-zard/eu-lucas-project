import React, { useState } from "react";
import {
  CodeResponse,
  useGoogleLogin,
} from "@react-oauth/google";
import { LocalStorageKeys, ScreenUrls } from "@model/enum";
import { redirectToUrl } from "@providers/RedirectionProvider";
import { validateEmailAddress } from "@api/command/userCommands";
import { styled } from "@mui/material";
import { getRefreshToken } from "@helper/authenticationUtils";
import { ReactComponent as GoogleLoginIcon } from "@media/google-login.svg";
import {
  NotificationSeverity,
  throwNotification,
} from "@helper/notificationUtil";
import { setLocalStorageItem } from "@helper/localStorageUtil";
import StyledButton from "@components/StyledButton";
import StyledBackdrop from "@components/StyledBackdrop";

const LoginScreen = () => {
  const [isBackdropOpen, setBackdropOpen] = useState(false);

  const handleEmailValidation = () => {
    validateEmailAddress().then((isEmailValid) => {
      if (isEmailValid) {
        redirectToUrl(ScreenUrls.LucasScreenPath);
      }
    }).finally(() => setBackdropOpen(false));
  };

  const handleRefreshTokenFetch = (
    success: Omit<CodeResponse, "error" | "error_description" | "error_uri">
  ) => {
    getRefreshToken(success.code, (res) => {
      setBackdropOpen(true);
      setLocalStorageItem(res.id_token, LocalStorageKeys.GoogleOAuthToken);
      setLocalStorageItem(
        res.refresh_token,
        LocalStorageKeys.GoogleRefreshToken
      );
      handleEmailValidation();
    });
  };

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: handleRefreshTokenFetch,
    onError: () =>
      throwNotification(
        NotificationSeverity.Error,
        "Hiba! Bejelentkezés sikertelen!"
      ),
  });

  // log out function to log the user out of google and set the profile array to null
  /*
  const logOut = () => {
    googleLogout();
  };
  */

  return (
    <StyledGoogleAuthHolder>
      <StyledButton 
        buttonText={"Jelentkezz be Google fiókkal"}
        buttonVariant={"outlined"}
        buttonIcon={<GoogleLoginIcon width={20} />}
        onClick={googleLogin}
      />
      <StyledBackdrop isBackdropOpen={isBackdropOpen}/>
    </StyledGoogleAuthHolder>
  );
};

export default LoginScreen;

const StyledGoogleAuthHolder = styled("div")<{}>((props) => ({
  display: "flex",
  justifyContent: "center",
}));
