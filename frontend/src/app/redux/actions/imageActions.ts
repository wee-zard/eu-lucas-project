import { ImageConsts } from "@redux/consts/imageConsts";
import ImageActionSetterType from "@redux/types/imageActionSetterType";
import ImageReducerStateType from "@redux/types/imageReducerStateType";

export const setSelectedImagesModel = (
  data: ImageReducerStateType["selectedImagesModel"],
): ImageActionSetterType["selectedImagesModel"] => {
  return {
    type: ImageConsts.SET_SELECTED_IMAGES_MODEL,
    payload: data,
  };
};

export const setQueriedImageModel = (
  data: ImageReducerStateType["queriedImageModel"],
): ImageActionSetterType["queriedImageModel"] => {
  return {
    type: ImageConsts.SET_QUERIED_IMAGE_MODEL,
    payload: data,
  };
};

export const setSelectedImage = (
  data: ImageReducerStateType["selectedImage"],
): ImageActionSetterType["selectedImage"] => {
  return {
    type: ImageConsts.SET_SELECTED_IMAGE,
    payload: data,
  };
};

export const setFilterMenuAction = (
  data: ImageReducerStateType["filterMenuAction"],
): ImageActionSetterType["filterMenuAction"] => {
  return {
    type: ImageConsts.SET_FILTER_MENU_ACTION,
    payload: data,
  };
};

export const setFilteringPageableProperties = (
  data: ImageReducerStateType["filterPageable"],
): ImageActionSetterType["filterPageable"] => {
  return {
    type: ImageConsts.SET_FILTERING_PAGEABLE_PROPERTIES,
    payload: data,
  };
};

export const setFilteringResponse = (
  data: ImageReducerStateType["filteringResponse"],
): ImageActionSetterType["filteringResponse"] => {
  return {
    type: ImageConsts.SET_FILTERING_PAGEABLE_RESPONSE,
    payload: data,
  };
};
