import { RootState } from "@redux/store";

export const selectPlantSpeciesIsLoading = (state: RootState) =>
  state.plantSpeciesReducer.isPlantSpeciesLoading;

export const selectListOfPlantSpecies = (state: RootState) =>
  state.plantSpeciesReducer.listOfPlantSpecies;

export const selectListOfPlantSpeciesByScientificName = (state: RootState) =>
  selectListOfPlantSpecies(state).map((plant) => plant.plantScientificName);
