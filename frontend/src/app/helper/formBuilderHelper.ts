import { UserCreationFormControlGroup } from "@model/forms/UserCreationFormControlGroup";
import getFormControlEntry from "./formControlEntryHelper";
import { InputFormControlEntryEnum } from "@model/enum/InputFormControlEntryEnum";
import { InputFormControlEntry } from "@model/types/InputFormControlEntry";
import { FolderCreationFormGroup } from "@model/forms/FolderCreationFormGroup";
import { InputValidatorEnum } from "@model/enum/InputValidatorEnum";

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

export abstract class FolderCreationFormBuilder {
  public static buildGroup = (group?: FolderCreationFormGroup): FolderCreationFormGroup => {
    return {
      title: getFormControlEntry(InputFormControlEntryEnum.TEXT_FIELD, group?.title.data, {}),
      description: getFormControlEntry(
        InputFormControlEntryEnum.TEXT_FIELD,
        group?.description.data,
        { [InputValidatorEnum.MAX_LENGTH]: 500, [InputValidatorEnum.REQUIRED]: false },
      ),
    };
  };
}
