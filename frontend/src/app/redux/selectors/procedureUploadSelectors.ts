import { RootState } from "@redux/store";

export const selectListOfProcedureProcesses = (state: RootState) =>
  state.procedureUploadStorage.listOfProcedureProcesses;
