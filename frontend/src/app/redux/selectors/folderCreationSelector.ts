import { RootState } from "@redux/store";

export const selectIsFolderCreationDialogOpen = (state: RootState) =>
  state.folderCreationStore.isOpen;

export const selectIsEmptyFolderCreated = (state: RootState) =>
  state.folderCreationStore.isEmptyFolderCreated;

export const selectIsEditModeOn = (state: RootState) => state.folderCreationStore.selectedFolderId;

export const selectFolderCreationDialogStorage = (state: RootState) => state.folderCreationStore;
