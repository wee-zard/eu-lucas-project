import { DialogToOpens } from "../../model/enum";
import { DialogConsts } from "../consts/dialogConsts";

export const setDialogToOpen = (data?: DialogToOpens) => {
  return {
    type: DialogConsts.SET_DIALOG_TO_OPEN,
    payload: data,
  };
};

export const setFolderCreationDialogOpen = (data: boolean) => {
  return {
    type: DialogConsts.SET_FOLDER_CREATION_DIALOG_OPEN,
    payload: data,
  };
};
