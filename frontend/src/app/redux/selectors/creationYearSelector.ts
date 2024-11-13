import { RootState } from "../store";

export const selectIsCreationLoading = (state: RootState) => state.creationYearStore.isCreationListLoading;

export const selectListOfCreationYears = (state: RootState) => state.creationYearStore.listOfCreationYears;
