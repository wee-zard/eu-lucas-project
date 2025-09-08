import { FormGroupHelper } from "@helper/formGroupHelper";
import { FormEnums } from "@model/enum";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { SettingsFormGroup } from "@model/forms/SettingsFormControlGroup";

export const isSettingLocalImageServerTurnedOn = () => {
  const helper = new FormGroupHelper<SettingsFormGroup>(
    FormEnums.SettingsForm,
    EventListenerIdEnum.SETTINGS_SCREEN,
  );

  return JSON.parse(helper.get().localImageServer.data);
};
