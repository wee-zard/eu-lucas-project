import { BackdropConfigType } from "@model/types/BackdropConfigType";
import { SettingConsts } from "@redux/consts/settingConsts";

export const setSettingBackdropOpen = (data: boolean) => ({
  type: SettingConsts.SET_BACKDROP_OPEN,
  payload: data,
});

export const setSettingBackdropConfig = (data: BackdropConfigType) => ({
  type: SettingConsts.SET_BACKDROP_CONFIG,
  payload: data,
});
