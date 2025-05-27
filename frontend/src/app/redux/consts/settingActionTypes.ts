import { SettingConsts } from "./settingConsts";

interface setSettingBackdropOpen {
  type: SettingConsts.SET_BACKDROP_OPEN;
  payload: boolean;
}

export type SettingActionTypes = setSettingBackdropOpen;
