import ProcedureLogDto from "@model/dto/ProcedureLogDto";
import SelectedProcedureLogModel from "@model/models/SelectedProcedureLogModel";
import PageableProperties from "@model/PageableProperties";
import { ProcedureLogConsts } from "@redux/consts/procedureLogConsts";

export const setProcedureLogListOfProcedureLogs = (data: ProcedureLogDto[]) => {
  return {
    type: ProcedureLogConsts.SET_PROCEDURE_LOGS,
    payload: data,
  };
};

export const setProcedureLogSelectedProcedureLogs = (data: SelectedProcedureLogModel[]) => {
  return {
    type: ProcedureLogConsts.SET_PROCEDURE_LOG_SELECTED_LOGS,
    payload: data,
  };
};

export const setProcedureLogPageableProperties = (data: PageableProperties) => {
  return {
    type: ProcedureLogConsts.SET_PROCEDURE_LOG_PAGEABLE_PROPERTIEs,
    payload: data,
  };
};
