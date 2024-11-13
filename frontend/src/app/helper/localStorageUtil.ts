import { LocalStorageKeys } from "../model/enum";

export const getAuthToken = () => {
  const token = localStorage.getItem(LocalStorageKeys.GoogleOAuthToken);
  if (token) {
    return token;
  } else {
    /** TODO: Implement error handle here */
    console.error("Error! Authentication token is not found!");
  }
};

export const setAuthToken = (token: string) => {
  localStorage.setItem(LocalStorageKeys.GoogleOAuthToken, token);
};

export const removeAuthToken = () => {
  localStorage.removeItem(LocalStorageKeys.GoogleOAuthToken);
}
