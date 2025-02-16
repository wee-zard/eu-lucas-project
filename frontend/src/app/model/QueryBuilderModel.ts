import {
  FilterDialogFilters,
  OperatorBooleanItemNames,
  OperatorBooleanItems,
  OperatorComparableItemNames,
  OperatorComparableItems,
  OperatorSelectItemNames,
  OperatorSelectItems,
  OperatorTextfieldItems,
  QueryTypes,
} from "./enum";

export type QueryBuilderModel = {
  id: number;
  parentId: number;
  listOfQueries: QueryMultiType[];
  queryElementRelation?: QueryElementRelations;
  queryType: QueryTypes;
};

export type QueryGroup = {
  id: number;
  parentId: number;
  listOfComponents: QueryComponent[];
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
  selectedFilterTab?: keyof typeof FilterDialogFilters;
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
  | OperatorComparableItems
  | OperatorBooleanItems;

export const getNewIdToElement = () => Date.now();

export const initFirstQueryParent = -1;

export const initQueryBuilderObj = (parentId: number): QueryBuilderModel => {
  const id = getNewIdToElement();
  return {
    id: id + 2,
    parentId: parentId,
    queryType: QueryTypes.QUERY_BUILDER,
    listOfQueries: [initQueryGroupObj(id + 2)],
  };
};

export const initQueryGroupObj = (parentId: number): QueryGroup => {
  const id = getNewIdToElement();
  return {
    id: id,
    parentId: parentId,
    queryType: QueryTypes.QUERY_GROUP,
    listOfComponents: [
      {
        id: id + 1,
        parentId: id,
      },
    ],
  };
};

export const operatorBooleanItems = Object.values(OperatorBooleanItemNames).sort();

export const operatorSelectItems = Object.values(OperatorSelectItemNames).sort();

export const operatorComparableItems = [
  ...operatorSelectItems,
  ...Object.values(OperatorComparableItemNames),
].sort();

// TODO: It is not used yet. Please change the Object.values(OperatorTextfieldItems) to look the same as the above ones.
export const operatorTextfieldItems = [
  ...operatorSelectItems,
  ...Object.values(OperatorTextfieldItems),
].sort();
