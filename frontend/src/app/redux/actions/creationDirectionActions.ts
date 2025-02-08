import { Dispatch } from "@reduxjs/toolkit";
import { CreationDirectionConsts } from "@redux/consts/creationDirectionConsts";
import CreationDirectionDto from "@model/dto/CreationDirectionDto";
import { getCreationDirections } from "@api/command/creationDirectionCommands";
import ApplicationStorageModel from "@model/ApplicationStorageModel";
import { fetchListFromApplicationStorage, setLocalStorageItem } from "@helper/localStorageUtil";
import { ApplicationStorageKeys, LocalStorageKeys } from "@model/enum";

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

const initStorage = (dispatch: Dispatch, storage: ApplicationStorageModel) => {
  getCreationDirections()
    .then((response) => {
      if (response) {
        const newStorage: ApplicationStorageModel = { ...storage, creationDirection: response };
        setLocalStorageItem(JSON.stringify(newStorage), LocalStorageKeys.ApplicationStorage);
        dispatch(setCreationDirectionSucceeded(response));
      } else {
        dispatch(setCreationDirectionFailed());
      }
    })
    .catch(() => dispatch(setCreationDirectionFailed()));
};

export const requestCreationDirections = (dispatch: Dispatch) => {
  dispatch(setCreationDirectionRequest());
  fetchListFromApplicationStorage<CreationDirectionDto[]>({
    dispatch,
    key: ApplicationStorageKeys.CreationDirection,
    initMethod: initStorage,
    successful: setCreationDirectionSucceeded,
  });
};
