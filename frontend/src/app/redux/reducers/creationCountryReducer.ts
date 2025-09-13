import { UnknownAction } from "redux";
import CreationCountryDto from "../../model/dto/CreationCountryDto";
import { CreationCountryConsts } from "../consts/creationCountryConsts";

interface CreationCountryType {
  isCreationCountryLoading: boolean;
  listOfCreationCountries?: CreationCountryDto[];
}

const initialState: CreationCountryType = {
  isCreationCountryLoading: false,
  listOfCreationCountries: undefined,
};

const creationCountryReducer = (
  state = initialState,
  action: UnknownAction,
): CreationCountryType => {
  switch (action.type) {
    case CreationCountryConsts.CREATION_COUNTRY_FAILED:
      return {
        ...state,
        isCreationCountryLoading: false,
      };
    case CreationCountryConsts.CREATION_COUNTRY_SUCCEEDED:
      return {
        ...state,
        listOfCreationCountries: action.payload as CreationCountryDto[],
        isCreationCountryLoading: false,
      };
    case CreationCountryConsts.REQUEST_CREATION_COUNTRY:
      return {
        ...state,
        listOfCreationCountries: undefined,
        isCreationCountryLoading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default creationCountryReducer;
