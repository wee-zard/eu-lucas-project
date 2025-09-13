import { RootState } from "@redux/store";

export const selectPlantIsLoading = (state: RootState) => state.plantStore.isPlantLoading;

export const selectListOfPlants = (state: RootState) => state.plantStore.listOfPlants;

export const selectListOfPlantsByName = (state: RootState) =>
  state.plantStore.listOfPlants?.map((plant) => plant.plantScientificName);
