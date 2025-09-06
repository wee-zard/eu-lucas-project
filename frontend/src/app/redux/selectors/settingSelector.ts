import { RootState } from "@redux/store";

export const selectIsBackdropOpen = (state: RootState) => state.settingStore.isBackdropOpen;

export const selectBackdropConfig = (state: RootState) => state.settingStore.backdropConfig;
