import BoundingBoxReducerStateType from "@redux/types/boundingBoxReducerStateType";
import { BoundingBoxConsts } from "@redux/consts/boundingBoxConsts";

interface BoundingBoxActionSetterType {
  isBoundingBoxDialogOpen: {
    type: BoundingBoxConsts.SET_BOUNDING_BOX_DIALOG_OPEN;
    payload: BoundingBoxReducerStateType["isBoundingBoxDialogOpen"];
  };
  boxColors: {
    type: BoundingBoxConsts.SET_BOUNDING_BOX_COLORS;
    payload: BoundingBoxReducerStateType["boxColors"];
  };
  isPercentageDisplayed: {
    type: BoundingBoxConsts.SET_BOUNDING_BOX_PERCENTAGE_DISPLAY;
    payload: BoundingBoxReducerStateType["isPercentageDisplayed"];
  };
}

export default BoundingBoxActionSetterType;
