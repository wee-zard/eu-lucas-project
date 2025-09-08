import ImageDto from "@model/dto/ImageDto";
import { QueryBuilderModel } from "@model/QueryBuilderModel";
import FolderDtoSlice from "./dto/FolderDtoSlice";
import SelectedProcedureLogModel from "./models/SelectedProcedureLogModel";

export default class SelectedImagesModel {
  constructor(
    /**
     * Hold the list of fetched queries and the images fetched alongside the
     * queries. Multiple bounding box can be added to the images.
     */
    public queryImages: QueriedImagePropertyType[],

    /**
     * The folder in which the query images are belong to. It is possible
     * that the users have not added the images to a folder yet.
     */
    public folder?: FolderDtoSlice,
  ) {}
}

export type QueriedImageType = {
  /**
   * The images which were selected by the user.
   */
  images: QueriedImagePropertyType[];
  /**
   * The query that was used to fetch the images,
   * and builded by the user.
   */
  query?: QueryBuilderModel;
};

export type QueriedImagePropertyType = {
  image: ImageDto;
  /**
   * The bound boxes applied to the images by the user.
   */
  boundingBoxes: SelectedProcedureLogModel[];
};
