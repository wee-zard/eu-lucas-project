import { BackdropConfigType } from "@model/types/BackdropConfigType";
import { SettingConsts } from "./settingConsts";

interface setSettingBackdropOpen {
  type: SettingConsts.SET_BACKDROP_OPEN;
  payload: boolean;
}
interface setSettingConfig {
  type: SettingConsts.SET_BACKDROP_CONFIG;
  payload: BackdropConfigType;
}
export type SettingActionTypes = setSettingBackdropOpen | setSettingConfig;
