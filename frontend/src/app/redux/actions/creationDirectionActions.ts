import { Dispatch } from "@reduxjs/toolkit";
import { CreationDirectionConsts } from "../consts/creationDirectionConsts";
import CreationDirectionDto from "../../model/CreationDirectionDto";
import { getCreationDirections } from "../../api/command/creationDirectionCommands";

export const setCreationDirectionRequest = () => {
  return {
    type: CreationDirectionConsts.REQUEST_CREATION_DIRECTION,
  };
};
export const setCreationDirectionFailed = () => {
  return {
    type: CreationDirectionConsts.CREATION_DIRECTION_FAILED,
  };
};
export const setCreationDirectionSucceded = (data: CreationDirectionDto[]) => {
  return {
    type: CreationDirectionConsts.CREATION_DIRECTION_SUCCEDED,
    payload: data,
  };
};
export const requestCreationDirectiones = (dispatch: Dispatch) => {
  dispatch(setCreationDirectionRequest());
  getCreationDirections()
    .then((response) => {
      if (response) {
        dispatch(setCreationDirectionSucceded(response));
      } else {
        dispatch(setCreationDirectionFailed());
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch(setCreationDirectionFailed());
    });
};
