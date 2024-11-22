import { UnknownAction } from "redux";
import ExifKeyDto from "../../model/dto/ExifKeyDto";
import { ExifKeyConsts } from "../consts/exifKeyConsts";

interface ExifKeyType {
  isExifKeysLoading: boolean;
  listOfExifKeys: ExifKeyDto[];
}

const initialState: ExifKeyType = {
  isExifKeysLoading: false,
  listOfExifKeys: [],
};

const exifKeyReducer = (
  state = initialState,
  action: UnknownAction
): ExifKeyType => {
  switch (action.type) {
    case ExifKeyConsts.REQUESTING_EXIF_KEY_FAILED:
      return {
        ...state,
        isExifKeysLoading: false,
      };
    case ExifKeyConsts.REQUESTING_EXIF_KEY_SUCCEDED:
      return {
        ...state,
        listOfExifKeys: action.payload as ExifKeyDto[],
        isExifKeysLoading: false,
      };
    case ExifKeyConsts.REQUEST_EXIF_KEY:
      return {
        ...state,
        isExifKeysLoading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default exifKeyReducer;
