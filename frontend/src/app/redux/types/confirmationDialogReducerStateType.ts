import { ConfirmationDialogConfigType } from "@model/types/ConfirmationDialogConfigType";

interface ConfirmationDialogReducerStateType {
  isOpen: boolean;
  config?: ConfirmationDialogConfigType;
  isSubmitClicked: boolean;
  isCancelClicked: boolean;
}

export default ConfirmationDialogReducerStateType;
