import { RootState } from "../store";

export const selectIsCoordinateXLoading = (state: RootState) => state.coordinateXStore.isCoordinateXLoading;

export const selectListOfCoordinateX = (state: RootState) => state.coordinateXStore.listOfCoordinateX;
