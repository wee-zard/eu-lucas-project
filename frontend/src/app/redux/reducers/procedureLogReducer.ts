import ProcedureLogDto from "@model/dto/ProcedureLogDto";
import { ProcedureLogConsts } from "@redux/consts/procedureLogConsts";
import SelectedProcedureLogModel from "@model/models/SelectedProcedureLogModel";
import PageableProperties from "@model/PageableProperties";
import { UnknownAction } from "@reduxjs/toolkit";
import { defaultBoundingBoxPageableProperties } from "@dialogs/boundBoxDialog/helper/BoundingBoxDialogHelper";

interface ReducerStateType {
  listOfProcedureLogs: ProcedureLogDto[];
  selectedListOfProcedureLogs: SelectedProcedureLogModel[];
  pageableProperties: PageableProperties;
  isLogButtonDisabled: boolean;
}

const initialState: ReducerStateType = {
  listOfProcedureLogs: [],
  selectedListOfProcedureLogs: [],
  pageableProperties: defaultBoundingBoxPageableProperties,
  isLogButtonDisabled: true,
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
    case ProcedureLogConsts.SET_PROCEDURE_LOG_IS_LOG_BUTTON_DISABLED:
      return {
        ...state,
        isLogButtonDisabled: action.payload as boolean,
      };
    case ProcedureLogConsts.SET_PROCEDURE_LOG_STORAGE_TO_DEFAULT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default procedureLogReducer;
