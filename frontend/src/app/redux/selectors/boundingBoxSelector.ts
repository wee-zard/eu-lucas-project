import { RootState } from "@redux/store";

export const selectIsBoundingBoxDialogOpen = (state: RootState) =>
  state.boundingBoxStore.isBoundingBoxDialogOpen;
