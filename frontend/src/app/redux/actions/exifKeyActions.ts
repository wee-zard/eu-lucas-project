import { Dispatch } from "@reduxjs/toolkit";
import ExifKeyDto from "../../model/dto/ExifKeyDto";
import { ExifKeyConsts } from "../consts/exifKeyConsts";
import { getExifKeyList } from "../../api/command/exifKeyCommands";

export const setExifKeyRequest = () => {
  return {
    type: ExifKeyConsts.REQUEST_EXIF_KEY,
  };
};
export const setExifKeyFailed = () => {
  return {
    type: ExifKeyConsts.REQUESTING_EXIF_KEY_FAILED,
  };
};
export const setExifKeySucceded = (data: ExifKeyDto[]) => {
  return {
    type: ExifKeyConsts.REQUESTING_EXIF_KEY_SUCCEDED,
    payload: data,
  };
};
export const requestExifKeys = (dispatch: Dispatch) => {
  dispatch(setExifKeyRequest());
  getExifKeyList()
    .then((response) => {
      if (response) {
        dispatch(setExifKeySucceded(response));
      } else {
        dispatch(setExifKeyFailed());
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch(setExifKeyFailed());
    });
};
