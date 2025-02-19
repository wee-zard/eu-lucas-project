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
    public images: ImageDtoProperties[],
    /**
     * The query that was used to filter the images.
     */
    public query?: QueryBuilderModel,
  ) {}
}

export type ImageDtoProperties = {
  image: ImageDto;
  height?: number;
  width?: number;
};
