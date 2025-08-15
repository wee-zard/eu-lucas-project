import { ImageConsts } from "@redux/consts/imageConsts";
import ImageReducerStateType from "@redux/types/imageReducerStateType";

interface ImageActionSetterType {
  selectedImagesModel: {
    type: ImageConsts.SET_SELECTED_IMAGES_MODEL;
    payload: ImageReducerStateType["selectedImagesModel"];
  };
  queriedImageModel: {
    type: ImageConsts.SET_QUERIED_IMAGE_MODEL;
    payload: ImageReducerStateType["queriedImageModel"];
  };
  selectedImage: {
    type: ImageConsts.SET_SELECTED_IMAGE;
    payload: ImageReducerStateType["selectedImage"];
  };
  filterMenuAction: {
    type: ImageConsts.SET_FILTER_MENU_ACTION;
    payload: ImageReducerStateType["filterMenuAction"];
  };
  filterPageable: {
    type: ImageConsts.SET_FILTERING_PAGEABLE_PROPERTIES;
    payload: ImageReducerStateType["filterPageable"];
  };
  filteringResponse: {
    type: ImageConsts.SET_FILTERING_PAGEABLE_RESPONSE;
    payload: ImageReducerStateType["filteringResponse"];
  };
}

export default ImageActionSetterType;
