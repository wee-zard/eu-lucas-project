import {
  FilterDialogFilterOptions,
  FormLogicalExpressions,
  OperatorTextfieldItems,
  OperatorSelectItems,
  OperatorComperableItems,
} from "./enum";

export type OperatorItems = OperatorSelectItems | OperatorTextfieldItems | OperatorComperableItems;

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
