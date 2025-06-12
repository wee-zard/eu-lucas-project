import { InputFormControlValidator } from "./InputFormControlValidator";

export type InputFormControlEntry = {
  id: string | number; 
  data: string;
  error?: string;
  validators: InputFormControlValidator;
};
