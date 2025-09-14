import { getGenericLocalStorageItem } from "@helper/localStorageUtil";
import { LocalStorageKeys } from "@model/enum";
import { BoundingBoxConsts } from "@redux/consts/boundingBoxConsts";
import BoundingBoxActionTypes from "@redux/types/boundingBoxActionTypes";
import BoundingBoxReducerStateType from "@redux/types/boundingBoxReducerStateType";

const storageItem = getGenericLocalStorageItem<BoundingBoxReducerStateType["boxColors"]>(
  LocalStorageKeys.BoundingBoxColors,
);

const initialState: BoundingBoxReducerStateType = {
  isBoundingBoxDialogOpen: false,
  boxColors: {
    homogenousBoxHexColor: storageItem?.homogenousBoxHexColor ?? "#fabed4",
    invasiveBoxHexColor: storageItem?.invasiveBoxHexColor ?? "#e6194B",
  },
};

const boundingBoxReducer = (
  state = initialState,
  action: BoundingBoxActionTypes,
): BoundingBoxReducerStateType => {
  switch (action.type) {
    case BoundingBoxConsts.SET_BOUNDING_BOX_DIALOG_OPEN:
      return {
        ...state,
        isBoundingBoxDialogOpen: action.payload,
      };
    case BoundingBoxConsts.SET_BOUNDING_BOX_COLORS:
      return {
        ...state,
        boxColors: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default boundingBoxReducer;
