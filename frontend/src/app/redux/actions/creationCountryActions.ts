import { Dispatch } from "@reduxjs/toolkit";
import { CreationCountryConsts } from "@redux/consts/creationCountryConsts";
import CreationCountryDto from "@model/dto/CreationCountryDto";
import { getCreationCountries } from "@api/command/creationCountryCommands";
import ApplicationStorageModel from "@model/ApplicationStorageModel";
import { fetchListFromApplicationStorage, setLocalStorageItem } from "@helper/localStorageUtil";
import { ApplicationStorageKeys, LocalStorageKeys } from "@model/enum";

export const setCreationCountryRequest = () => {
  return {
    type: CreationCountryConsts.REQUEST_CREATION_COUNTRY,
  };
};

export const setCreationCountryFailed = () => {
  return {
    type: CreationCountryConsts.CREATION_COUNTRY_FAILED,
  };
};

export const setCreationCountrySucceeded = (data: CreationCountryDto[]) => {
  return {
    type: CreationCountryConsts.CREATION_COUNTRY_SUCCEEDED,
    payload: data,
  };
};

const initStorage = (dispatch: Dispatch, storage: ApplicationStorageModel) => {
  getCreationCountries()
    .then((response) => {
      if (response) {
        const newStorage: ApplicationStorageModel = { ...storage, creationCountry: response };
        setLocalStorageItem(JSON.stringify(newStorage), LocalStorageKeys.ApplicationStorage);
        dispatch(setCreationCountrySucceeded(response));
      } else {
        dispatch(setCreationCountryFailed());
      }
    })
    .catch(() => dispatch(setCreationCountryFailed()));
};

export const requestCreationCountries = (dispatch: Dispatch) => {
  dispatch(setCreationCountryRequest());
  fetchListFromApplicationStorage<CreationCountryDto[]>({
    dispatch,
    key: ApplicationStorageKeys.CreationCountry,
    initMethod: initStorage,
    successful: setCreationCountrySucceeded,
  });
};
