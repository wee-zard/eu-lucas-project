import { RootState } from "@redux/store";

export const selectIsProcedureLogParamLoading = (state: RootState) =>
  state.procedureLogParamStore.isProcedureLogParamLoading;

export const selectListOfProcedureLogParams = (state: RootState) =>
  state.procedureLogParamStore.listOfProcedureLogParams;
