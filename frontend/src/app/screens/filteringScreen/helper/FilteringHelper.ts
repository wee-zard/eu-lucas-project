import PageableProperties from "@model/PageableProperties";
import SelectedImagesModel, { QueriedImageType } from "@model/SelectedImagesModel";

export const defaultSelectedImagesModel: SelectedImagesModel = {
  queryImages: [],
};

/**
 * Get the default pagination model for the filtering dialog.
 */
export const defaultPaginationModel: PageableProperties = {
  pageNo: 0,
  pageSize: 9,
};

export const defaultQueriedImageModel = (): QueriedImageType => ({
  images: [],
});
