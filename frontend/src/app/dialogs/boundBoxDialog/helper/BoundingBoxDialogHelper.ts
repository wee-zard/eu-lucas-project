import PageableProperties from "@model/PageableProperties";

export const boundingBoxPageable: PageableProperties = {
  pageNo: 0,
  pageSize: 10,
  field: "createdAt",
  sort: "desc",
};
