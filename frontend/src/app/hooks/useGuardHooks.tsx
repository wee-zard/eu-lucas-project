import { getLocalStorageItem, removeLocalStorageItem } from "@helper/localStorageUtil";
import { GuardResultTypes, LocalStorageKeys } from "@model/enum";
import { googleLogout } from "@react-oauth/google";
import { validateEmailAddress } from "@api/command/userCommands";
import { useEffect, useState } from "react";
import { NotificationSeverity, throwNotification } from "@helper/notificationUtil";
import i18n from "@i18n/i18nHandler";

export const useGoogleAccountGuard = (isOpen: boolean) => {
  const [result, setResult] = useState(GuardResultTypes.PENDING);

  /**
   * Log out the user from the app and empty out the local storage.
   */
  const emptyOutTheLocalStorageCell = () => {
    removeLocalStorageItem(LocalStorageKeys.GoogleOAuthToken);
    removeLocalStorageItem(LocalStorageKeys.GoogleRefreshToken);
    setResult(GuardResultTypes.FAILED);
    googleLogout();
  };

  const handleResultConfig = async () => {
    const authToken = getLocalStorageItem(LocalStorageKeys.GoogleOAuthToken);
    const refreshToken = getLocalStorageItem(LocalStorageKeys.GoogleRefreshToken);

    // Checks if the auth token is exists in the storage.
    if (!authToken) {
      throwNotification(
        NotificationSeverity.Error,
        i18n.t("guards.authentication.access-token-is-missing"),
      );
      emptyOutTheLocalStorageCell();
      return;
    }

    //Checks if the refresh token exists in the storage.
    if (!refreshToken) {
      throwNotification(
        NotificationSeverity.Error,
        i18n.t("guards.authentication.refresh-token-is-missing"),
      );
      emptyOutTheLocalStorageCell();
      return;
    }

    const result = await validateEmailAddress();

    if (!result) {
      emptyOutTheLocalStorageCell();
      return;
    }

    setResult(GuardResultTypes.PASSED);
  };

  useEffect(() => {
    if (isOpen) {
      handleResultConfig();
    } else {
      setResult(GuardResultTypes.PASSED);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setResult(!authToken && !refreshToken ? GuardResultTypes.PASSED : GuardResultTypes.FAILED);
  };

  useEffect(() => {
    if (isOpen) {
      handleResultConfig();
    } else {
      setResult(GuardResultTypes.PASSED);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return result;
};
