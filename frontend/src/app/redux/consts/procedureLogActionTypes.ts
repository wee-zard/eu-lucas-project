import { ProcedureLogConsts } from "./procedureLogConsts";
import SelectedProcedureLogModel from "@model/models/SelectedProcedureLogModel";
import PageableProperties from "@model/PageableProperties";
import { LogSettingCellType } from "@model/types/SelectedSettingCellType";

interface setProcedureLogSelectedProcedureLogs {
  type: ProcedureLogConsts.SET_PROCEDURE_LOG_SELECTED_LOGS;
  payload: SelectedProcedureLogModel[];
}
interface setProcedureLogPageableProperties {
  type: ProcedureLogConsts.SET_PROCEDURE_LOG_PAGEABLE_PROPERTIEs;
  payload: PageableProperties;
}
interface setProcedureLogSettingCell {
  type: ProcedureLogConsts.SET_PROCEDURE_LOG_SETTING_CELL;
  payload?: LogSettingCellType;
}
interface setProcedureLogStorageToDefault {
  type: ProcedureLogConsts.SET_PROCEDURE_LOG_STORAGE_TO_DEFAULT;
}

export type ProcedureLogActionTypes =
  | setProcedureLogSelectedProcedureLogs
  | setProcedureLogSettingCell
  | setProcedureLogPageableProperties
  | setProcedureLogStorageToDefault;
