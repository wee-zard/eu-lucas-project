import {
  FilterDialogFilterOptions,
  FormLogicalExpressions,
  OperatorNonSpecificItems,
  OperatorSpecificItems,
} from "./enum";

export type OperatorItems = OperatorSpecificItems | OperatorNonSpecificItems;

export type FilterFormDataGrid = {
  filterFormGroups: FilterFormGroups[];
  relations: FilterFormRelations;
};

export type FilterFormRelations = {
  inputRelations: FormRelations[];
  groupRelations: FormRelations[];
};

export type FormRelations = {
  inputComponentId: number;
  outputComponentId: number;
  logicalExpression: FormLogicalExpressions;
};

export type FilterFormGroups = {
  groupFormId?: number;
  inputFormId?: number;
  selectedFilterTab: FilterDialogFilterOptions;
  selectInput?: string;
  operatorInput?: OperatorItems;
  textFieldInput?: string;
};
