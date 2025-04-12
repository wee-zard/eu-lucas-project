import ProcedureProcessModel from "@model/ProcedureProcessModel";
import { ProcedureUploadConsts } from "./procedureUploadConsts";

interface setProcedureUploadProcessModels {
  type: ProcedureUploadConsts.SET_PROCEDURE_PROCESS_MODELS;
  payload: ProcedureProcessModel[];
}

export type ProcedureUploadActionTypes = setProcedureUploadProcessModels;
