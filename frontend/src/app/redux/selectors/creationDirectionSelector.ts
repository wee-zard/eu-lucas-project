import { RootState } from "../store";

export const selectIsCreationDirectionLoading = (state: RootState) => state.creationDirectionStore.isCreationDirectionLoading;

export const selectListOfCreationDirection = (state: RootState) => state.creationDirectionStore.listOfCreationDirections;
