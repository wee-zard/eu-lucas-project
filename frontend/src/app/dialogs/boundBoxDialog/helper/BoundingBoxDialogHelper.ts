import { PROCEDURE_LOG_PAGE_SIZE } from "@global/globalConsts";
import PageableProperties from "@model/PageableProperties";

export const defaultBoundingBoxPageableProperties: PageableProperties = {
  pageNo: 0,
  pageSize: PROCEDURE_LOG_PAGE_SIZE,
  field: "createdAt",
  sort: "desc",
};
