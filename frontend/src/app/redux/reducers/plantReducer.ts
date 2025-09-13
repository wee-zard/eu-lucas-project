import PlantDto from "@model/dto/PlantDto";
import { PlantConsts } from "@redux/consts/plantConsts";
import { UnknownAction } from "redux";

interface ReducerStateType {
  isPlantLoading: boolean;
  listOfPlants?: PlantDto[];
}

const initialState: ReducerStateType = {
  isPlantLoading: false,
  listOfPlants: undefined,
};

const plantReducer = (state = initialState, action: UnknownAction): ReducerStateType => {
  switch (action.type) {
    case PlantConsts.REQUESTING_PLANT_FAILED:
      return {
        ...state,
        isPlantLoading: false,
      };
    case PlantConsts.REQUESTING_PLANT_SUCCEEDED:
      return {
        ...state,
        listOfPlants: action.payload as PlantDto[],
        isPlantLoading: false,
      };
    case PlantConsts.REQUEST_PLANT:
      return {
        ...state,
        listOfPlants: undefined,
        isPlantLoading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default plantReducer;
