import ProcedureDto from "@model/dto/ProcedureDto";
import { ProcedureConsts } from "@redux/consts/procedureConsts";
import { UnknownAction } from "redux";

interface ReducerStateType {
  isProcedureLoading: boolean;
  listOfProcedures: ProcedureDto[];
}

const initialState: ReducerStateType = {
  isProcedureLoading: false,
  listOfProcedures: [],
};

const procedureReducer = (state = initialState, action: UnknownAction): ReducerStateType => {
  switch (action.type) {
    case ProcedureConsts.REQUESTING_PROCEDURE_FAILED:
      return {
        ...state,
        isProcedureLoading: false,
      };
    case ProcedureConsts.REQUESTING_PROCEDURE_SUCCEEDED:
      return {
        ...state,
        listOfProcedures: action.payload as ProcedureDto[],
        isProcedureLoading: false,
      };
    case ProcedureConsts.REQUEST_PROCEDURE:
      return {
        ...state,
        isProcedureLoading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default procedureReducer;
