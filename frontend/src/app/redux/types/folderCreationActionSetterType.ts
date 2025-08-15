import { FolderCreationConsts } from "@redux/consts/folderCreationConsts";
import FolderCreationReducerStateType from "./folderCreationReducerStateType";

interface FolderCreationActionSetterType {
  isFolderCreationDialogOpen: {
    type: FolderCreationConsts.SET_FOLDER_CREATION_DIALOG_OPEN;
    payload: FolderCreationReducerStateType["isFolderCreationDialogOpen"];
  };
}

export default FolderCreationActionSetterType;
