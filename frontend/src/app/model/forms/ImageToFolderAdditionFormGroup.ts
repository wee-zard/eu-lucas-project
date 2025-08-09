import { InputFormControlEntry } from "@model/types/InputFormControlEntry";

type GenericReportFormGroupType<T> = Record<"folder_id" | "folder_name", T>;

export type ImageToFolderAdditionFormGroup = GenericReportFormGroupType<InputFormControlEntry>;

export type ImageToFolderAdditionFormGroupModel = GenericReportFormGroupType<string>;
