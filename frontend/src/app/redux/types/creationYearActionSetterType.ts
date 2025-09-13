import { CreationYearConsts } from "@redux/consts/creationYearConsts";
import CreationYearReducerStateType from "./creationYearReducerStateType";

interface CreationYearActionSetterType {
  succeeded: {
    type: CreationYearConsts.CREATION_YEARS_SUCCEEDED;
    payload: CreationYearReducerStateType["listOfCreationYears"];
  };
  request: {
    type: CreationYearConsts.REQUEST_CREATION_YEARS;
  };
  failed: {
    type: CreationYearConsts.CREATION_YEARS_FAILED;
  };
}

export default CreationYearActionSetterType;
