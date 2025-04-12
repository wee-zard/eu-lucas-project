import { MenuActions } from "@model/enum";
import { ImageConsts } from "@redux/consts/imageConsts";
import PageableProperties from "@model/PageableProperties";
import SelectedImagesModel from "@model/SelectedImagesModel";
import ImageDto from "@model/dto/ImageDto";

export const setListOfSelectedImages = (data: SelectedImagesModel[]) => {
  return {
    type: ImageConsts.SET_LIST_OF_SELECTED_IMAGES,
    payload: data,
  };
};

export const setSelectedImageModel = (data?: SelectedImagesModel) => {
  return {
    type: ImageConsts.SET_SELECTED_IMAGE_MODEL,
    payload: data,
  };
};

export const setSelectedImage = (data?: ImageDto) => {
  return {
    type: ImageConsts.SET_SELECTED_IMAGE,
    payload: data,
  };
};

export const setFilterMenuAction = (data?: MenuActions) => {
  return {
    type: ImageConsts.SET_FILTER_MENU_ACTION,
    payload: data,
  };
};

export const setFilteringPageableProperties = (data: PageableProperties) => {
  return {
    type: ImageConsts.SET_FILTERING_PAGEABLE_PROPERTIES,
    payload: data,
  };
};
