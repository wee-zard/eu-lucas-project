import { UnknownAction } from "redux";
import CreationYearDto from "../../model/CreationYearDto";
import { CreationYearConsts } from "../consts/creationYearConsts";

interface CreationYearType {
  isCreationListLoading: boolean;
  listOfCreationYears: CreationYearDto[];
}

const initialState: CreationYearType = {
  isCreationListLoading: false,
  listOfCreationYears: [],
};

const creationYearReducer = (
  state = initialState,
  action: UnknownAction
): CreationYearType => {
  switch (action.type) {
    case CreationYearConsts.CREATION_YEARS_FAILED:
      return {
        ...state,
        isCreationListLoading: false,
      };
    case CreationYearConsts.CREATION_YEARS_SUCCEDED:
      return {
        ...state,
        listOfCreationYears: action.payload as CreationYearDto[],
        isCreationListLoading: false,
      };
    case CreationYearConsts.REQUEST_CREATION_YEARS:
      return {
        ...state,
        isCreationListLoading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default creationYearReducer;
