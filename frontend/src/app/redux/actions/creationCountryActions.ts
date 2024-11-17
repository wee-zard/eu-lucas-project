import { Dispatch } from "@reduxjs/toolkit";
import { CreationCountryConsts } from "../consts/creationCountryConts";
import CreationCountryDto from "../../model/CreationCountryDto";
import { getCreationCountries } from "../../api/command/creationCountryCommands";

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
export const setCreationCountrySucceded = (data: CreationCountryDto[]) => {
  return {
    type: CreationCountryConsts.CREATION_COUNTRY_SUCCEDED,
    payload: data,
  };
};
export const requestCreationCountries = (dispatch: Dispatch) => {
  dispatch(setCreationCountryRequest());
  getCreationCountries()
    .then((response) => {
      if (response) {
        dispatch(setCreationCountrySucceded(response));
      } else {
        dispatch(setCreationCountryFailed());
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch(setCreationCountryFailed());
    });
};
