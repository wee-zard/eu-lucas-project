import { RootState } from "@redux/store";

export const selectSelectedImagesModel = (state: RootState) => state.imageStore.selectedImagesModel;

export const selectQueriedImageModel = (state: RootState) => state.imageStore.queriedImageModel;

export const selectSelectedImage = (state: RootState) => state.imageStore.selectedImage;

export const selectFilterMenuActions = (state: RootState) => state.imageStore.filterMenuAction;

export const selectFilteringPageableProperties = (state: RootState) =>
  state.imageStore.filterPageable;

export const selectFilteringPageableResponse = (state: RootState) =>
  state.imageStore.filteringResponse;

export const selectImageStorage = (state: RootState) => state.imageStore;
