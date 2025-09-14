import { ProcedureLogConsts } from "@redux/consts/procedureLogConsts";
import SelectedProcedureLogModel from "@model/models/SelectedProcedureLogModel";
import PageableProperties from "@model/PageableProperties";
import { UnknownAction } from "@reduxjs/toolkit";
import { boundingBoxPageable } from "@dialogs/boundBoxDialog/helper/BoundingBoxDialogHelper";

interface ReducerStateType {
  selectedProcedureLogs: SelectedProcedureLogModel[];
  pageableProperties: PageableProperties;
}

const initialState: ReducerStateType = {
  selectedProcedureLogs: [],
  pageableProperties: boundingBoxPageable,
};

const procedureLogReducer = (state = initialState, action: UnknownAction): ReducerStateType => {
  switch (action.type) {
    case ProcedureLogConsts.SET_PROCEDURE_LOG_SELECTED_LOGS:
      return {
        ...state,
        selectedProcedureLogs: action.payload as SelectedProcedureLogModel[],
      };
    case ProcedureLogConsts.SET_PROCEDURE_LOG_PAGEABLE_PROPERTIEs:
      return {
        ...state,
        pageableProperties: action.payload as PageableProperties,
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
