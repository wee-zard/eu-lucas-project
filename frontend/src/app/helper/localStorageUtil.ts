import ApplicationStorageModel from "@model/ApplicationStorageModel";
import {
  initFirstQueryParent,
  initQueryBuilderObj,
  QueryBuilderModel,
} from "@model/QueryBuilderModel";
import { ApplicationStorageKeys, LocalStorageKeys } from "@model/enum";
import { Dispatch } from "@reduxjs/toolkit";

export const getLocalStorageItem = (key: LocalStorageKeys) => {
  return localStorage.getItem(key) ?? undefined;
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

type ApplicationStorageType = {
  dispatch: Dispatch;
  key: ApplicationStorageKeys; // TODO: This may be removed, as the generic T type can do the job.
  initMethod: (dispatch: Dispatch, storage: ApplicationStorageModel) => void;
  successful: (result: any) => any;
};

export const fetchListFromApplicationStorage = <T>(storageType: ApplicationStorageType): void => {
  const appStorageRaw = getLocalStorageItem(LocalStorageKeys.ApplicationStorage);

  if (!appStorageRaw) {
    storageType.initMethod(storageType.dispatch, new ApplicationStorageModel());
    return;
  }

  const storage: ApplicationStorageModel = JSON.parse(appStorageRaw);
  const subStorage = storage[storageType.key];

  if (subStorage && subStorage.length > 0) {
    storageType.dispatch(storageType.successful(subStorage as T[]));
  } else {
    storageType.initMethod(storageType.dispatch, storage);
  }
};
