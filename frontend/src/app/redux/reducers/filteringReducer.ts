import { FilteringConsts } from "@redux/consts/filteringConsts";
import FilteringActionTypes from "@redux/types/filteringActionTypes";
import FilteringReducerStateType from "@redux/types/filteringReducerStateType";

const initialState: FilteringReducerStateType = {
  isFilteringDialogOpen: false,
};

const filteringReducer = (
  state = initialState,
  action: FilteringActionTypes,
): FilteringReducerStateType => {
  switch (action.type) {
    case FilteringConsts.SET_FILTERING_DIALOG_OPEN:
      return {
        ...state,
        isFilteringDialogOpen: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default filteringReducer;
