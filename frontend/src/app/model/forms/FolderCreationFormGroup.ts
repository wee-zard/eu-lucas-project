import { QueryBuilderModel } from "@model/QueryBuilderModel";
import { InputFormControlEntry } from "@model/types/InputFormControlEntry";

type GenericReportFormGroupType<T> = Record<"title" | "description", T>;

export type FolderCreationFormGroup = GenericReportFormGroupType<InputFormControlEntry>;

export type FolderCreationFormGroupModel = GenericReportFormGroupType<string>;

export type FolderCreationQueriedImage = {
  imageIds: number[];
  query: QueryBuilderModel | null;
  // TODO: the bounding boxes should be here too later!
};

export type FolderCreationRequest = {
  title: string;
  description: string;
  queriedImages: FolderCreationQueriedImage[];
  folderId?: number;
};
