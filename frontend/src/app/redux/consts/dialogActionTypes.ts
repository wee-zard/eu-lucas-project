import { DialogToOpens } from "@model/enum";
import { DialogConsts } from "./dialogConsts";

interface setDialogToOpen {
  type: DialogConsts.SET_DIALOG_TO_OPEN;
  payload?: DialogToOpens;
}
interface setFolderCreationDialogOpen {
  type: DialogConsts.SET_FOLDER_CREATION_DIALOG_OPEN;
  payload: boolean;
}

export type DialogActionTypes = setDialogToOpen | setFolderCreationDialogOpen;