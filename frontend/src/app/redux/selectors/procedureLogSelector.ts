import { RootState } from "@redux/store";

export const selectListOfProcedureLogs = (state: RootState) =>
  state.procedureLogStore.listOfProcedureLogs;

export const selectSelectedListOfProcedureLogs = (state: RootState) =>
  state.procedureLogStore.selectedListOfProcedureLogs;

export const selectProcedureLogPageableProperties = (state: RootState) =>
  state.procedureLogStore.pageableProperties;

export const selectProcedureLogIsLogButtonDisabled = (state: RootState) =>
  state.procedureLogStore.isLogButtonDisabled;

export const selectProcedureLogStorage = (state: RootState) => state.procedureLogStore;
