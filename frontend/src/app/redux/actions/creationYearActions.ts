import { Dispatch } from "@reduxjs/toolkit";
import { CreationYearConsts } from "@redux/consts/creationYearConsts";
import { getCreationYears } from "@api/command/creationYearCommands";
import CreationYearActionSetterType from "@redux/types/creationYearActionSetterType";
import CreationYearReducerStateType from "@redux/types/creationYearReducerStateType";

export const setCreationYearRequest = (): CreationYearActionSetterType["request"] => {
  return {
    type: CreationYearConsts.REQUEST_CREATION_YEARS,
  };
};

export const setCreationYearFailed = (): CreationYearActionSetterType["failed"] => {
  return {
    type: CreationYearConsts.CREATION_YEARS_FAILED,
  };
};

export const setCreationYearSucceeded = (
  data: CreationYearReducerStateType["listOfCreationYears"],
): CreationYearActionSetterType["succeeded"] => {
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
