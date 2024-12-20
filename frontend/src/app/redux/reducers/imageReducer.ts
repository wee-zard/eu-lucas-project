import { UnknownAction } from "redux";
import { ImageConsts } from "../consts/imageConsts";
import { FilterDialogFilterOptions, MenuActions } from "../../model/enum";
import { ImageFilteringForm } from "../../model/ImageFilteringForm";
import { FilterFormDataGrid } from "../../model/FilterFormComponents";
import { initFilterFormDataGrid } from "../../helper/filterFormUtils";
import { initFirstQueryParent, initQueryBuilderObj, QueryBuilderModel } from "app/model/QueryBuilderModel";

interface ImageType {
  selectedImages: number[];
  selectedFilterTab: FilterDialogFilterOptions;
  filterFormDataGrid: FilterFormDataGrid;
  imageFilteringForm?: ImageFilteringForm;
  filterMenuAction?: MenuActions;
  queryBuilderModel: QueryBuilderModel;
}

const initialState: ImageType = {
  selectedImages: [],
  selectedFilterTab: FilterDialogFilterOptions.Year,
  filterFormDataGrid: initFilterFormDataGrid,
  imageFilteringForm: undefined,
  filterMenuAction: undefined,
  queryBuilderModel: initQueryBuilderObj(initFirstQueryParent),
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
        imageFilteringForm: action.payload as ImageFilteringForm | undefined,
      };
    case ImageConsts.SET_FILTER_FORM_DATA_GRID:
      return {
        ...state,
        filterFormDataGrid: action.payload as FilterFormDataGrid,
      };
    case ImageConsts.SET_FILTER_MENU_ACTION:
      return {
        ...state,
        filterMenuAction: action.payload as MenuActions | undefined,
      };
    case ImageConsts.SET_QUERY_BUILDER_MODEL:
      return {
        ...state,
        queryBuilderModel: action.payload as QueryBuilderModel,
      };
    default:
      return {
        ...state,
      };
  }
};

export default imageReducer;
