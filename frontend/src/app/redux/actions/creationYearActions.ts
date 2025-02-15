import { Dispatch } from "@reduxjs/toolkit";
import { CreationYearConsts } from "@redux/consts/creationYearConsts";
import { getCreationYears } from "@api/command/creationYearCommands";
import CreationYearDto from "@model/dto/CreationYearDto";

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

export const requestCreationYears = (dispatch: Dispatch) => {
  dispatch(setCreationYearRequest());
  getCreationYears()
    .then((response) => {
      if (response) {
        dispatch(setCreationYearSucceeded(response));
      } else {
        dispatch(setCreationYearFailed());
      }
    })
    .catch(() => dispatch(setCreationYearFailed()));
};
