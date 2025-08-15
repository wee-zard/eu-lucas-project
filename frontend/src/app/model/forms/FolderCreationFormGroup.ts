import { InputFormControlEntry } from "@model/types/InputFormControlEntry";

type GenericReportFormGroupType<T> = Record<"title" | "description", T>;

export type FolderCreationFormGroup = GenericReportFormGroupType<InputFormControlEntry>;

export type FolderCreationFormGroupModel = GenericReportFormGroupType<string>;

export type FolderCreationQueriedImage = {
  /**
   * The selected image.
   */
  imageId: number;
  /**
   * The bounding boxes that has been applied on the image.
   */
  boundingBoxIds: number[];
};

export type FolderCreationRequest = {
  title: string;
  description: string;
  queriedImages: FolderCreationQueriedImage[];
};

export type FolderImageAdditionRequest = {
  queriedImages: FolderCreationQueriedImage[];
  folderId: number;
};
