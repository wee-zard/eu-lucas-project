import { RootState } from "@redux/store";

export const selectSelectedFolderSettingCellOption = (state: RootState) =>
  state.folderStore.selectedFolderSettingCellOption;
