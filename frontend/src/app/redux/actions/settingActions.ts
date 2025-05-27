import { SettingConsts } from "@redux/consts/settingConsts";

export const setSettingBackdropOpen = (data: boolean) => {
  return {
    type: SettingConsts.SET_BACKDROP_OPEN,
    payload: data,
  };
};
