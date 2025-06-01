import {
  initFirstQueryParent,
  initQueryBuilderObj,
  QueryBuilderModel,
} from "@model/QueryBuilderModel";
import { LocalStorageKeys, ScreenUrls } from "@model/enum";
import { redirectToUrl } from "@providers/RedirectionProvider";
import { googleLogout } from "@react-oauth/google";

export const getLocalStorageItem = (key: LocalStorageKeys) => {
  return localStorage.getItem(key) ?? undefined;
};

export const setLocalStorageItem = (item: any, key: LocalStorageKeys) => {
  if (typeof item === "string") {
    localStorage.setItem(key, item);
  } else {
    localStorage.setItem(key, JSON.stringify(item));
  }
};

export const removeLocalStorageItem = (key: LocalStorageKeys) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = ({ isGoogleLogoutIgnored = false } = {}) => {
  const localStorageKeys = Object.keys(localStorage);

  localStorageKeys.forEach((key) => {
    if (key === LocalStorageKeys.ToolPadMode || key === LocalStorageKeys.SetItem) {
      return;
    }

    localStorage.removeItem(key);
  });

  if (!isGoogleLogoutIgnored) {
    googleLogout();
  }

  redirectToUrl(ScreenUrls.LoginScreenPath);
};

export const LocalStorageUtils = {
  initQueryBuilderModelLocalStorage: () => {
    const defaultBuilder = initQueryBuilderObj(initFirstQueryParent);
    LocalStorageUtils.setQueryBuilderModelLocalStorage(defaultBuilder);
    return defaultBuilder;
  },

  setQueryBuilderModelLocalStorage: (builder?: QueryBuilderModel) => {
    setLocalStorageItem(JSON.stringify(builder), LocalStorageKeys.FilteringDialog);
  },

  getQueryBuilderModel: () => {
    const obj = getLocalStorageItem(LocalStorageKeys.FilteringDialog);
    if (!obj) {
      return LocalStorageUtils.initQueryBuilderModelLocalStorage();
    }
    try {
      return JSON.parse(obj) as QueryBuilderModel;
    } catch (err) {
      return LocalStorageUtils.initQueryBuilderModelLocalStorage();
    }
  },
};
