import { RootState } from "../store";

export const selectSelectedImages = (state: RootState) => state.imageStore.selectedImages;

export const selectSelectedFilterTab = (state: RootState) => state.imageStore.selectedFilterTab;

export const selectFilterMenuActions = (state: RootState) => state.imageStore.filterMenuAction;

export const selectImageStorage = (state: RootState) => state.imageStore;
