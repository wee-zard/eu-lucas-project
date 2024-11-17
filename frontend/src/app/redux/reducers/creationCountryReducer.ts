import { UnknownAction } from "redux";
import CreationCountryDto from "../../model/CreationCountryDto";
import { CreationCountryConsts } from "../consts/creationCountryConts";

interface CreationCountryType {
  isCreationCountryLoading: boolean;
  listOfCreationCountries: CreationCountryDto[];
}

const initialState: CreationCountryType = {
  isCreationCountryLoading: false,
  listOfCreationCountries: [],
};

const creationCountryReducer = (
  state = initialState,
  action: UnknownAction
): CreationCountryType => {
  switch (action.type) {
    case CreationCountryConsts.CREATION_COUNTRY_FAILED:
      return {
        ...state,
        isCreationCountryLoading: false,
      };
    case CreationCountryConsts.CREATION_COUNTRY_SUCCEDED:
      return {
        ...state,
        listOfCreationCountries: action.payload as CreationCountryDto[],
        isCreationCountryLoading: false,
      };
    case CreationCountryConsts.REQUEST_CREATION_COUNTRY:
      return {
        ...state,
        isCreationCountryLoading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default creationCountryReducer;
