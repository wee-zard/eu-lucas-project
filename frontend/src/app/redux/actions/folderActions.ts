import { FolderConsts } from "@redux/consts/folderConsts";
import FolderActionSetterType from "@redux/types/folderActionSetterType";
import FolderReducerStateType from "@redux/types/folderReducerStateType";

export const setFolderSettingCellOption = (
  data: FolderReducerStateType["selectedFolderSettingCellOption"],
): FolderActionSetterType["selectedFolderSettingCellOption"] => {
  return {
    type: FolderConsts.SET_SELECTED_FOLDER_SETTING_CELL_OPTION,
    payload: data,
  };
};

export const setImageToFolderAdditionDialogOpen = (
  data: FolderReducerStateType["isImageToFolderAdditionDialogOpen"],
): FolderActionSetterType["isImageToFolderAdditionDialogOpen"] => {
  return {
    type: FolderConsts.SET_IMAGE_TO_FOLDER_ADDITION_DIALOG_OPEN,
    payload: data,
  };
};

export const setFolderCreationDialogOpen = (
  data: FolderReducerStateType["isFolderCreationDialogOpen"],
): FolderActionSetterType["isFolderCreationDialogOpen"] => {
  return {
    type: FolderConsts.SET_FOLDER_CREATION_DIALOG_OPEN,
    payload: data,
  };
};
