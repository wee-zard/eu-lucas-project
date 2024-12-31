import LoginAuthenticationError from "@model/error/LoginAuthenticationError";
import { getLocalStorageItem } from "@helper/localStorageUtil";
import { LocalStorageKeys } from "@model/enum";

/** 
 * Get the auth token of the currently logged-in user. If the token is not found,
 * then throws a {@link LoginAuthenticationError} error.
 * 
 * @throws {LoginAuthenticationError} If the authentication token is not found in the local storage.
 */
export const getAuthToken = () => {
  const authToken = getLocalStorageItem(LocalStorageKeys.GoogleOAuthToken);
  if (!authToken) {
    throw new LoginAuthenticationError("Error! Authentication token is not found!");
  }
  return authToken;
}

export default getAuthToken;
