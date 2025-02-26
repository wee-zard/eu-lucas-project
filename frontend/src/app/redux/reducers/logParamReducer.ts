import ProcedureLogParamDto from "@model/dto/ProcedureLogParamDto";
import { ProcedureLogParamConsts } from "@redux/consts/procedureLogParamConsts";
import { UnknownAction } from "redux";

interface ReducerStateType {
  isProcedureLogParamLoading: boolean;
  listOfProcedureLogParams: ProcedureLogParamDto[];
}

const initialState: ReducerStateType = {
  isProcedureLogParamLoading: false,
  listOfProcedureLogParams: [],
};

const logParamReducer = (state = initialState, action: UnknownAction): ReducerStateType => {
  switch (action.type) {
    case ProcedureLogParamConsts.REQUESTING_PROCEDURE_LOG_PARAM_FAILED:
      return {
        ...state,
        isProcedureLogParamLoading: false,
      };
    case ProcedureLogParamConsts.REQUESTING_PROCEDURE_LOG_PARAM_SUCCEEDED:
      return {
        ...state,
        listOfProcedureLogParams: action.payload as ProcedureLogParamDto[],
        isProcedureLogParamLoading: false,
      };
    case ProcedureLogParamConsts.REQUEST_PROCEDURE_LOG_PARAM:
      return {
        ...state,
        isProcedureLogParamLoading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default logParamReducer;
