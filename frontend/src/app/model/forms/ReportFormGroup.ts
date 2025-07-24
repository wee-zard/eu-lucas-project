import { InputFormControlEntry } from "@model/types/InputFormControlEntry";

type GenericReportFormGroupType<T> = Record<"message" | "title" | "reportType", T>;

export type ReportFormGroup = GenericReportFormGroupType<InputFormControlEntry>;

export type ReportFormGroupModel = GenericReportFormGroupType<string>;
