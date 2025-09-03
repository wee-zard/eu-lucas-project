import { UserCreationFormControlGroup } from "@model/forms/UserCreationFormControlGroup";
import getFormControlEntry from "./formControlEntryHelper";
import { InputFormControlEntryEnum } from "@model/enum/InputFormControlEntryEnum";
import { InputFormControlEntry } from "@model/types/InputFormControlEntry";
import { FolderCreationFormGroup } from "@model/forms/FolderCreationFormGroup";
import { InputValidatorEnum } from "@model/enum/InputValidatorEnum";
import { ReportFormGroup } from "@model/forms/ReportFormGroup";
import { FormEnums } from "@model/enum";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import { ImageToFolderAdditionFormGroup } from "@model/forms/ImageToFolderAdditionFormGroup";
import { SettingsFormGroup } from "@model/forms/SettingsFormControlGroup";

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

const buildImageToFolderAdditionFormGroup = (
  group?: FolderCreationFormGroup,
): ImageToFolderAdditionFormGroup => ({
  folder_id: getFormControlEntry(InputFormControlEntryEnum.SELECT_FIELD, group?.title.data, {}),
  folder_name: getFormControlEntry(InputFormControlEntryEnum.SELECT_FIELD, group?.title.data, {}),
});

const buildFolderCreationFormGroup = (
  group?: FolderCreationFormGroup,
): FolderCreationFormGroup => ({
  title: getFormControlEntry(InputFormControlEntryEnum.TEXT_FIELD, group?.title.data, {}),
  description: getFormControlEntry(InputFormControlEntryEnum.TEXT_FIELD, group?.description.data, {
    [InputValidatorEnum.MAX_LENGTH]: 500,
    [InputValidatorEnum.REQUIRED]: false,
  }),
});

const buildReportFormGroup = (): ReportFormGroup => ({
  title: getFormControlEntry(InputFormControlEntryEnum.TEXT_FIELD, "", {
    [InputValidatorEnum.MAX_LENGTH]: 200,
  }),
  message: getFormControlEntry(InputFormControlEntryEnum.TEXT_FIELD, "", {
    [InputValidatorEnum.MAX_LENGTH]: 4000,
  }),
  reportType: getFormControlEntry(InputFormControlEntryEnum.SELECT_FIELD),
});

const buildSettingsFormGroup = (): SettingsFormGroup => ({
  localImageServer: getFormControlEntry(InputFormControlEntryEnum.CHECKBOX_FIELD, "false", {
    [InputValidatorEnum.REQUIRED]: false,
  }),
});

export const buildGenericFormGroup = <T>(formEnum: FormEnums): T => {
  const handler: GenericHandlerType<FormEnums, any> = {
    [FormEnums.ReportCreationForm]: buildReportFormGroup(),
    [FormEnums.FolderCreationForm]: buildFolderCreationFormGroup(),
    [FormEnums.ImageToFolderAdditionForm]: buildImageToFolderAdditionFormGroup(),
    [FormEnums.SettingsForm]: buildSettingsFormGroup(),
  };

  return handler[formEnum] as T;
};
