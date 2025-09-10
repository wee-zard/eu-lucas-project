import { FolderCreationConsts } from "@redux/consts/folderCreationConsts";
import FolderCreationActionSetterType from "@redux/types/folderCreationActionSetterType";
import FolderCreationReducerStateType from "@redux/types/folderCreationReducerStateType";

export const setFolderCreationDialogToOpen = (
  data: FolderCreationReducerStateType["isOpen"],
): FolderCreationActionSetterType["isOpen"] => {
  return {
    type: FolderCreationConsts.SET_FOLDER_CREATION_DIALOG_OPEN,
    payload: data,
  };
};

export const setFolderCreationDialogEmptyCreate = (
  data: FolderCreationReducerStateType["isEmptyFolderCreated"],
): FolderCreationActionSetterType["isEmptyFolderCreated"] => {
  return {
    type: FolderCreationConsts.SET_FOLDER_CREATION_DIALOG_EMPTY_FOLDER_CREATED,
    payload: data,
  };
};

export const setFolderCreationDialogEditingFolderId = (
  data: FolderCreationReducerStateType["selectedFolderId"],
): FolderCreationActionSetterType["selectedFolderId"] => {
  return {
    type: FolderCreationConsts.SET_FOLDER_CREATION_DIALOG_EDITING_FOLDER,
    payload: data,
  };
};
