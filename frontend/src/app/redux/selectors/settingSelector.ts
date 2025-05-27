import { RootState } from "@redux/store";

export const selectIsBackdropOpen = (state: RootState) => state.settingStore.isBackdropOpen;
