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
import { NotificationSeverity, throwNotification } from "./notificationUtil";

const googleOAuthClientId = process.env.REACT_APP_USE_GOOGLE_OAUTH_CLIENT_ID ?? "";
const googleOAuthClientSecret = process.env.REACT_APP_USE_GOOGLE_OAUTH_CLIENT_SECRET ?? "";

export const getRefreshToken = (
  code: string,
  callback: (authModel: AuthorizationModel) => void,
) => {
  // get refresh token using authorization code
  const payload = {
    grant_type: "authorization_code",
    code: code,
    client_id: googleOAuthClientId,
    client_secret: googleOAuthClientSecret,
    redirect_uri: "http://localhost:3000",
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

export const getNewAccessToken = async () => {
  // Fetch the refresh token from the local storage.
  const refreshToken = getLocalStorageItem(LocalStorageKeys.GoogleRefreshToken);
  if (!refreshToken) {
    throwNotification(NotificationSeverity.Error, "Hiba! Refresh Token nem található!");
    return null;
  }
  try {
    // get new access token using refresh token
    const payload = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: googleOAuthClientId,
      client_secret: googleOAuthClientSecret,
    };

    return await genericDispatcher<AuthorizationModel>({
      type: RequestCommandTypes.POST,
      server: ServersToConnectTo.GoogleServer,
      endpoint: GoogleTokenEndpoints.Token,
      obj: payload,
      header: {
        isAuthTokenMandatory: true,
      },
      errorMessage: "Váratlan hiba történt a bejelentés elküldése során!",
    });
  } catch (error) {
    throwNotification(NotificationSeverity.Error, "Hiba! Nem sikerült új Access Tokent lekérni!");
    return null;
  }
};
