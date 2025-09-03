import ConfirmationDialogReducerStateType from "./confirmationDialogReducerStateType";
import { ConfirmationDialogConsts } from "@redux/consts/confirmationDialogConsts";

interface ConfirmationDialogActionSetterType {
  isOpen: {
    type: ConfirmationDialogConsts.SET_CONFIRMATION_DIALOG_OPEN;
    payload: ConfirmationDialogReducerStateType["isOpen"];
  };
  config: {
    type: ConfirmationDialogConsts.SET_CONFIRMATION_DIALOG_CONFIG;
    payload: ConfirmationDialogReducerStateType["config"];
  };
  isSubmitClicked: {
    type: ConfirmationDialogConsts.SET_CONFIRMATION_DIALOG_SUBMIT_CLICKED;
    payload: ConfirmationDialogReducerStateType["isSubmitClicked"];
  };
  isCancelClicked: {
    type: ConfirmationDialogConsts.SET_CONFIRMATION_DIALOG_CANCEL_CLICKED;
    payload: ConfirmationDialogReducerStateType["isCancelClicked"];
  };
  reset: {
    type: ConfirmationDialogConsts.SET_CONFIRMATION_DIALOG_RESET;
    payload: undefined;
  };
}

export default ConfirmationDialogActionSetterType;
