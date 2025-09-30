import FolderDtoSlice from "@model/dto/FolderDtoSlice";
import ProcedureLogDto from "@model/dto/ProcedureLogDto";
import { FolderSettingCellEnum } from "@model/enum/FolderSettingCellEnum";
import { LogSettingCellEnum } from "@model/enum/LogSettingCellEnum";

type SelectedSettingCellType<T, K> = {
  option: T;
  data: K;
};

export type FolderSettingCellType = SelectedSettingCellType<FolderSettingCellEnum, FolderDtoSlice>;

export type LogSettingCellType = SelectedSettingCellType<LogSettingCellEnum, ProcedureLogDto>;

export default SelectedSettingCellType;
