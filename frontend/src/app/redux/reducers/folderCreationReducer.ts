import { FolderCreationConsts } from "@redux/consts/folderCreationConsts";
import FolderCreationActionTypes from "@redux/types/folderCreationActionTypes";
import FolderCreationReducerStateType from "@redux/types/folderCreationReducerStateType";

const initialState: FolderCreationReducerStateType = {
  isOpen: false,
  isEmptyFolderCreated: false,
  selectedFolderId: undefined,
};

const folderCreationReducer = (
  state = initialState,
  action: FolderCreationActionTypes,
): FolderCreationReducerStateType => {
  switch (action.type) {
    case FolderCreationConsts.SET_FOLDER_CREATION_DIALOG_OPEN:
      return action.payload
        ? {
            ...state,
            isOpen: action.payload,
          }
        : {
            ...state,
            isOpen: action.payload,
            isEmptyFolderCreated: false,
            selectedFolderId: undefined,
          };
    case FolderCreationConsts.SET_FOLDER_CREATION_DIALOG_EMPTY_FOLDER_CREATED:
      return {
        ...state,
        isEmptyFolderCreated: action.payload,
      };
    case FolderCreationConsts.SET_FOLDER_CREATION_DIALOG_EDITING_FOLDER:
      return {
        ...state,
        selectedFolderId: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default folderCreationReducer;
