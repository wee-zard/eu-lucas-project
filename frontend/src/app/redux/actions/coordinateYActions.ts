import { Dispatch } from "@reduxjs/toolkit";
import CoordinateYDto from "@model/dto/CoordinateYDto";
import { CoordinateYConsts } from "@redux/consts/coordinateYConsts";
import { getCoordinateYList } from "@api/command/coordinateYCommands";

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

export const requestCoordinateYList = (dispatch: Dispatch) => {
  dispatch(setCoordinateYRequest());
  getCoordinateYList()
    .then((response) => {
      if (response) {
        dispatch(setCoordinateYSucceeded(response));
      } else {
        dispatch(setCoordinateYFailed());
      }
    })
    .catch(() => dispatch(setCoordinateYFailed()));
};
