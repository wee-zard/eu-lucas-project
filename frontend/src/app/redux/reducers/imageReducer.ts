import { UnknownAction } from "redux";
import { ImageConsts } from "@redux/consts/imageConsts";
import { MenuActions } from "@model/enum";
import PageableProperties from "@model/PageableProperties";
import SelectedImagesModel from "@model/SelectedImagesModel";
import { FILTERING_PAGE_SIZE } from "@global/globalConsts";

interface ImageType {
  /**
   * Stores the list of selected images what the user selected through the Filter dialog.
   */
  listOfSelectedImages: SelectedImagesModel[];
  /**
   * Stores the currently active selected image model that is displayed in the Filter dialog.
   */
  selectedImage?: SelectedImagesModel;
  /**
   * Stores the action that can be fired from the Filter dialog.
   */
  filterMenuAction?: MenuActions;
  /**
   * Stores the properties of the page where the filtered images are displayed.
   */
  filteringPageableProperties: PageableProperties;
}

const initialState: ImageType = {
  listOfSelectedImages: [],
  selectedImage: undefined,
  filterMenuAction: undefined,
  filteringPageableProperties: { pageNo: 0, pageSize: FILTERING_PAGE_SIZE },
};

const imageReducer = (state = initialState, action: UnknownAction): ImageType => {
  switch (action.type) {
    case ImageConsts.SET_LIST_OF_SELECTED_IMAGES:
      return {
        ...state,
        listOfSelectedImages: action.payload as SelectedImagesModel[],
      };
    case ImageConsts.SET_SELECTED_IMAGE:
      return {
        ...state,
        selectedImage: action.payload as SelectedImagesModel,
      };
    case ImageConsts.SET_FILTER_MENU_ACTION:
      return {
        ...state,
        filterMenuAction: action.payload as MenuActions | undefined,
      };
    case ImageConsts.SET_FILTERING_PAGEABLE_PROPERTIES:
      return {
        ...state,
        filteringPageableProperties: action.payload as PageableProperties,
      };
    default:
      return {
        ...state,
      };
  }
};

export default imageReducer;
