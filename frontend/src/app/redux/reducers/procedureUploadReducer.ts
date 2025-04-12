import ProcedureProcessModel from "@model/ProcedureProcessModel";
import { ProcedureUploadActionTypes } from "@redux/consts/procedureUploadActionTypes";
import { ProcedureUploadConsts } from "@redux/consts/procedureUploadConsts";

interface ProcedureUploadReducerStateType {
  listOfProcedureProcesses: ProcedureProcessModel[];
}

const initialState: ProcedureUploadReducerStateType = {
  listOfProcedureProcesses: [],
};

const procedureUploadReducer = (
  state = initialState,
  action: ProcedureUploadActionTypes,
): ProcedureUploadReducerStateType => {
  switch (action.type) {
    case ProcedureUploadConsts.SET_PROCEDURE_PROCESS_MODELS:
      return {
        ...state,
        listOfProcedureProcesses: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default procedureUploadReducer;
