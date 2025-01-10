import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "@helper/localStorageUtil";
import { GuardResultTypes, LocalStorageKeys } from "@model/enum";
import { googleLogout } from "@react-oauth/google";
import {
  NotificationSeverity,
  throwNotification,
} from "@helper/notificationUtil";
import LoginAuthenticationError from "@model/error/LoginAuthenticationError";
import { validateEmailAddress } from "@api/command/userCommands";
import { useEffect, useState } from "react";

const accessTokenIsMissing = "Hiba! A Google Access Token nem található! Kérem jelentkezzen be újra!";
const refreshTokenIsMissing = "Hiba! A Google Refresh Token nem található! Kérem jelentkezzen be újra!";

export const useGoogleAccountGuard = (isOpen: boolean) => {
  const [result, setResult] = useState(GuardResultTypes.PENDING);

  /**
   * Checks if the auth token is exists in the storage.
   * @returns Returns the auth token.
   */
  const isAccessTokenExists = (): string => {
    const authToken = getLocalStorageItem(LocalStorageKeys.GoogleOAuthToken);
    if (!authToken) {
      throw new LoginAuthenticationError(accessTokenIsMissing);
    } else {
      return authToken;
    }
  };

  /**
   * Checks if the refresh token exists in the storage.
   */
  const isRefreshTokenExists = (): string => {
    const refreshToken = getLocalStorageItem(
      LocalStorageKeys.GoogleRefreshToken
    );
    // Checks if the auth token is exists in the storage.
    if (!refreshToken) {
      throw new LoginAuthenticationError(refreshTokenIsMissing);
    } else {
      return refreshToken;
    }
  };

  /**
   * Log out the user from the app and empty out the local storage.
   *
   * @param isNullable
   * @param message The message to display upon error.
   */
  const emptyOutTheLocalStorageCell = (message: string) => {
    removeLocalStorageItem(LocalStorageKeys.GoogleOAuthToken);
    removeLocalStorageItem(LocalStorageKeys.GoogleRefreshToken);
    googleLogout();
    throwNotification(NotificationSeverity.Error, message);
  };

  const handleResultConfig = () => {
    try {
      isAccessTokenExists();
      isRefreshTokenExists();
      validateEmailAddress()
        .then((result) => {
          if (result) {
            setResult(GuardResultTypes.PASSED);
          }
        })
        .catch(() => setResult(GuardResultTypes.FAILED));
    } catch (error) {
      if (error instanceof LoginAuthenticationError) {
        emptyOutTheLocalStorageCell(error.message);
      }
      setResult(GuardResultTypes.FAILED);
    }
  }

  useEffect(() => {
    if (isOpen) {
      handleResultConfig();
    } else {
      setResult(GuardResultTypes.PASSED);
    }
  }, [isOpen]);

  return result;
};

export const useNotLoggedInGuard = (isOpen: boolean) => {
  const [result, setResult] = useState<GuardResultTypes>(GuardResultTypes.PENDING);

  const handleResultConfig = () => {
    const authToken = getLocalStorageItem(LocalStorageKeys.GoogleOAuthToken);
    if (authToken) {
      setResult(GuardResultTypes.FAILED);
    }
    const refreshToken = getLocalStorageItem(LocalStorageKeys.GoogleRefreshToken);
    setResult(!authToken && !refreshToken 
      ? GuardResultTypes.PASSED 
      : GuardResultTypes.FAILED);
  }

  useEffect(() => {
    if (isOpen) {
      handleResultConfig();
    } else {
      setResult(GuardResultTypes.PASSED);
    }
  }, [isOpen]);

  return result;
};
