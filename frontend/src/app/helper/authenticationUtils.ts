import AuthorizationModel from "@model/AuthorizationModel";
import axios from "axios";
import { getLocalStorageItem, setLocalStorageItem } from "./localStorageUtil";
import {
  GoogleTokenEndpoints,
  LocalStorageKeys,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import { genericDispatcher } from "@api/handler/requestHandler";
import { openSnackbar } from "./notificationUtil";
import { SnackEnum } from "@model/enum/SnackEnum";

const googleOAuthClientId = process.env.REACT_APP_USE_GOOGLE_OAUTH_CLIENT_ID ?? "";
const googleOAuthClientSecret = process.env.REACT_APP_USE_GOOGLE_OAUTH_CLIENT_SECRET ?? "";
const browserHostPath = process.env.REACT_APP_USE_HOST_PATH ?? "";

export const getRefreshToken = (
  code: string,
  callback: (authModel: AuthorizationModel) => void,
) => {
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
      callback(response.data);
      setLocalStorageItem(
        (response.data as AuthorizationModel).id_token,
        LocalStorageKeys.GoogleOAuthToken,
      );
    })
    .catch((err) => console.log("err: ", err));
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
    const payload = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: googleOAuthClientId,
      client_secret: googleOAuthClientSecret,
    };

    // TODO: Move it to the commands folder
    genericDispatcher<AuthorizationModel>({
      type: RequestCommandTypes.POST,
      server: ServersToConnectTo.GoogleServer,
      endpoint: GoogleTokenEndpoints.Token,
      obj: payload,
      header: {
        isAuthTokenMandatory: true,
      },
      // TODO: This error message is not the best. replace it with a better one.
      errorMessage: "Váratlan hiba történt a bejelentés elküldése során!",
    })
      .then(resolve)
      .catch(() => {
        openSnackbar(SnackEnum.ACCESS_TOKEN_IS_MISSING);
        reject(null);
      });
  });
};
