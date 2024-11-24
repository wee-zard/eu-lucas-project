import { LocalStorageKeys } from "../model/enum";

export const getLocalStorageItem = (key: LocalStorageKeys) => {
  const item = localStorage.getItem(key);
  if (item) {
    return item;
  }
};

export const setLocalStorageItem = (item: string, key: LocalStorageKeys) => {
  localStorage.setItem(key, item);
};

export const removeLocalStorageItem = (key: LocalStorageKeys) => {
  localStorage.removeItem(key);
}
