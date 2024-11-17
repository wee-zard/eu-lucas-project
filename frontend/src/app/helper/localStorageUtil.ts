import { LocalStorageKeys } from "../model/enum";

export const getLocalStorageItem = (key: LocalStorageKeys) => {
  const item = localStorage.getItem(key);
  if (item) {
    return item;
  } else {
    /** TODO: Implement error handle here */
    console.error("Error! Authentication token is not found!");
  }
};

export const setLocalStorageItem = (item: string, key: LocalStorageKeys) => {
  localStorage.setItem(key, item);
};

export const removeLocalStorageItem = (key: LocalStorageKeys) => {
  localStorage.removeItem(key);
}
