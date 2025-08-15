import { FilteringConsts } from "@redux/consts/filteringConsts";
import FilteringActionSetterType from "@redux/types/filteringActionSetterType";
import FilteringReducerStateType from "@redux/types/filteringReducerStateType";

export const setFilteringDialogToOpen = (
  data: FilteringReducerStateType["isFilteringDialogOpen"],
): FilteringActionSetterType["isFilteringDialogOpen"] => {
  return {
    type: FilteringConsts.SET_FILTERING_DIALOG_OPEN,
    payload: data,
  };
};
