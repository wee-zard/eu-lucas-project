import { LocalStorageUtils } from "@helper/localStorageUtil";
import { QueryBuilderModel } from "@model/QueryBuilderModel";

export default class FilteringQueryRequest {
  constructor(public queryBuilder: QueryBuilderModel = LocalStorageUtils.getQueryBuilderModel()) {}
}
