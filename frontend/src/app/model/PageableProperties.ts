import { GridSortDirection } from "@mui/x-data-grid";

export default class PageableProperties {
  constructor(
    public pageNo: number,
    public pageSize: number,
    public field?: string,
    public sort?: GridSortDirection,
  ) {}
}
