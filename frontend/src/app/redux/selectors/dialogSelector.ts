import { DialogToOpens } from "@model/enum";
import { RootState } from "@redux/store";

export const selectDialogToOpen = (state: RootState) => state.dialogStore.dialogToOpen;

export const selectIsDialogOpen = (state: RootState, dialogToOpen: DialogToOpens) =>
  selectDialogToOpen(state) === dialogToOpen;

export const selectIsFolderCreationDialogOpen = (state: RootState) =>
  state.dialogStore.isAddFolderDialogOpen;
