import { ProcedureLogConsts } from "./procedureLogConsts";
import { Action } from "@reduxjs/toolkit";
import SelectedProcedureLogModel from "@model/models/SelectedProcedureLogModel";
import PageableProperties from "@model/PageableProperties";

interface setProcedureLogSelectedProcedureLogs extends Action {
  type: ProcedureLogConsts.SET_PROCEDURE_LOG_SELECTED_LOGS;
  payload: SelectedProcedureLogModel[];
}
interface setProcedureLogPageableProperties extends Action {
  type: ProcedureLogConsts.SET_PROCEDURE_LOG_PAGEABLE_PROPERTIEs;
  payload: PageableProperties;
}
interface setProcedureLogStorageToDefault extends Action {
  type: ProcedureLogConsts.SET_PROCEDURE_LOG_STORAGE_TO_DEFAULT;
}

export type ProcedureLogActionTypes =
  | setProcedureLogSelectedProcedureLogs
  | setProcedureLogPageableProperties
  | setProcedureLogStorageToDefault;
