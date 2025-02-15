import { Dispatch } from "@reduxjs/toolkit";
import ExifKeyDto from "@model/dto/ExifKeyDto";
import { ExifKeyConsts } from "@redux/consts/exifKeyConsts";
import { getExifKeyList } from "@api/command/exifKeyCommands";

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

export const setExifKeySucceeded = (data: ExifKeyDto[]) => {
  return {
    type: ExifKeyConsts.REQUESTING_EXIF_KEY_SUCCEEDED,
    payload: data,
  };
};

export const requestExifKeys = (dispatch: Dispatch) => {
  dispatch(setExifKeyRequest());
  getExifKeyList()
    .then((response) => {
      if (response) {
        dispatch(setExifKeySucceeded(response));
      } else {
        dispatch(setExifKeyFailed());
      }
    })
    .catch(() => dispatch(setExifKeyFailed()));
};
