import { UnknownAction } from "redux";
import ExifKeyDto from "@model/dto/ExifKeyDto";
import { ExifKeyConsts } from "../consts/exifKeyConsts";
import { CacheStorageType } from "@model/types/CacheStorageType";

interface ExifKeyType {
  isExifKeysLoading: boolean;
  listOfExifKeys?: ExifKeyDto[];
  exifCacheStorage: CacheStorageType;
}

const initialState: ExifKeyType = {
  isExifKeysLoading: false,
  listOfExifKeys: undefined,
  exifCacheStorage: {},
};

const exifKeyReducer = (state = initialState, action: UnknownAction): ExifKeyType => {
  switch (action.type) {
    case ExifKeyConsts.REQUESTING_EXIF_KEY_FAILED:
      return {
        ...state,
        isExifKeysLoading: false,
      };
    case ExifKeyConsts.REQUESTING_EXIF_KEY_SUCCEEDED:
      return {
        ...state,
        listOfExifKeys: action.payload as ExifKeyDto[],
        isExifKeysLoading: false,
      };
    case ExifKeyConsts.REQUEST_EXIF_KEY:
      return {
        ...state,
        listOfExifKeys: undefined,
        isExifKeysLoading: true,
      };
    case ExifKeyConsts.SET_EXIF_CACHE_STORAGE:
      return {
        ...state,
        exifCacheStorage: action.payload as CacheStorageType,
      };
    default:
      return {
        ...state,
      };
  }
};

export default exifKeyReducer;
