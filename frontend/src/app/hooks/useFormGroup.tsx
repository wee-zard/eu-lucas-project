import { FormGroupHelper } from "@helper/formGroupHelper";
import { FormEnums } from "@model/enum";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { FormGroupHelperEnum } from "@model/enum/FormGroupHelperEnum";
import { BaseFormControlGroup } from "@model/forms/BaseFormControlGroup";
import { FolderCreationFormGroup } from "@model/forms/FolderCreationFormGroup";
import { useMemo } from "react";

export function useFormGroupHelper<T extends BaseFormControlGroup>(
  cacheKey: FormEnums,
  listenerKey: EventListenerIdEnum,
) {
  return useMemo(() => new FormGroupHelper<T>(cacheKey, listenerKey), [cacheKey, listenerKey]);
}

export const getGenericFormGroupHelper = (key: FormGroupHelperEnum) => {
  const handler = {
    [FormGroupHelperEnum.FOLDER_CREATION_FORM_GROUP]: () =>
      new FormGroupHelper<FolderCreationFormGroup>(
        FormEnums.FolderCreationForm,
        EventListenerIdEnum.FOLDER_CREATION_DIALOG,
      ),
  };

  return handler[key]();
};
