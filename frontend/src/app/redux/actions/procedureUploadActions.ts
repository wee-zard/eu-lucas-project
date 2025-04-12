import ProcedureProcessModel from "@model/ProcedureProcessModel";
import { ProcedureUploadConsts } from "@redux/consts/procedureUploadConsts";

export const setProcedureUploadProcessModels = (data: ProcedureProcessModel[]) => {
  return {
    type: ProcedureUploadConsts.SET_PROCEDURE_PROCESS_MODELS,
    payload: data,
  };
};
