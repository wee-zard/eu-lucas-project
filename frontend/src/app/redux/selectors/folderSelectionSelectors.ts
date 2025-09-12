import { RootState } from "@redux/store";

export const selectFolderSelectionIsOpen = (state: RootState) => state.folderSelectionStore.isOpen;

export const selectFolderSelectionFolder = (state: RootState) => state.folderSelectionStore.folder;

export const selectFolderSelectionResponse = (state: RootState) =>
  state.folderSelectionStore.response;

export const selectFolderSelectionStorage = (state: RootState) => state.folderSelectionStore;
