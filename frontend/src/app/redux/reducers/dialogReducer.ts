import { UnknownAction } from "redux";
import { DialogToOpens } from "../../model/enum";
import { DialogConsts } from "../consts/dialogConsts";

interface Dialogtype {
  dialogToOpen?: DialogToOpens;
}

const initialState: Dialogtype = {
  dialogToOpen: undefined,
};

const dialogReducer = (
  state = initialState,
  action: UnknownAction
): Dialogtype => {
  switch (action.type) {
    case DialogConsts.SET_DIALOG_TO_OPEN:
      return {
        ...state,
        dialogToOpen: action.payload as DialogToOpens | undefined,
      };
    default:
      return {
        ...state,
      };
  }
};

export default dialogReducer;
