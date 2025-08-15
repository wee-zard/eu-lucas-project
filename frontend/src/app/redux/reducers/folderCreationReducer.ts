import { FolderCreationConsts } from "@redux/consts/folderCreationConsts";
import FolderCreationActionTypes from "@redux/types/folderCreationActionTypes";
import FolderCreationReducerStateType from "@redux/types/folderCreationReducerStateType";

const initialState: FolderCreationReducerStateType = {
  isFolderCreationDialogOpen: false,
};

const folderCreationReducer = (
  state = initialState,
  action: FolderCreationActionTypes,
): FolderCreationReducerStateType => {
  switch (action.type) {
    case FolderCreationConsts.SET_FOLDER_CREATION_DIALOG_OPEN:
      return {
        ...state,
        isFolderCreationDialogOpen: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default folderCreationReducer;
