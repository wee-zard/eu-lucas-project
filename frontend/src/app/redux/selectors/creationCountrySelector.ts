import { RootState } from "../store";

export const selectIsCreationCountryLoading = (state: RootState) => state.creationCountryStore.isCreationCountryLoading;

export const selectListOfCreationCountry = (state: RootState) => state.creationCountryStore.listOfCreationCountries;
