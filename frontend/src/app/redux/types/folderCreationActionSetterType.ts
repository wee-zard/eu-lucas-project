import { FolderCreationConsts } from "@redux/consts/folderCreationConsts";
import FolderCreationReducerStateType from "./folderCreationReducerStateType";

interface FolderCreationActionSetterType {
  isOpen: {
    type: FolderCreationConsts.SET_FOLDER_CREATION_DIALOG_OPEN;
    payload: FolderCreationReducerStateType["isOpen"];
  };
  isEmptyFolderCreated: {
    type: FolderCreationConsts.SET_FOLDER_CREATION_DIALOG_EMPTY_FOLDER_CREATED;
    payload: FolderCreationReducerStateType["isEmptyFolderCreated"];
  };
  selectedFolderId: {
    type: FolderCreationConsts.SET_FOLDER_CREATION_DIALOG_EDITING_FOLDER;
    payload: FolderCreationReducerStateType["selectedFolderId"];
  };
}

export default FolderCreationActionSetterType;
