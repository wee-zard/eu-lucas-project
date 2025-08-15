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
