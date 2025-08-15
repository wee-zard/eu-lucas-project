import DialogReducerStateType from "@redux/types/dialogReducerStateType";
import { DialogConsts } from "@redux/consts/dialogConsts";
import DialogActionTypes from "@redux/types/dialogActionTypes";

const initialState: DialogReducerStateType = {
  isImageToFolderAdditionDialogOpen: false,
};

const dialogReducer = (state = initialState, action: DialogActionTypes): DialogReducerStateType => {
  switch (action.type) {
    case DialogConsts.IMAGE_TO_FOLDER_ADDITION_DIALOG_OPEN:
      return {
        ...state,
        isImageToFolderAdditionDialogOpen: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default dialogReducer;
