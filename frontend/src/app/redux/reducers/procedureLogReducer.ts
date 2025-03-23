import { UnknownAction } from "redux";
import ProcedureLogDto from "@model/dto/ProcedureLogDto";
import { ProcedureLogConsts } from "@redux/consts/procedureLogConsts";
import SelectedProcedureLogModel from "@model/models/SelectedProcedureLogModel";
import PageableProperties from "@model/PageableProperties";
import { PROCEDURE_LOG_PAGE_SIZE } from "@global/globalConsts";

interface ReducerStateType {
  listOfProcedureLogs: ProcedureLogDto[];
  selectedListOfProcedureLogs: SelectedProcedureLogModel[];
  pageableProperties: PageableProperties;
}

const initialState: ReducerStateType = {
  listOfProcedureLogs: [],
  selectedListOfProcedureLogs: [],
  pageableProperties: {
    pageNo: 0,
    pageSize: PROCEDURE_LOG_PAGE_SIZE,
  },
};

const procedureLogReducer = (state = initialState, action: UnknownAction): ReducerStateType => {
  switch (action.type) {
    case ProcedureLogConsts.SET_PROCEDURE_LOGS:
      return {
        ...state,
        listOfProcedureLogs: action.payload as ProcedureLogDto[],
      };
    case ProcedureLogConsts.SET_PROCEDURE_LOG_SELECTED_LOGS:
      return {
        ...state,
        selectedListOfProcedureLogs: action.payload as SelectedProcedureLogModel[],
      };
    case ProcedureLogConsts.SET_PROCEDURE_LOG_PAGEABLE_PROPERTIEs:
      return {
        ...state,
        pageableProperties: action.payload as PageableProperties,
      };
    default:
      return state;
  }
};

export default procedureLogReducer;
