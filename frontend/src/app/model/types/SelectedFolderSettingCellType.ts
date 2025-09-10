import FolderDtoSlice from "@model/dto/FolderDtoSlice";
import { FolderSettingCellEnum } from "@model/enum/FolderSettingCellEnum";

type SelectedFolderSettingCellType = {
  option: FolderSettingCellEnum;
  folder: FolderDtoSlice;
};

export default SelectedFolderSettingCellType;
