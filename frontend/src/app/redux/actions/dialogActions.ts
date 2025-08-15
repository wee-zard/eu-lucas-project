import DialogActionSetterType from "@redux/types/dialogActionSetterType";
import { DialogConsts } from "../consts/dialogConsts";
import DialogReducerStateType from "@redux/types/dialogReducerStateType";

export const setImageToFolderAdditionDialogOpen = (
  data: DialogReducerStateType["isImageToFolderAdditionDialogOpen"],
): DialogActionSetterType["isImageToFolderAdditionDialogOpen"] => {
  return {
    type: DialogConsts.IMAGE_TO_FOLDER_ADDITION_DIALOG_OPEN,
    payload: data,
  };
};
