import { RootState } from "../store";

export const selectIsCoordinateYLoading = (state: RootState) => state.coordinateYStore.isCoordinateYLoading;

export const selectListOfCoordinateY = (state: RootState) => state.coordinateYStore.listOfCoordinateY;
