import { RootState } from "@redux/store";

export const selectSelectedListOfProcedureLogs = (state: RootState) =>
  state.procedureLogStore.selectedProcedureLogs;

export const selectProcedureLogPageableProperties = (state: RootState) =>
  state.procedureLogStore.pageableProperties;

export const selectProcedureLogStorage = (state: RootState) => state.procedureLogStore;
