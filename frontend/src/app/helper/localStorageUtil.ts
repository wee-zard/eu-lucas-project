import {
  initFirstQueryParent,
  initQueryBuilderObj,
  QueryBuilderModel,
} from "@model/QueryBuilderModel";
import { LocalStorageKeys } from "@model/enum";

export const getLocalStorageItem = (key: LocalStorageKeys) => {
  const item = localStorage.getItem(key);
  if (item) {
    return item;
  }
  return undefined;
};

export const setLocalStorageItem = (item: string, key: LocalStorageKeys) => {
  localStorage.setItem(key, item);
};

export const removeLocalStorageItem = (key: LocalStorageKeys) => {
  localStorage.removeItem(key);
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
