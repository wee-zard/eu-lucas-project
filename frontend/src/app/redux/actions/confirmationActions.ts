import { ConfirmationDialogConsts } from "@redux/consts/confirmationDialogConsts";
import ConfirmationDialogActionSetterType from "@redux/types/confirmationDialogActionSetterType";
import ConfirmationDialogReducerStateType from "@redux/types/confirmationDialogReducerStateType";

export const setConfirmationDialogOpen = (
  data: ConfirmationDialogReducerStateType["isOpen"],
): ConfirmationDialogActionSetterType["isOpen"] => {
  return {
    type: ConfirmationDialogConsts.SET_CONFIRMATION_DIALOG_OPEN,
    payload: data,
  };
};

export const setConfirmationDialogConfig = (
  data: ConfirmationDialogReducerStateType["config"],
): ConfirmationDialogActionSetterType["config"] => {
  return {
    type: ConfirmationDialogConsts.SET_CONFIRMATION_DIALOG_CONFIG,
    payload: data,
  };
};

export const setConfirmationDialogSubmitClick = (
  data: ConfirmationDialogReducerStateType["isSubmitClicked"],
): ConfirmationDialogActionSetterType["isSubmitClicked"] => {
  return {
    type: ConfirmationDialogConsts.SET_CONFIRMATION_DIALOG_SUBMIT_CLICKED,
    payload: data,
  };
};

export const setConfirmationDialogCancelClick = (
  data: ConfirmationDialogReducerStateType["isCancelClicked"],
): ConfirmationDialogActionSetterType["isCancelClicked"] => {
  return {
    type: ConfirmationDialogConsts.SET_CONFIRMATION_DIALOG_CANCEL_CLICKED,
    payload: data,
  };
};

export const setConfirmationDialogReset = (): ConfirmationDialogActionSetterType["reset"] => {
  return {
    type: ConfirmationDialogConsts.SET_CONFIRMATION_DIALOG_RESET,
    payload: undefined,
  };
};
