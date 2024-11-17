import { Dispatch } from "@reduxjs/toolkit";
import CoordinateYDto from "../../model/dto/CoordinateYDto";
import { CoordinateYConsts } from "../consts/coordinateYConsts";
import { getCoordinateYList } from "../../api/command/coordinateYCommands";

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
export const setCoordinateYSucceded = (data: CoordinateYDto[]) => {
  return {
    type: CoordinateYConsts.REQUESTING_COORDINATE_Y_SUCCEDED,
    payload: data,
  };
};
export const requestCoordinateYList = (dispatch: Dispatch) => {
  dispatch(setCoordinateYRequest());
  getCoordinateYList()
    .then((response) => {
      if (response) {
        dispatch(setCoordinateYSucceded(response));
      } else {
        dispatch(setCoordinateYFailed());
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch(setCoordinateYFailed());
    });
};
