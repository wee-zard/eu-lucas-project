import PlantSpeciesDto from "@model/dto/PlantSpeciesDto";
import { PlantSpeciesConsts } from "@redux/consts/plantSpeciesConsts";
import { UnknownAction } from "redux";

interface ReducerStateType {
  isPlantSpeciesLoading: boolean;
  listOfPlantSpecies: PlantSpeciesDto[];
}

const initialState: ReducerStateType = {
  isPlantSpeciesLoading: false,
  listOfPlantSpecies: [],
};

const plantSpeciesReducer = (state = initialState, action: UnknownAction): ReducerStateType => {
  switch (action.type) {
    case PlantSpeciesConsts.REQUESTING_PLANT_SPECIES_FAILED:
      return {
        ...state,
        isPlantSpeciesLoading: false,
      };
    case PlantSpeciesConsts.REQUESTING_PLANT_SPECIES_SUCCEEDED:
      return {
        ...state,
        listOfPlantSpecies: action.payload as PlantSpeciesDto[],
        isPlantSpeciesLoading: false,
      };
    case PlantSpeciesConsts.REQUEST_PLANT_SPECIES:
      return {
        ...state,
        isPlantSpeciesLoading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default plantSpeciesReducer;
