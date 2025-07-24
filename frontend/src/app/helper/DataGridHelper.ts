import { LocalStorageKeys } from "@model/enum";
import PageableProperties from "@model/PageableProperties";
import { getLocalStorageItem, setLocalStorageItem } from "./localStorageUtil";
import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid/models";

export class DataGridHelper {
  constructor(
    public cacheKey: LocalStorageKeys,
    public defaultPagination: PageableProperties,
    public refreshDataGridRows: () => void,
  ) {}

  /**
   * Dynamically calculates the hights of the data grid table 
   * based on the size of tha pagination page.
   *
   * @param rowHeight The set height for the rows.
   * @returns Returns the height of the data grid table.
   */
  getDataGridTableHeight = (rowHeight: number): number => {
    return (this.getPageableFromLocalStorage().pageSize * rowHeight) + rowHeight + 40;
  }

  getPageableFromLocalStorage = (): PageableProperties => {
    const pageableProperties = getLocalStorageItem(this.cacheKey);

    if (!pageableProperties) {
      return { pageNo: this.defaultPagination.pageNo, pageSize: this.defaultPagination.pageSize };
    }

    return JSON.parse(pageableProperties) as PageableProperties;
  };

  /**
   * Handles the changes of the pagination option. This way, if the pagination is changed,
   * then we are refetching the records from the server.
   * @param pagination
   */
  handleGridPaginationModelChange = (pagination: GridPaginationModel) => {
    const pageable: PageableProperties = {
      ...this.getPageableFromLocalStorage(),
      pageNo: pagination.page,
      pageSize: pagination.pageSize,
    };
    setLocalStorageItem(pageable, this.cacheKey);
    this.refreshDataGridRows();
  };

  handleSortModelChange = (sortModel: GridSortModel): void => {
    const pageable: PageableProperties = {
      ...this.getPageableFromLocalStorage(),
      field: sortModel[0]?.field,
      sort: sortModel[0]?.sort,
    };
    setLocalStorageItem(pageable, this.cacheKey);
    this.refreshDataGridRows();
  };
}
