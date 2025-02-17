import { getPlantSpeciesList } from "@api/command/plantSpeciesCommands";
import PlantSpeciesDto from "@model/dto/PlantSpeciesDto";
import { PlantSpeciesConsts } from "@redux/consts/plantSpeciesConsts";
import { Dispatch } from "@reduxjs/toolkit";

export const setPlantSpeciesRequest = () => {
  return {
    type: PlantSpeciesConsts.REQUEST_PLANT_SPECIES,
  };
};

export const setPlantSpeciesFailed = () => {
  return {
    type: PlantSpeciesConsts.REQUESTING_PLANT_SPECIES_FAILED,
  };
};

export const setPlantSpeciesSucceeded = (data: PlantSpeciesDto[]) => {
  return {
    type: PlantSpeciesConsts.REQUESTING_PLANT_SPECIES_SUCCEEDED,
    payload: data,
  };
};

export const requestPlantSpeciesList = (dispatch: Dispatch) => {
  dispatch(setPlantSpeciesRequest());
  getPlantSpeciesList()
    .then((response) => {
      if (response) {
        dispatch(setPlantSpeciesSucceeded(response));
      } else {
        dispatch(setPlantSpeciesFailed());
      }
    })
    .catch(() => dispatch(setPlantSpeciesFailed()));
};
