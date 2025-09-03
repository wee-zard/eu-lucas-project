import ConfirmationDialogReducerStateType from "@redux/types/confirmationDialogReducerStateType";
import ConfirmationDialogActionTypes from "@redux/types/confirmationDialogActionTypes";
import { ConfirmationDialogConsts } from "@redux/consts/confirmationDialogConsts";

const initialState: ConfirmationDialogReducerStateType = {
  isOpen: false,
  isCancelClicked: false,
  isSubmitClicked: false,
  config: undefined,
};

const confirmationDialogReducer = (
  state = initialState,
  action: ConfirmationDialogActionTypes,
): ConfirmationDialogReducerStateType => {
  switch (action.type) {
    case ConfirmationDialogConsts.SET_CONFIRMATION_DIALOG_OPEN:
      return {
        ...state,
        isOpen: action.payload,
      };
    case ConfirmationDialogConsts.SET_CONFIRMATION_DIALOG_CANCEL_CLICKED:
      return {
        ...state,
        isCancelClicked: action.payload,
      };
    case ConfirmationDialogConsts.SET_CONFIRMATION_DIALOG_CONFIG:
      return {
        ...state,
        config: action.payload,
      };
    case ConfirmationDialogConsts.SET_CONFIRMATION_DIALOG_SUBMIT_CLICKED:
      return {
        ...state,
        isSubmitClicked: action.payload,
      };
    case ConfirmationDialogConsts.SET_CONFIRMATION_DIALOG_RESET:
      return {
        ...state,
        ...initialState,
      };
    default:
      return {
        ...state,
      };
  }
};

export default confirmationDialogReducer;
