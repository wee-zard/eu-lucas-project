import { UnknownAction } from "redux";
import CreationDirectionDto from "../../model/CreationDirectionDto";
import { CreationDirectionConsts } from "../consts/creationDirectionConsts";

interface CreationDirectionType {
  isCreationDirectionLoading: boolean;
  listOfCreationDirections: CreationDirectionDto[];
}

const initialState: CreationDirectionType = {
  isCreationDirectionLoading: false,
  listOfCreationDirections: [],
};

const creationDirectionReducer = (
  state = initialState,
  action: UnknownAction
): CreationDirectionType => {
  switch (action.type) {
    case CreationDirectionConsts.CREATION_DIRECTION_FAILED:
      return {
        ...state,
        isCreationDirectionLoading: false,
      };
    case CreationDirectionConsts.CREATION_DIRECTION_SUCCEDED:
      return {
        ...state,
        listOfCreationDirections: action.payload as CreationDirectionDto[],
        isCreationDirectionLoading: false,
      };
    case CreationDirectionConsts.REQUEST_CREATION_DIRECTION:
      return {
        ...state,
        isCreationDirectionLoading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default creationDirectionReducer;
