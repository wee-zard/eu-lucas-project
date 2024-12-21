import {
  FilterDialogFilterOptions,
  OperatorComparableItems,
  OperatorSelectItems,
  OperatorTextfieldItems,
} from "./enum";

export enum QueryTypes {
  QUERY_BUILDER = "QUERY_BUILDER",
  QUERY_GROUP = "QUERY_GROUP",
}

export type QueryBuilderModel = {
  id: number;
  parentId: number;
  queryMultiTypes: QueryMultiType[];
  queryElementRelation?: QueryElementRelations;
  queryType: QueryTypes;
};

export type QueryGroup = {
  id: number;
  parentId: number;
  queryComponents: QueryComponent[];
  queryElementRelation?: QueryElementRelations;
  queryType: QueryTypes;
};

export type QueryComponent = {
  /**
   * Stores the creation time of the component
   * in ISO String format.
   */
  id: number;
  parentId: number;
  selectedFilterTab?: FilterDialogFilterOptions;
  groupFormId?: number;
  inputFormId?: number;
  selectInput?: string;
  operatorInput?: QueryConditions;
  textFieldInput?: string;
};

/**
 * Defines relations between groups and components.
 */
export enum QueryElementRelations {
  And = "AND",
  Or = "OR",
}

export type QueryMultiType = QueryBuilderModel | QueryGroup;

/**
 * Conditions that can be applied onto the table column
 * in query building.
 */
export type QueryConditions =
  | OperatorSelectItems
  | OperatorTextfieldItems
  | OperatorComparableItems;

export const getNewIdToElement = () => Date.now();

export const initFirstQueryParent = -1;

export const initQueryBuilderObj = (parentId: number): QueryBuilderModel => {
  const id = getNewIdToElement();
  return {
    id: id + 2,
    parentId: parentId,
    queryType: QueryTypes.QUERY_BUILDER,
    queryMultiTypes: [initQueryGroupObj(id + 2)],
  };
};

export const initQueryGroupObj = (parentId: number): QueryGroup => {
  const id = getNewIdToElement();
  return {
    id: id,
    parentId: parentId,
    queryType: QueryTypes.QUERY_GROUP,
    queryComponents: [
      {
        id: id + 1,
        parentId: id,
      },
    ],
  };
};
