import { Session } from "@toolpad/core";
import { getLocalStorageItem, setLocalStorageItem } from "./localStorageUtil";
import { LocalStorageKeys } from "@model/enum";
import { getToolpadSessionCommand } from "@api/command/userCommands";
import FileUtils from "./fileUtils";
import UserToolpadSessionResponse from "@model/response/UserToolpadSessionResponse";

export default class SessionUtil {
  public static defaultSessionObj: Session = {
    user: {
      name: "",
      email: "",
      image: "",
    },
  };

  private static getStoredSession = (): Session | undefined => {
    const storageSessionAccount = localStorage.getItem(LocalStorageKeys.SessionAccount);

    if (!storageSessionAccount) {
      return;
    }

    const storedResponse = JSON.parse(storageSessionAccount) as UserToolpadSessionResponse;

    if (!storedResponse || !storedResponse.image) {
      return;
    }

    const resourceUrl = FileUtils.base64ToResourceUrl(storedResponse.image);

    return {
      user: {
        ...storedResponse,
        image: resourceUrl,
      },
    };
  };

  public static async getSession(): Promise<Session> {
    const storedAuthToken = getLocalStorageItem(LocalStorageKeys.GoogleOAuthToken);

    if (!storedAuthToken) {
      return this.defaultSessionObj;
    }

    const storedSession = this.getStoredSession();

    if (storedSession) {
      return storedSession;
    }

    try {
      // Get the toolpad user session from the server.
      const toolpadSession = await getToolpadSessionCommand();

      // Save the session in the localstorage.
      setLocalStorageItem(toolpadSession, LocalStorageKeys.SessionAccount);

      return this.getStoredSession() ?? this.defaultSessionObj;
    } catch (err) {
      return this.defaultSessionObj;
    }
  }
}
