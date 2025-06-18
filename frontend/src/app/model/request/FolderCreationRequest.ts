import { QueryBuilderModel } from "@model/QueryBuilderModel";

export default class FolderCreationRequest {
  constructor(
    public title: string,
    public description: string,
    public queriedImages: QueriedImage[],
  ) {}
}

type QueriedImage = {
  imageIds: number[];
  query: QueryBuilderModel | null;
};
