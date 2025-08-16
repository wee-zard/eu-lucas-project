import FolderReducerStateType from "./folderReducerStateType";
import { FolderConsts } from "@redux/consts/folderConsts";

interface FolderActionSetterType {
  selectedFolderSettingCellOption: {
    type: FolderConsts.SET_SELECTED_FOLDER_SETTING_CELL_OPTION;
    payload: FolderReducerStateType["selectedFolderSettingCellOption"];
  };
  isFolderCreationDialogOpen: {
    type: FolderConsts.SET_FOLDER_CREATION_DIALOG_OPEN;
    payload: FolderReducerStateType["isFolderCreationDialogOpen"];
  };
  isImageToFolderAdditionDialogOpen: {
    type: FolderConsts.SET_IMAGE_TO_FOLDER_ADDITION_DIALOG_OPEN;
    payload: FolderReducerStateType["isImageToFolderAdditionDialogOpen"];
  };
}

export default FolderActionSetterType;
