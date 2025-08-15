import BoundingBoxReducerStateType from "@redux/types/boundingBoxReducerStateType";
import { BoundingBoxConsts } from "@redux/consts/boundingBoxConsts";

interface BoundingBoxActionSetterType {
  isBoundingBoxDialogOpen: {
    type: BoundingBoxConsts.SET_BOUNDING_BOX_DIALOG_OPEN;
    payload: BoundingBoxReducerStateType["isBoundingBoxDialogOpen"];
  };
}

export default BoundingBoxActionSetterType;
