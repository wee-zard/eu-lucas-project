import { RootState } from "@redux/store";

export const selectIsFilteringDialogOpen = (state: RootState) =>
  state.filteringStore.isFilteringDialogOpen;
