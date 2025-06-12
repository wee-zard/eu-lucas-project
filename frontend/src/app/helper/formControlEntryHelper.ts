import { InputFormControlEntry } from "@model/types/InputFormControlEntry";
import { InputFormControlValidator } from "@model/types/InputFormControlValidator";
import getRandomIdentification from "./randomGeneratorHelper";
import { InputFormControlEntryEnum } from "@model/enum/InputFormControlEntryEnum";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import { InputValidatorEnum } from "@model/enum/InputValidatorEnum";

/**
 * Creates an email text form control entry. If data is provided, then an input
 * form control will be created with a default data set by the 'data' param.
 * The option param will details the validators applied to the form control.
 *
 * @param data The default data to be displayed on the input field
 * @param option The optional validators to be applied to the input field.
 * They could even modify already applied validators.
 * @returns Return a {@link InputFormControlEntry} that describes an input.
 */
const getEmailFormControlEntry = (
  data: string = "",
  option: InputFormControlValidator = {},
): InputFormControlEntry => {
  return {
    id: getRandomIdentification(),
    data: data,
    error: undefined,
    validators: {
      ...option,
      [InputValidatorEnum.REQUIRED]: option[InputValidatorEnum.REQUIRED] ?? true,
      [InputValidatorEnum.MAX_LENGTH]: option[InputValidatorEnum.MAX_LENGTH] ?? 64,
      [InputValidatorEnum.IS_NOT_ENDS_WITH_GMAIL]:
        option[InputValidatorEnum.IS_NOT_ENDS_WITH_GMAIL] ?? true,
    },
  };
};

/**
 * Creates a text form control entry. If data is provided, then an input
 * form control will be created with a default data set by the 'data' param.
 * The option param will details the validators applied to the form control.
 *
 * @param data The default data to be displayed on the input field
 * @param option Optional validators to be applied to the input field. They may modify already applied validators.
 * @returns Return a {@link InputFormControlEntry} that describes an input.
 */
const getTextFormControlEntry = (
  data: string = "",
  option: InputFormControlValidator = {},
): InputFormControlEntry => {
  return {
    id: getRandomIdentification(),
    data: data,
    error: undefined,
    validators: {
      ...option,
      [InputValidatorEnum.REQUIRED]: option[InputValidatorEnum.REQUIRED] ?? true,
      [InputValidatorEnum.MAX_LENGTH]: option[InputValidatorEnum.MAX_LENGTH] ?? 100,
    },
  };
};

/**
 * Creates a select form control entry. If data is provided, then an input
 * form control will be created with a default data set by the 'data' param.
 * The option param will details the validators applied to the form control.
 *
 * @param data The default data to be displayed on the input field
 * @param option Optional validators to be applied to the input field. They may modify already applied validators.
 * @returns Return a {@link InputFormControlEntry} that describes an input.
 */
const getSelectFormControlEntry = (
  data: string = "",
  option: InputFormControlValidator = {},
): InputFormControlEntry => {
  return {
    id: getRandomIdentification(),
    data: data,
    error: undefined,
    validators: {
      ...option,
      [InputValidatorEnum.REQUIRED]: option[InputValidatorEnum.REQUIRED] ?? true,
    },
  };
};

/**
 * Handlers the creation of the {@link InputFormControlEntry} from the provided key.
 *
 * @param key The key that represents what kind of {@link InputFormControlEntry} should be created.
 * @param data The default data to be displayed on the input field
 * @param option Optional validators to be applied to the input field. They may modify already applied validators.
 * @returns Return a {@link InputFormControlEntry} that describes an input.
 */
const getFormControlEntry = (
  key: InputFormControlEntryEnum,
  data: string = "",
  option: InputFormControlValidator = {},
): InputFormControlEntry => {
  const handler: GenericHandlerType<InputFormControlEntryEnum, InputFormControlEntry> = {
    [InputFormControlEntryEnum.EMAIL_FIELD]: getEmailFormControlEntry(data, option),
    [InputFormControlEntryEnum.TEXT_FIELD]: getTextFormControlEntry(data, option),
    [InputFormControlEntryEnum.SELECT_FIELD]: getSelectFormControlEntry(data, option),
  };
  return handler[key];
};

export default getFormControlEntry;
