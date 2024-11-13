import { RootState } from "../store";

export const selectSelectedImages = (state: RootState) => state.imageStore.selectedImages;

export const selectSelectedFilterTab = (state: RootState) => state.imageStore.selectedFilterTab;

export const selectImageFilteringForm = (state: RootState) => state.imageStore.imageFilteringForm;
