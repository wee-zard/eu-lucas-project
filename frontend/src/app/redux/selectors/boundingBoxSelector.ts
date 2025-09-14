import { RootState } from "@redux/store";

export const selectIsBoundingBoxDialogOpen = (state: RootState) =>
  state.boundingBoxStore.isBoundingBoxDialogOpen;

export const selectBoundingBoxColors = (state: RootState) => state.boundingBoxStore.boxColors;
