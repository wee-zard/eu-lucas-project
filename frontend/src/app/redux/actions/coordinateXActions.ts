import { Dispatch } from "@reduxjs/toolkit";
import CoordinateXDto from "@model/dto/CoordinateXDto";
import { CoordinateXConsts } from "@redux/consts/coordinateXConsts";
import { getCoordinateXList } from "@api/command/coordinateXCommands";

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

export const requestCoordinateXList = (dispatch: Dispatch) => {
  dispatch(setCoordinateXRequest());
  getCoordinateXList()
    .then((response) => {
      if (response) {
        dispatch(setCoordinateXSucceeded(response));
      } else {
        dispatch(setCoordinateXFailed());
      }
    })
    .catch(() => dispatch(setCoordinateXFailed()));
};
