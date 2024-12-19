import {
  FilterDialogFilterOptions,
  FormLogicalExpressions,
  OperatorTextfieldItems,
  OperatorSelectItems,
  OperatorComparableItems,
} from "./enum";

export type OperatorItems = OperatorSelectItems | OperatorTextfieldItems | OperatorComparableItems;

export type FilterFormDataGrid = {
  filterComponents: FilterFormGroups[];
  groupRelations: FormRelations[];
};

export type FormRelations = {
  inputComponentId?: number;
  outputComponentId?: number;
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
