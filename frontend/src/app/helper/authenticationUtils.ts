import AuthorizationModel from "@model/AuthorizationModel";
import axios from "axios";
import { getLocalStorageItem, setLocalStorageItem } from "./localStorageUtil";
import { LocalStorageKeys } from "@model/enum";
import { openSnackbar } from "./notificationUtil";
import { SnackEnum } from "@model/enum/SnackEnum";
import NewAccessTokenPayloadRequest from "@model/request/NewAccessTokenPayloadRequest";
import { getNewAccessTokenCommand } from "@api/command/authenticationCommands";

const googleOAuthClientId = process.env.REACT_APP_USE_GOOGLE_OAUTH_CLIENT_ID ?? "";
const googleOAuthClientSecret = process.env.REACT_APP_USE_GOOGLE_OAUTH_CLIENT_SECRET ?? "";
const browserHostPath = process.env.REACT_APP_USE_HOST_PATH ?? "";

export const getRefreshToken = (code: string): Promise<AuthorizationModel> => {
  return new Promise((resolve, reject) => {
    // TODO: Move this method to the backend, so the client secret key could be hidden in the build bundle from the users browsing the page.
    // get refresh token using authorization code
    const payload = {
      grant_type: "authorization_code",
      code: code,
      client_id: googleOAuthClientId,
      client_secret: googleOAuthClientSecret,
      redirect_uri: browserHostPath,
    };

    axios
      .post(`https://oauth2.googleapis.com/token`, payload, {
        headers: {
          "Content-Type": "application/json;",
        },
      })
      .then((response) => {
        setLocalStorageItem(
          (response.data as AuthorizationModel).id_token,
          LocalStorageKeys.GoogleOAuthToken,
        );
        resolve(response.data);
      })
      .catch(reject);
  });
};

export const getNewAccessToken = (): Promise<AuthorizationModel> => {
  return new Promise<AuthorizationModel>((resolve, reject) => {
    // Fetch the refresh token from the local storage.
    const refreshToken = getLocalStorageItem(LocalStorageKeys.GoogleRefreshToken);
    if (!refreshToken) {
      openSnackbar(SnackEnum.REFRESH_TOKEN_IS_MISSING);
      reject(null);
    }

    // get new access token using refresh token
    const payload: NewAccessTokenPayloadRequest = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: googleOAuthClientId,
      client_secret: googleOAuthClientSecret,
    };

    getNewAccessTokenCommand(payload)
      .then(resolve)
      .catch(() => reject(null));
  });
};
