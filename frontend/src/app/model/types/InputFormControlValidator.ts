import { InputValidatorEnum } from "@model/enum/InputValidatorEnum";

export type InputFormControlValidator = {
  [InputValidatorEnum.REQUIRED]?: boolean;
  [InputValidatorEnum.MAX_LENGTH]?: number;
  [InputValidatorEnum.EMAIL]?: boolean;
  [InputValidatorEnum.EMAIL]?: boolean;
  [InputValidatorEnum.IS_NOT_ENDS_WITH_GMAIL]?: boolean;
};
