import DialogReducerStateType from "@redux/types/dialogReducerStateType";
import { DialogConsts } from "@redux/consts/dialogConsts";

interface DialogActionSetterType {
  isImageToFolderAdditionDialogOpen: {
    type: DialogConsts.IMAGE_TO_FOLDER_ADDITION_DIALOG_OPEN;
    payload: DialogReducerStateType["isImageToFolderAdditionDialogOpen"];
  };
}

export default DialogActionSetterType;
