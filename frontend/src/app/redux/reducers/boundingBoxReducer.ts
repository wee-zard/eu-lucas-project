import { BoundingBoxConsts } from "@redux/consts/boundingBoxConsts";
import BoundingBoxActionTypes from "@redux/types/boundingBoxActionTypes";
import BoundingBoxReducerStateType from "@redux/types/boundingBoxReducerStateType";

const initialState: BoundingBoxReducerStateType = {
  isBoundingBoxDialogOpen: false,
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
    default:
      return {
        ...state,
      };
  }
};

export default boundingBoxReducer;
