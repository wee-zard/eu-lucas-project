import { FolderConsts } from "@redux/consts/folderConsts";
import FolderActionTypes from "@redux/types/folderActionTypes";
import FolderReducerStateType from "@redux/types/folderReducerStateType";

const initialState: FolderReducerStateType = {
  isFolderCreationDialogOpen: false,
  isImageToFolderAdditionDialogOpen: false,
  selectedFolderSettingCellOption: undefined,
};

const folderReducer = (state = initialState, action: FolderActionTypes): FolderReducerStateType => {
  switch (action.type) {
    case FolderConsts.SET_FOLDER_CREATION_DIALOG_OPEN:
      return {
        ...state,
        isFolderCreationDialogOpen: action.payload,
      };
    case FolderConsts.SET_IMAGE_TO_FOLDER_ADDITION_DIALOG_OPEN:
      return {
        ...state,
        isImageToFolderAdditionDialogOpen: action.payload,
      };
    case FolderConsts.SET_SELECTED_FOLDER_SETTING_CELL_OPTION:
      return {
        ...state,
        selectedFolderSettingCellOption: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default folderReducer;
