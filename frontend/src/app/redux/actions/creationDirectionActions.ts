import { Dispatch } from "@reduxjs/toolkit";
import { CreationDirectionConsts } from "@redux/consts/creationDirectionConsts";
import CreationDirectionDto from "@model/dto/CreationDirectionDto";
import { getCreationDirections } from "@api/command/creationDirectionCommands";

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

export const setCreationDirectionSucceeded = (data: CreationDirectionDto[]) => {
  return {
    type: CreationDirectionConsts.CREATION_DIRECTION_SUCCEEDED,
    payload: data,
  };
};

export const requestCreationDirections = (dispatch: Dispatch) => {
  dispatch(setCreationDirectionRequest());
  getCreationDirections()
    .then((response) => {
      if (response) {
        dispatch(setCreationDirectionSucceeded(response));
      } else {
        dispatch(setCreationDirectionFailed());
      }
    })
    .catch(() => dispatch(setCreationDirectionFailed()));
};
