import { UnknownAction } from "redux";
import CoordinateYDto from "../../model/dto/CoordinateYDto";
import { CoordinateYConsts } from "../consts/coordinateYConsts";

interface CoordinateYType {
  isCoordinateYLoading: boolean;
  listOfCoordinateY: CoordinateYDto[];
}

const initialState: CoordinateYType = {
  isCoordinateYLoading: false,
  listOfCoordinateY: [],
};

const coordinateYReducer = (
  state = initialState,
  action: UnknownAction
): CoordinateYType => {
  switch (action.type) {
    case CoordinateYConsts.REQUESTING_COORDINATE_Y_FAILED:
      return {
        ...state,
        isCoordinateYLoading: false,
      };
    case CoordinateYConsts.REQUESTING_COORDINATE_Y_SUCCEDED:
      return {
        ...state,
        listOfCoordinateY: action.payload as CoordinateYDto[],
        isCoordinateYLoading: false,
      };
    case CoordinateYConsts.REQUEST_COORDINATE_Y:
      return {
        ...state,
        isCoordinateYLoading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default coordinateYReducer;
