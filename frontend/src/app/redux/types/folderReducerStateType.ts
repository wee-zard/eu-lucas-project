import SelectedFolderSettingCellType from "@model/types/SelectedFolderSettingCellType";

interface FolderReducerStateType {
  /**
   * Tells what setting cell option was selected by the user.
   */
  selectedFolderSettingCellOption?: SelectedFolderSettingCellType;
  /**
   * Tells wether the "Image to Folder Addition" dialog is open or not.
   */
  isImageToFolderAdditionDialogOpen: boolean;
  /**
   * Tells wether the "Folder creation" dialog is open or not.
   */
  isOpen: boolean;
}

export default FolderReducerStateType;
