import { FILTERING_PAGE_SIZE } from "@global/globalConsts";
import PageableProperties from "@model/PageableProperties";
import SelectedImagesModel, { QueriedImageType } from "@model/SelectedImagesModel";

export const defaultSelectedImagesModel: SelectedImagesModel = {
  queryImages: [],
};

/**
 * Get the default pagination model for the filtering dialog.
 */
export const defaultFilteringPaginationModel: PageableProperties = {
  pageNo: 0,
  pageSize: FILTERING_PAGE_SIZE,
};

export const defaultQueriedImageModel = (): QueriedImageType => ({
  images: [],
});
