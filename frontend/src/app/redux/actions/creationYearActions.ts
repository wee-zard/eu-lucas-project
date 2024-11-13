import { Dispatch } from "@reduxjs/toolkit";
import { CreationYearConsts } from "../consts/creationYearConsts";
import { getCreationYears } from "../../api/command/creationYearCommands";
import CreationYearDto from "../../model/CreationYearDto";

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
export const setCreationYearSucceded = (data: CreationYearDto[]) => {
  return {
    type: CreationYearConsts.CREATION_YEARS_SUCCEDED,
    payload: data,
  };
};
export const requestCreationYears = (dispatch: Dispatch) => {
  dispatch(setCreationYearRequest());
  getCreationYears()
    .then((response) => {
      if (response) {
        dispatch(setCreationYearSucceded(response));
      } else {
        dispatch(setCreationYearFailed());
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch(setCreationYearFailed());
    });
};
