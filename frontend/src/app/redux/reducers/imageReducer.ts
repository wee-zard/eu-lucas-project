import { UnknownAction } from "redux";
import { ImageConsts } from "../consts/imageConsts";
import { listItemOptions } from "../../global/globalConsts";
import { FilterDialogFilterOptions } from "../../model/enum";
import ImageFilteringForm from "../../model/ImageFilteringForm";

interface ImageType {
  selectedImages: number[];
  selectedFilterTab: FilterDialogFilterOptions;
  imageFilteringForm: ImageFilteringForm;
}

const initialState: ImageType = {
  selectedImages: [],
  selectedFilterTab: listItemOptions[0].name,
  imageFilteringForm: new ImageFilteringForm(),
};

const imageReducer = (
  state = initialState,
  action: UnknownAction
): ImageType => {
  switch (action.type) {
    case ImageConsts.SET_SELECTED_IMAGES:
      return {
        ...state,
        selectedImages: action.payload as number[],
      };
    case ImageConsts.SET_SELECTED_FILTER_TAB:
      return {
        ...state,
        selectedFilterTab: action.payload as FilterDialogFilterOptions,
      };
    case ImageConsts.SET_IMAGE_FILTERING_FORM:
      return {
        ...state,
        imageFilteringForm: action.payload as ImageFilteringForm,
      };
    default:
      return {
        ...state,
      };
  }
};

export default imageReducer;
