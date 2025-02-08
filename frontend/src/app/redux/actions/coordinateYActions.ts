import { Dispatch } from "@reduxjs/toolkit";
import CoordinateYDto from "@model/dto/CoordinateYDto";
import { CoordinateYConsts } from "@redux/consts/coordinateYConsts";
import { getCoordinateYList } from "@api/command/coordinateYCommands";
import ApplicationStorageModel from "@model/ApplicationStorageModel";
import { fetchListFromApplicationStorage, setLocalStorageItem } from "@helper/localStorageUtil";
import { ApplicationStorageKeys, LocalStorageKeys } from "@model/enum";

export const setCoordinateYRequest = () => {
  return {
    type: CoordinateYConsts.REQUEST_COORDINATE_Y,
  };
};

export const setCoordinateYFailed = () => {
  return {
    type: CoordinateYConsts.REQUESTING_COORDINATE_Y_FAILED,
  };
};

export const setCoordinateYSucceeded = (data: CoordinateYDto[]) => {
  return {
    type: CoordinateYConsts.REQUESTING_COORDINATE_Y_SUCCEEDED,
    payload: data,
  };
};

const initStorage = (dispatch: Dispatch, storage: ApplicationStorageModel) => {
  getCoordinateYList()
    .then((response) => {
      if (response) {
        const newStorage: ApplicationStorageModel = { ...storage, coordinateY: response };
        setLocalStorageItem(JSON.stringify(newStorage), LocalStorageKeys.ApplicationStorage);
        dispatch(setCoordinateYSucceeded(response));
      } else {
        dispatch(setCoordinateYFailed());
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch(setCoordinateYFailed());
    });
};

export const requestCoordinateYList = (dispatch: Dispatch) => {
  dispatch(setCoordinateYRequest());
  fetchListFromApplicationStorage<CoordinateYDto[]>({
    dispatch,
    key: ApplicationStorageKeys.CoordinateY,
    initMethod: initStorage,
    successful: setCoordinateYSucceeded,
  });
};
