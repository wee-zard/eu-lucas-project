import { FilterDialogFilterOptions } from "../../model/enum";
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

export const setFilterFormDatagrid = (data: FilterFormDataGrid) => {
  return {
    type: ImageConsts.SET_FILTER_FORM_DATA_GRID,
    payload: data,
  };
};