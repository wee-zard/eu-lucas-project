import ImageDto from "@model/dto/ImageDto";
import { MenuActions } from "@model/enum";
import PageableProperties from "@model/PageableProperties";
import PageableResponse from "@model/response/PageableResponse";
import SelectedImagesModel, { QueriedImageType } from "@model/SelectedImagesModel";

interface ImageReducerStateType {
  /**
   * TODO: It is a widely used by the application.
   * Stores the list of selected images what the user selected through the Filter dialog.
   */
  selectedImagesModel: SelectedImagesModel;
  /**
   * The query and the images selected by the given query.
   */
  queriedImageModel?: QueriedImageType;
  /**
   * The image what the user selected through click.
   */
  selectedImage?: ImageDto;
  /**
   * Stores the action that can be fired from the Filter dialog.
   */
  filterMenuAction?: MenuActions;
  /**
   * Stores the properties of the page where the filtered images are displayed.
   */
  filterPageable: PageableProperties;
  /**
   * The pageable response that returns the filtered images from the server.
   */
  filteringResponse?: PageableResponse<ImageDto>;
}

export default ImageReducerStateType;
