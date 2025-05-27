import { SettingActionTypes } from "@redux/consts/settingActionTypes";
import { SettingConsts } from "@redux/consts/settingConsts";

interface SettingReducerStateType {
  isBackdropOpen: boolean;
}

const initialState: SettingReducerStateType = {
  isBackdropOpen: false,
};

const settingReducer = (
  state = initialState,
  action: SettingActionTypes,
): SettingReducerStateType => {
  switch (action.type) {
    case SettingConsts.SET_BACKDROP_OPEN:
      return {
        ...state,
        isBackdropOpen: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default settingReducer;
