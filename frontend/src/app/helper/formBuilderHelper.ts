import { UserCreationFormControlGroup } from "@model/forms/UserCreationFormControlGroup";
import getFormControlEntry from "./formControlEntryHelper";
import { InputFormControlEntryEnum } from "@model/enum/InputFormControlEntryEnum";
import { InputFormControlEntry } from "@model/types/InputFormControlEntry";

export abstract class UserCreationFormBuilder {
  public static buildEntry = (data?: string): InputFormControlEntry => {
    return getFormControlEntry(InputFormControlEntryEnum.EMAIL_FIELD, data, {});
  };

  public static buildGroup = (data?: string): UserCreationFormControlGroup => {
    return {
      email: [this.buildEntry(data)],
      role: getFormControlEntry(InputFormControlEntryEnum.SELECT_FIELD, data, {}),
    };
  };
}
