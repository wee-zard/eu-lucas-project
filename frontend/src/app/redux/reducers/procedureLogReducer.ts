import { ProcedureLogConsts } from "@redux/consts/procedureLogConsts";
import SelectedProcedureLogModel from "@model/models/SelectedProcedureLogModel";
import PageableProperties from "@model/PageableProperties";
import { boundingBoxPageable } from "@dialogs/boundBoxDialog/helper/BoundingBoxDialogHelper";
import { LogSettingCellType } from "@model/types/SelectedSettingCellType";
import { ProcedureLogActionTypes } from "@redux/consts/procedureLogActionTypes";

interface ReducerStateType {
  selectedProcedureLogs: SelectedProcedureLogModel[];
  pageableProperties: PageableProperties;
  selectedLogSettingCellOption?: LogSettingCellType;
}

const initialState: ReducerStateType = {
  selectedProcedureLogs: [],
  pageableProperties: boundingBoxPageable,
  selectedLogSettingCellOption: undefined,
};

const procedureLogReducer = (
  state = initialState,
  action: ProcedureLogActionTypes,
): ReducerStateType => {
  switch (action.type) {
    case ProcedureLogConsts.SET_PROCEDURE_LOG_SELECTED_LOGS:
      return {
        ...state,
        selectedProcedureLogs: action.payload,
      };
    case ProcedureLogConsts.SET_PROCEDURE_LOG_PAGEABLE_PROPERTIEs:
      return {
        ...state,
        pageableProperties: action.payload,
      };
    case ProcedureLogConsts.SET_PROCEDURE_LOG_SETTING_CELL:
      return {
        ...state,
        selectedLogSettingCellOption: action.payload,
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
