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
  id: number,
  queryMultiTypes: QueryMultiType[],
  queryElementRelation?: QueryElementRelations,
  queryType?: string,// = QueryTypes.QUERY_BUILDER,
}

export type QueryGroup = {
  id: number,
  queryComponents: QueryComponent[],
  queryElementRelation?: QueryElementRelations,
  queryType?: string,// = QueryTypes.QUERY_GROUP,
}

export type QueryComponent = {
  /**
   * Stores the creation time of the component
   * in ISO String format.
   */
  id: number;
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

export const initQueryBuilderObj = (): QueryBuilderModel => ({
  id: getNewIdToElement(),
  queryType: QueryTypes.QUERY_BUILDER,
  queryMultiTypes: [
    {
      id: getNewIdToElement() + 1,
      queryType: QueryTypes.QUERY_GROUP,
      queryComponents: [{ id: getNewIdToElement() + 2 }],
    },
  ],
});


