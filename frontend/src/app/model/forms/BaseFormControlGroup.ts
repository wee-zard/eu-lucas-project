import { InputFormControlEntry } from "@model/types/InputFormControlEntry";

export type BaseFormControlGroup = {
  [y in string]: InputFormControlEntry | InputFormControlEntry[];
};
