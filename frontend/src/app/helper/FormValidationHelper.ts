import { InputValidatorEnum } from "@model/enum/InputValidatorEnum";
import { BaseFormControlGroup } from "@model/forms/BaseFormControlGroup";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import { InputFormControlEntry } from "@model/types/InputFormControlEntry";
import getRandomIdentification from "./randomGeneratorHelper";
import i18n from "@i18n/i18nHandler";

export const getValidationErrorMessage = (
  key: InputValidatorEnum,
  error?: any,
  param?: any,
): string | undefined => {
  const handler: GenericHandlerType<InputValidatorEnum, boolean> = {
    [InputValidatorEnum.MAX_LENGTH]: String(error).length > Number(param),
    [InputValidatorEnum.REQUIRED]: !error || String(error).length === 0,
    [InputValidatorEnum.IS_NOT_ENDS_WITH_GMAIL]: String(error).includes("@"),
    [InputValidatorEnum.EMAIL]: true,
  };

  const res = handler[key];

  if (!res) {
    return undefined;
  }

  return i18n.t(`validators.${key}`, param ? { param: param } : undefined);
};

const validateValueByValidators = (entry: InputFormControlEntry): string | undefined => {
  const keys: InputValidatorEnum[] = Object.keys(entry.validators) as any;
  return keys
    .map((key) => getValidationErrorMessage(key, entry.data, entry.validators[key]))
    .filter((errorMessage) => errorMessage !== undefined)[0];
};

const updateEntryErrors = (entry: InputFormControlEntry): InputFormControlEntry => {
  const error = validateValueByValidators(entry);

  return {
    ...entry,
    id: error ? getRandomIdentification() : entry.id,
    error: error,
  };
};

export const validateFormControlGroup = <T>(group: BaseFormControlGroup): T => {
  return Object.keys(group)
    .map((key) => ({
      [key]: Array.isArray(group[key])
        ? group[key].map(updateEntryErrors)
        : updateEntryErrors(group[key]),
    }))
    .reduce((acc, obj) => ({ ...acc, ...obj }), {}) as T;
};

/**
 * Checks whether the provided form groups is valid or not.
 *
 * @param group The form group to check if valid or not
 * @returns Returns true if the form group is valid, else false. A group is considered valid
 * if there is no error message stored inside the model.
 */
export const isFormValid = (group: BaseFormControlGroup) => {
  return Object.keys(group).every((key) =>
    Array.isArray(group[key]) ? group[key].every((entry) => !entry.error) : !group[key].error,
  );
};
