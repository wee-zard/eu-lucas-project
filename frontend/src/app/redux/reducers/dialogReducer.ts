import { DialogToOpens } from "../../model/enum";
import { DialogConsts } from "../consts/dialogConsts";
import { DialogActionTypes } from "@redux/consts/dialogActionTypes";

interface DialogType {
  dialogToOpen?: DialogToOpens;
  isAddFolderDialogOpen: boolean;
  isImageToFolderAdditionDialogOpen: boolean;
}

const initialState: DialogType = {
  dialogToOpen: undefined,
  isAddFolderDialogOpen: false,
  isImageToFolderAdditionDialogOpen: false,
};

const dialogReducer = (state = initialState, action: DialogActionTypes): DialogType => {
  switch (action.type) {
    case DialogConsts.SET_DIALOG_TO_OPEN:
      return {
        ...state,
        dialogToOpen: action.payload,
      };
    case DialogConsts.SET_FOLDER_CREATION_DIALOG_OPEN:
      return {
        ...state,
        isAddFolderDialogOpen: action.payload,
      };
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
