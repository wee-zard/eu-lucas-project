import { UnknownAction } from "redux";
import CoordinateXDto from "../../model/dto/CoordinateXDto";
import { CoordinateXConsts } from "../consts/coordinateXConsts";

interface CoordinateXType {
  isCoordinateXLoading: boolean;
  listOfCoordinateX: CoordinateXDto[];
}

const initialState: CoordinateXType = {
  isCoordinateXLoading: false,
  listOfCoordinateX: [],
};

const coordinateXReducer = (
  state = initialState,
  action: UnknownAction
): CoordinateXType => {
  switch (action.type) {
    case CoordinateXConsts.REQUESTING_COORDINATE_X_FAILED:
      return {
        ...state,
        isCoordinateXLoading: false,
      };
    case CoordinateXConsts.REQUESTING_COORDINATE_X_SUCCEEDED:
      return {
        ...state,
        listOfCoordinateX: action.payload as CoordinateXDto[],
        isCoordinateXLoading: false,
      };
    case CoordinateXConsts.REQUEST_COORDINATE_X:
      return {
        ...state,
        isCoordinateXLoading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default coordinateXReducer;
