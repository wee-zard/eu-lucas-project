import { Dispatch } from "@reduxjs/toolkit";
import { CreationCountryConsts } from "@redux/consts/creationCountryConsts";
import CreationCountryDto from "@model/dto/CreationCountryDto";
import { getCreationCountries } from "@api/command/creationCountryCommands";

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

export const requestCreationCountries = (dispatch: Dispatch) => {
  dispatch(setCreationCountryRequest());
  getCreationCountries()
    .then((response) => {
      if (response) {
        dispatch(setCreationCountrySucceeded(response));
      } else {
        dispatch(setCreationCountryFailed());
      }
    })
    .catch(() => dispatch(setCreationCountryFailed()));
};
