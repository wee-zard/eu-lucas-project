import {
  initFirstQueryParent,
  initQueryBuilderObj,
  QueryBuilderModel,
} from "@model/QueryBuilderModel";
import { LocalStorageKeys } from "@model/enum";
import { LocalStorageType } from "@model/types/LocalStorageType";

export const getLocalStorageItem = (key: LocalStorageType) => {
  return localStorage.getItem(key) ?? undefined;
};

export const getGenericLocalStorageItem = <T>(key: LocalStorageType) => {
  const entry = getLocalStorageItem(key);

  if (!entry) {
    return;
  }

  return JSON.parse(entry) as T;
};

export const setLocalStorageItem = (item: any, key: LocalStorageType) => {
  if (typeof item === "string") {
    localStorage.setItem(key, item);
  } else {
    localStorage.setItem(key, JSON.stringify(item));
  }
};

export const removeLocalStorageItem = (key: LocalStorageType) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  const localStorageKeys = Object.keys(localStorage);

  localStorageKeys.forEach((key) => {
    if (key === LocalStorageKeys.ToolPadMode || key === LocalStorageKeys.SetItem) {
      return;
    }

    localStorage.removeItem(key);
  });
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
