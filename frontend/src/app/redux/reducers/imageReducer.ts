import { ImageConsts } from "@redux/consts/imageConsts";
import {
  defaultPaginationModel,
  defaultSelectedImagesModel,
} from "@screens/filteringScreen/helper/FilteringHelper";
import ImageReducerStateType from "@redux/types/imageReducerStateType";
import ImageActionTypes from "@redux/types/imageActionTypes";

const initialState: ImageReducerStateType = {
  selectedImagesModel: defaultSelectedImagesModel,
  queriedImageModel: undefined,
  selectedImage: undefined,
  filterMenuAction: undefined,
  filteringResponse: undefined,
  filterPageable: defaultPaginationModel,
};

const imageReducer = (state = initialState, action: ImageActionTypes): ImageReducerStateType => {
  switch (action.type) {
    case ImageConsts.SET_SELECTED_IMAGES_MODEL:
      return {
        ...state,
        selectedImagesModel: action.payload,
      };
    case ImageConsts.SET_SELECTED_IMAGE:
      return {
        ...state,
        selectedImage: action.payload,
      };
    case ImageConsts.SET_FILTER_MENU_ACTION:
      return {
        ...state,
        filterMenuAction: action.payload,
      };
    case ImageConsts.SET_FILTERING_PAGEABLE_PROPERTIES:
      return {
        ...state,
        filterPageable: action.payload,
      };
    case ImageConsts.SET_FILTERING_PAGEABLE_RESPONSE:
      return {
        ...state,
        filteringResponse: action.payload,
      };
    case ImageConsts.SET_QUERIED_IMAGE_MODEL:
      return {
        ...state,
        queriedImageModel: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default imageReducer;
