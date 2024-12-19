import { FilteringHelper } from "app/helper/filteringHelper";
import { RootState } from "../store";

export const selectSelectedImages = (state: RootState) => state.imageStore.selectedImages;

export const selectSelectedFilterTab = (state: RootState) => state.imageStore.selectedFilterTab;

export const selectImageFilteringForm = (state: RootState) => state.imageStore.imageFilteringForm;

export const selectFilterFormDataGrid = (state: RootState) => state.imageStore.filterFormDataGrid;

export const selectFilterMenuActions = (state: RootState) => state.imageStore.filterMenuAction;

export const selectQueryBuilderModel = (state: RootState) => state.imageStore.queryBuilderModel;

export const selectQueryBranch = (state: RootState, id: number) => FilteringHelper.getBranchFromTreeById(state.imageStore.queryBuilderModel, id);

export const selectImageStorage = (state: RootState) => state.imageStore;
