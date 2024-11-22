import { RootState } from "../store";

export const selectIsExifKeyLoading = (state: RootState) => state.exifKeyStore.isExifKeysLoading;

export const selectListOfExifKeys = (state: RootState) => state.exifKeyStore.listOfExifKeys;
