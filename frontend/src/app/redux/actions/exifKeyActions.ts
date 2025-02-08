import { Dispatch } from "@reduxjs/toolkit";
import ExifKeyDto from "@model/dto/ExifKeyDto";
import { ExifKeyConsts } from "@redux/consts/exifKeyConsts";
import { getExifKeyList } from "@api/command/exifKeyCommands";
import { fetchListFromApplicationStorage, setLocalStorageItem } from "@helper/localStorageUtil";
import { ApplicationStorageKeys, LocalStorageKeys } from "@model/enum";
import ApplicationStorageModel from "@model/ApplicationStorageModel";

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

const initStorage = (dispatch: Dispatch, storage: ApplicationStorageModel) => {
  getExifKeyList()
    .then((response) => {
      if (response) {
        const newStorage: ApplicationStorageModel = { ...storage, exifKey: response };
        setLocalStorageItem(JSON.stringify(newStorage), LocalStorageKeys.ApplicationStorage);
        dispatch(setExifKeySucceeded(response));
      } else {
        dispatch(setExifKeyFailed());
      }
    })
    .catch(() => dispatch(setExifKeyFailed()));
};

export const requestExifKeys = (dispatch: Dispatch) => {
  dispatch(setExifKeyRequest());
  fetchListFromApplicationStorage<ExifKeyDto[]>({
    dispatch,
    key: ApplicationStorageKeys.ExifKey,
    initMethod: initStorage,
    successful: setExifKeySucceeded,
  });
};
