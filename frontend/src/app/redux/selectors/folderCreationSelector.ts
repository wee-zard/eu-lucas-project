import { RootState } from "@redux/store";

export const selectIsFolderCreationDialogOpen = (state: RootState) =>
  state.folderCreationStore.isFolderCreationDialogOpen;
