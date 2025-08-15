import { FolderCreationConsts } from "@redux/consts/folderCreationConsts";
import FolderCreationActionSetterType from "@redux/types/folderCreationActionSetterType";
import FolderCreationReducerStateType from "@redux/types/folderCreationReducerStateType";

export const setFolderCreationDialogToOpen = (
  data: FolderCreationReducerStateType["isFolderCreationDialogOpen"],
): FolderCreationActionSetterType["isFolderCreationDialogOpen"] => {
  return {
    type: FolderCreationConsts.SET_FOLDER_CREATION_DIALOG_OPEN,
    payload: data,
  };
};
