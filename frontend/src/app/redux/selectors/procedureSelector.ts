import { RootState } from "@redux/store";

export const selectIsProcedureLoading = (state: RootState) =>
  state.procedureStore.isProcedureLoading;

export const selectListOfCoordinateX = (state: RootState) => state.procedureStore.listOfProcedures;
