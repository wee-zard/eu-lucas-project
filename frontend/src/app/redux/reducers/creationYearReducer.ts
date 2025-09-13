import { CreationYearConsts } from "@redux/consts/creationYearConsts";
import CreationYearReducerStateType from "@redux/types/creationYearReducerStateType";
import CreationYearActionTypes from "@redux/types/creationYearActionTypes";

const initialState: CreationYearReducerStateType = {
  isCreationListLoading: false,
  listOfCreationYears: undefined,
};

const creationYearReducer = (
  state = initialState,
  action: CreationYearActionTypes,
): CreationYearReducerStateType => {
  switch (action.type) {
    case CreationYearConsts.CREATION_YEARS_FAILED:
      return {
        ...state,
        isCreationListLoading: false,
      };
    case CreationYearConsts.CREATION_YEARS_SUCCEEDED:
      return {
        ...state,
        listOfCreationYears: action.payload,
        isCreationListLoading: false,
      };
    case CreationYearConsts.REQUEST_CREATION_YEARS:
      return {
        ...state,
        listOfCreationYears: undefined,
        isCreationListLoading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default creationYearReducer;
