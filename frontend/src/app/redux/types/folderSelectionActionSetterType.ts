import { FolderSelectionConsts } from "@redux/consts/folderSelectionConsts";
import FolderSelectionReducerStateType from "./folderSelectionReducerStateType";

interface FolderSelectionActionSetterType {
  isOpen: {
    type: FolderSelectionConsts.SET_FOLDER_SELECTION_DIALOG_OPEN;
    payload: FolderSelectionReducerStateType["isOpen"];
  };
  folder: {
    type: FolderSelectionConsts.SET_FOLDER_SELECTION_DIALOG_EDITING_FOLDER;
    payload: FolderSelectionReducerStateType["folder"];
  };
  response: {
    type: FolderSelectionConsts.SET_FOLDER_SELECTION_DIALOG_RESPONSE;
    payload: FolderSelectionReducerStateType["response"];
  };
  menuAction: {
    type: FolderSelectionConsts.SET_FOLDER_SELECTION_DIALOG_MENU_ACTION;
    payload: FolderSelectionReducerStateType["menuAction"];
  };
}

export default FolderSelectionActionSetterType;
