import { RootState } from "../store";

export const selectSelectedImages = (state: RootState) => state.imageStore.selectedImages;