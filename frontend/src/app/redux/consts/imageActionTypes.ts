import ImageDto from "@model/dto/ImageDto";
import { ImageConsts } from "./imageConsts";
import SelectedImagesModel from "@model/SelectedImagesModel";
import { MenuActions } from "@model/enum";
import PageableProperties from "@model/PageableProperties";

interface setListOfSelectedImages {
  type: ImageConsts.SET_LIST_OF_SELECTED_IMAGES;
  payload: SelectedImagesModel[];
}
interface setSelectedImageModel {
  type: ImageConsts.SET_SELECTED_IMAGE_MODEL;
  payload?: SelectedImagesModel;
}
interface setSelectedImage {
  type: ImageConsts.SET_SELECTED_IMAGE;
  payload?: ImageDto;
}
interface setFilterMenuAction {
  type: ImageConsts.SET_FILTER_MENU_ACTION;
  payload?: MenuActions;
}
interface setFilteringPageableProperties {
  type: ImageConsts.SET_FILTERING_PAGEABLE_PROPERTIES;
  payload: PageableProperties;
}

export type ImageActionTypes =
  | setListOfSelectedImages
  | setSelectedImageModel
  | setSelectedImage
  | setFilterMenuAction
  | setFilteringPageableProperties;
