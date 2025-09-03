import { FormEnums } from "@model/enum";
import SettingLocalImageServer from "./SettingLocalImageServer";
import { useFormGroupHelper } from "@hooks/useFormGroup";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { SettingsFormGroup } from "@model/forms/SettingsFormControlGroup";

const SettingsScreen = () => {
  const helper = useFormGroupHelper<SettingsFormGroup>(
    FormEnums.SettingsForm,
    EventListenerIdEnum.SETTINGS_SCREEN,
  );

  return (
    <div>
      <SettingLocalImageServer helper={helper} />
    </div>
  );
};

export default SettingsScreen;
