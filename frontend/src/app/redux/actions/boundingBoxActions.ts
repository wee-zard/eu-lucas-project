import { BoundingBoxConsts } from "@redux/consts/boundingBoxConsts";
import BoundingBoxActionSetterType from "@redux/types/boundingBoxActionSetterType";
import BoundingBoxReducerStateType from "@redux/types/boundingBoxReducerStateType";

export const setBoundingBoxDialogToOpen = (
  data: BoundingBoxReducerStateType["isBoundingBoxDialogOpen"],
): BoundingBoxActionSetterType["isBoundingBoxDialogOpen"] => {
  return {
    type: BoundingBoxConsts.SET_BOUNDING_BOX_DIALOG_OPEN,
    payload: data,
  };
};

export const setBoundingBoxDialogColors = (
  data: BoundingBoxReducerStateType["boxColors"],
): BoundingBoxActionSetterType["boxColors"] => {
  return {
    type: BoundingBoxConsts.SET_BOUNDING_BOX_COLORS,
    payload: data,
  };
};

export const setBoundingBoxDialogPercentageDisplay = (
  data: BoundingBoxReducerStateType["isPercentageDisplayed"],
): BoundingBoxActionSetterType["isPercentageDisplayed"] => {
  return {
    type: BoundingBoxConsts.SET_BOUNDING_BOX_PERCENTAGE_DISPLAY,
    payload: data,
  };
};
