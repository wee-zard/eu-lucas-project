import { RootState } from "@redux/store";

export const selectIsConfirmationDialogOpen = (state: RootState) =>
  state.confirmationDialogStore.isOpen;

export const selectConfirmationDialogConfig = (state: RootState) =>
  state.confirmationDialogStore.config;

export const selectIsConfirmationDialogSubmitButtonClicked = (state: RootState) =>
  state.confirmationDialogStore.isSubmitClicked;

export const selectIsConfirmationDialogCancelButtonClicked = (state: RootState) =>
  state.confirmationDialogStore.isCancelClicked;

export const selectConfirmationDialogStore = (state: RootState) => state.confirmationDialogStore;
