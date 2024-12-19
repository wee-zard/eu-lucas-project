import { QueryBuilderModel } from "app/model/QueryBuilderModel";
import { FilterDialogFilterOptions, MenuActions } from "../../model/enum";
import { FilterFormDataGrid } from "../../model/FilterFormComponents";
import { ImageFilteringForm } from "../../model/ImageFilteringForm";
import { ImageConsts } from "../consts/imageConsts";

export const setSelectedImage = (data: number[]) => {
  return {
    type: ImageConsts.SET_SELECTED_IMAGES,
    payload: data,
  };
};

export const setSelectedFilterTab = (data: FilterDialogFilterOptions) => {
  return {
    type: ImageConsts.SET_SELECTED_FILTER_TAB,
    payload: data,
  };
};

export const setImageFilteringForm = (data?: ImageFilteringForm) => {
  return {
    type: ImageConsts.SET_IMAGE_FILTERING_FORM,
    payload: data,
  };
};

export const setFilterFormDataGrid = (data: FilterFormDataGrid) => {
  return {
    type: ImageConsts.SET_FILTER_FORM_DATA_GRID,
    payload: data,
  };
};

export const setFilterMenuAction = (data?: MenuActions) => {
  return {
    type: ImageConsts.SET_FILTER_MENU_ACTION,
    payload: data,
  };
};

export const setQueryBuilderModel = (data: QueryBuilderModel) => {
  return {
    type: ImageConsts.SET_QUERY_BUILDER_MODEL,
    payload: data,
  };
};