import ImageDto from "@model/dto/ImageDto";
import { QueryBuilderModel } from "@model/QueryBuilderModel";

export default class SelectedImagesModel {
  constructor(
    /**
     * Unique id of the model.
     */
    public id: number,
    /**
     * The images which were selected by the user.
     */
    public images: ImageDto[],
    /**
     * The query that was used to filter the images.
     */
    public query?: QueryBuilderModel,
  ) {}
}
