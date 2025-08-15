import { RootState } from "@redux/store";

export const selectIsImageToFolderAdditionDialogOpen = (state: RootState) =>
  state.dialogStore.isImageToFolderAdditionDialogOpen;
