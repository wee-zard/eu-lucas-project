import { Dispatch } from "@reduxjs/toolkit";
import { CreationYearConsts } from "@redux/consts/creationYearConsts";
import { getCreationYears } from "@api/command/creationYearCommands";
import CreationYearDto from "@model/dto/CreationYearDto";
import { fetchListFromApplicationStorage, setLocalStorageItem } from "@helper/localStorageUtil";
import { ApplicationStorageKeys, LocalStorageKeys } from "@model/enum";
import ApplicationStorageModel from "@model/ApplicationStorageModel";

export const setCreationYearRequest = () => {
  return {
    type: CreationYearConsts.REQUEST_CREATION_YEARS,
  };
};

export const setCreationYearFailed = () => {
  return {
    type: CreationYearConsts.CREATION_YEARS_FAILED,
  };
};

export const setCreationYearSucceeded = (data: CreationYearDto[]) => {
  return {
    type: CreationYearConsts.CREATION_YEARS_SUCCEEDED,
    payload: data,
  };
};

const initStorage = (dispatch: Dispatch, storage: ApplicationStorageModel) => {
  getCreationYears()
    .then((response) => {
      if (response) {
        const newStorage: ApplicationStorageModel = { ...storage, creationYear: response };
        setLocalStorageItem(JSON.stringify(newStorage), LocalStorageKeys.ApplicationStorage);
        dispatch(setCreationYearSucceeded(response));
      } else {
        dispatch(setCreationYearFailed());
      }
    })
    .catch(() => dispatch(setCreationYearFailed()));
};

export const requestCreationYears = (dispatch: Dispatch) => {
  dispatch(setCreationYearRequest());
  fetchListFromApplicationStorage<CreationYearDto[]>({
    dispatch,
    key: ApplicationStorageKeys.CreationYear,
    initMethod: initStorage,
    successful: setCreationYearSucceeded,
  });
};
