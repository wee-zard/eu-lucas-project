import { FilteringFormInputKeys } from "./enum";

export type FilterFormTemplate = {
  inputTitle: string;
  options?: string[];
  inputKey: FilteringFormInputKeys;
};
