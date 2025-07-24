import { FormGroupHelper } from "@helper/formGroupHelper";
import { FormEnums } from "@model/enum";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { BaseFormControlGroup } from "@model/forms/BaseFormControlGroup";
import { useMemo } from "react";

export function useFormGroupHelper<T extends BaseFormControlGroup>(
  cacheKey: FormEnums,
  listenerKey: EventListenerIdEnum,
) {
  return useMemo(() => new FormGroupHelper<T>(cacheKey, listenerKey), [cacheKey, listenerKey]);
}
