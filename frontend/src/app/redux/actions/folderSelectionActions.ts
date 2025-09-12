import { FolderSelectionConsts } from "@redux/consts/folderSelectionConsts";
import FolderSelectionActionSetterType from "@redux/types/folderSelectionActionSetterType";
import FolderSelectionReducerStateType from "@redux/types/folderSelectionReducerStateType";

export const setFolderSelectionToOpen = (
  data: FolderSelectionReducerStateType["isOpen"],
): FolderSelectionActionSetterType["isOpen"] => {
  return {
    type: FolderSelectionConsts.SET_FOLDER_SELECTION_DIALOG_OPEN,
    payload: data,
  };
};

export const setFolderSelectionFolderId = (
  data: FolderSelectionReducerStateType["folder"],
): FolderSelectionActionSetterType["folder"] => {
  return {
    type: FolderSelectionConsts.SET_FOLDER_SELECTION_DIALOG_EDITING_FOLDER,
    payload: data,
  };
};

export const setFolderSelectionResponse = (
  data: FolderSelectionReducerStateType["response"],
): FolderSelectionActionSetterType["response"] => {
  return {
    type: FolderSelectionConsts.SET_FOLDER_SELECTION_DIALOG_RESPONSE,
    payload: data,
  };
};

export const setFolderSelectionMenuAction = (
  data: FolderSelectionReducerStateType["menuAction"],
): FolderSelectionActionSetterType["menuAction"] => {
  return {
    type: FolderSelectionConsts.SET_FOLDER_SELECTION_DIALOG_MENU_ACTION,
    payload: data,
  };
};
