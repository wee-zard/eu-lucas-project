import FilteringReducerStateType from "@redux/types/filteringReducerStateType";
import { FilteringConsts } from "@redux/consts/filteringConsts";

interface FilteringActionSetterType {
  isFilteringDialogOpen: {
    type: FilteringConsts.SET_FILTERING_DIALOG_OPEN;
    payload: FilteringReducerStateType["isFilteringDialogOpen"];
  };
}

export default FilteringActionSetterType;
