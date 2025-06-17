import { DialogToOpens } from "../../model/enum";
import { DialogConsts } from "../consts/dialogConsts";
import { DialogActionTypes } from "@redux/consts/dialogActionTypes";

interface Dialogtype {
  dialogToOpen?: DialogToOpens;
  isAddFolderDialogOpen: boolean;
}

const initialState: Dialogtype = {
  dialogToOpen: undefined,
  isAddFolderDialogOpen: false,
};

const dialogReducer = (state = initialState, action: DialogActionTypes): Dialogtype => {
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
    default:
      return {
        ...state,
      };
  }
};

export default dialogReducer;
