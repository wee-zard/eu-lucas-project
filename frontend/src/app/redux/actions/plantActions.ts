import GenericCommandDispatcher from "@api/abstraction/genericCommandDispatcher";
import PlantDto from "@model/dto/PlantDto";
import { PlantConsts } from "@redux/consts/plantConsts";
import { Dispatch } from "@reduxjs/toolkit";

export const setPlantRequest = () => {
  return {
    type: PlantConsts.REQUEST_PLANT,
  };
};

export const setPlantFailed = () => {
  return {
    type: PlantConsts.REQUESTING_PLANT_FAILED,
  };
};

export const setPlantSucceeded = (data: PlantDto[]) => {
  return {
    type: PlantConsts.REQUESTING_PLANT_SUCCEEDED,
    payload: data,
  };
};

export const requestPlantList = (dispatch: Dispatch) => {
  dispatch(setPlantRequest());
  GenericCommandDispatcher.getPlantCommands()
    .getPlants()
    .then((response) => {
      if (response) {
        dispatch(setPlantSucceeded(response));
      } else {
        dispatch(setPlantFailed());
      }
    })
    .catch(() => dispatch(setPlantFailed()));
};
