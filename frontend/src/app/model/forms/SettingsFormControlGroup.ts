import { InputFormControlEntry } from "@model/types/InputFormControlEntry";

type GenericReportFormGroupType<T> = Record<"localImageServer", T>;

export type SettingsFormGroup = GenericReportFormGroupType<InputFormControlEntry>;
