import { RootState } from "@redux/store";

export const selectListOfSelectedImages = (state: RootState) =>
  state.imageStore.listOfSelectedImages;

export const selectSelectedImageModel = (state: RootState) => state.imageStore.selectedImageModel;

export const selectSelectedImage = (state: RootState) => state.imageStore.selectedImage;

export const selectFilterMenuActions = (state: RootState) => state.imageStore.filterMenuAction;

export const selectFilteringPageableProperties = (State: RootState) =>
  State.imageStore.filteringPageableProperties;

export const selectImageStorage = (state: RootState) => state.imageStore;
