import { RootState } from "@redux/store";

export const selectIsBackdropOpen = (state: RootState) => state.backgroundStore.isBackdropOpen;

export const selectBackdropConfig = (state: RootState) => state.backgroundStore.backdropConfig;

export const selectBackgroundCanvasDataUrl = (state: RootState) =>
  state.backgroundStore.canvasDataUrl;

export const selectBackgroundCanvasImageProperties = (state: RootState) =>
  state.backgroundStore.canvasImageProperties;
