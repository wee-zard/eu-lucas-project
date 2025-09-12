import { MenuActions } from "@model/enum";
import { FolderSelectionConsts } from "@redux/consts/folderSelectionConsts";
import FolderSelectionActionTypes from "@redux/types/folderSelectionActionTypes";
import FolderSelectionReducerStateType from "@redux/types/folderSelectionReducerStateType";

const initialState: FolderSelectionReducerStateType = {
  isOpen: false,
  folder: undefined,
  response: undefined,
  menuAction: MenuActions.PAGINATION_CHANGE,
};

const folderSelectionReducer = (
  state = initialState,
  action: FolderSelectionActionTypes,
): FolderSelectionReducerStateType => {
  switch (action.type) {
    case FolderSelectionConsts.SET_FOLDER_SELECTION_DIALOG_OPEN:
      return {
        ...state,
        isOpen: action.payload,
      };
    case FolderSelectionConsts.SET_FOLDER_SELECTION_DIALOG_EDITING_FOLDER:
      return {
        ...state,
        folder: action.payload,
      };
    case FolderSelectionConsts.SET_FOLDER_SELECTION_DIALOG_RESPONSE:
      return {
        ...state,
        response: action.payload,
      };
    case FolderSelectionConsts.SET_FOLDER_SELECTION_DIALOG_MENU_ACTION:
      return {
        ...state,
        menuAction: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default folderSelectionReducer;
