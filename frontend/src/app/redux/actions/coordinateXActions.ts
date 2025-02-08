import { Dispatch } from "@reduxjs/toolkit";
import CoordinateXDto from "@model/dto/CoordinateXDto";
import { CoordinateXConsts } from "@redux/consts/coordinateXConsts";
import { getCoordinateXList } from "@api/command/coordinateXCommands";
import ApplicationStorageModel from "@model/ApplicationStorageModel";
import { fetchListFromApplicationStorage, setLocalStorageItem } from "@helper/localStorageUtil";
import { ApplicationStorageKeys, LocalStorageKeys } from "@model/enum";

export const setCoordinateXRequest = () => {
  return {
    type: CoordinateXConsts.REQUEST_COORDINATE_X,
  };
};

export const setCoordinateXFailed = () => {
  return {
    type: CoordinateXConsts.REQUESTING_COORDINATE_X_FAILED,
  };
};

export const setCoordinateXSucceeded = (data: CoordinateXDto[]) => {
  return {
    type: CoordinateXConsts.REQUESTING_COORDINATE_X_SUCCEEDED,
    payload: data,
  };
};

const initStorage = (dispatch: Dispatch, storage: ApplicationStorageModel) => {
  getCoordinateXList()
    .then((response) => {
      if (response) {
        const newStorage: ApplicationStorageModel = { ...storage, coordinateX: response };
        setLocalStorageItem(JSON.stringify(newStorage), LocalStorageKeys.ApplicationStorage);
        dispatch(setCoordinateXSucceeded(response));
      } else {
        dispatch(setCoordinateXFailed());
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch(setCoordinateXFailed());
    });
};

export const requestCoordinateXList = (dispatch: Dispatch) => {
  dispatch(setCoordinateXRequest());
  fetchListFromApplicationStorage<CoordinateXDto[]>({
    dispatch,
    key: ApplicationStorageKeys.CoordinateX,
    initMethod: initStorage,
    successful: setCoordinateXSucceeded,
  });
};
