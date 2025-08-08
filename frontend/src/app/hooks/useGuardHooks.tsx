import { getLocalStorageItem, removeLocalStorageItem } from "@helper/localStorageUtil";
import { GuardResultTypes, LocalStorageKeys } from "@model/enum";
import { googleLogout } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { openSnackbar } from "@helper/notificationUtil";
import { SnackEnum } from "@model/enum/SnackEnum";
import { useDispatch } from "react-redux";
import { setAuthenticatedUser } from "@redux/actions/userActions";
import { validateEmailAddress } from "@api/command/authenticationCommands";

export const useGoogleAccountGuard = (isOpen: boolean) => {
  const [result, setResult] = useState(GuardResultTypes.PENDING);
  const dispatch = useDispatch();

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

    // Checks if the auth token exists in the storage.
    if (!authToken) {
      openSnackbar(SnackEnum.ACCESS_TOKEN_IS_MISSING);
      setResult(GuardResultTypes.FAILED);
      emptyOutTheLocalStorageCell();
      return;
    }

    //Checks if the refresh token exists in the storage.
    if (!refreshToken) {
      openSnackbar(SnackEnum.REFRESH_TOKEN_IS_MISSING);
      setResult(GuardResultTypes.FAILED);
      emptyOutTheLocalStorageCell();
      return;
    }

    try {
      const result = await validateEmailAddress();

      if (!result) {
        setResult(GuardResultTypes.FAILED);
        emptyOutTheLocalStorageCell();
        return;
      }

      dispatch(setAuthenticatedUser(result));
      setResult(GuardResultTypes.PASSED);
    } catch (error) {
      setResult(GuardResultTypes.FAILED);
      emptyOutTheLocalStorageCell();
    }
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
