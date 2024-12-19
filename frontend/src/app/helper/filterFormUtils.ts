import { Dispatch } from "@reduxjs/toolkit";
import {
  FormLogicalExpressions,
  OperatorTextfieldItems,
  OperatorSelectItems,
  OperatorComparableItems,
} from "../model/enum";
import {
  FilterFormDataGrid,
  FilterFormGroups,
  FormRelations,
} from "../model/FilterFormComponents";
import { setFilterFormDataGrid } from "../redux/actions/imageActions";
import { NotificationSeverity, throwNotification } from "./notificationUtil";

export const operatorSelectItems = Object.values(OperatorSelectItems);

export const operatorComparableItems = [
  ...operatorSelectItems,
  ...Object.values(OperatorComparableItems)
];

export const operatorTextfieldItems = [
  ...operatorSelectItems,
  ...Object.values(OperatorTextfieldItems),
];

export const initFilterFormDataGrid: FilterFormDataGrid = {
  filterComponents: [],
  groupRelations: [],
};

const fetchFormGroupWithUndefinedGroupId = (
  filterFormDataGrid: FilterFormDataGrid
) => {
  return filterFormDataGrid.filterComponents.filter(
    (group) => !group.groupFormId
  );
};

/**
 * Determines, wether a user provided form is exists in the list of filter forms.
 * @param filterFormInput The form what the user filled out.
 * @param listOfFilterFormsToCheck The forms we want to check if the provided
 * user form is exists in this list or not.
 * @returns Returnes true, if the user provided form is exists in the list, else false.
 */
export const isFilterGroupAlreadyExistsInTheDataGrid = (
  filterGroup: FilterFormGroups,
  filterFormDataGrid: FilterFormDataGrid
): boolean => {
  const selectedGroups = fetchFormGroupWithUndefinedGroupId(filterFormDataGrid);
  if (selectedGroups) {
    return selectedGroups.some((group) => {
      const { inputFormId, groupFormId, ...restObj } = group;
      return JSON.stringify(restObj) === JSON.stringify(filterGroup);
    });
  }
  return false;
};

const fetchLogicalExpressionOfInputComponents = (
  selectedGroupInputIds: number[],
  filterFormDataGrid: FilterFormDataGrid
): FormLogicalExpressions => {
  if (selectedGroupInputIds.length > 1) {
    const inputComponentId = selectedGroupInputIds.pop();
    const outputComponentId = selectedGroupInputIds.pop();
    if (inputComponentId && outputComponentId) {
      const filterFormRelations =
        filterFormDataGrid.groupRelations.find(
          (group) =>
            group.inputComponentId === inputComponentId &&
            group.outputComponentId === outputComponentId
        );
      if (filterFormRelations) {
        return filterFormRelations.logicalExpression;
      }
    }
  }
  return FormLogicalExpressions.And;
};

export const definedRelationsBetweenFormGroups = (
  inputFormGroupId: number,
  filterFormDataGrid: FilterFormDataGrid
): FormRelations[] => {
  /*
  const selectedGroup = fetchFormGroupWithUndefinedGroupId(filterFormDataGrid);
  if (selectedGroup) {
    const selectedGroupInputIds = selectedGroup.map((group) =>
      Number(group.inputFormId)
    );
    const logicalExpression = fetchLogicalExpressionOfInputComponents(
      selectedGroupInputIds,
      filterFormDataGrid
    );
    return selectedGroup.map((group) => ({
      inputComponentId: inputFormGroupId,
      outputComponentId: inputFormGroupId, //Number(group.inputFormId),
      logicalExpression: FormLogicalExpressions.And, //logicalExpression,
    }));
  }
  */
  return [{
    inputComponentId: undefined,
    outputComponentId: undefined,
    logicalExpression: FormLogicalExpressions.And
  }];
};

export const saveFilterFormComponent = (
  filterFormComponent: FilterFormGroups,
  filterFormDataGrid: FilterFormDataGrid,
  dispatch: Dispatch
) => {
  // Is inputForm already in the undefined group?
  if (
    isFilterGroupAlreadyExistsInTheDataGrid(
      filterFormComponent,
      filterFormDataGrid
    )
  ) {
    throwNotification(NotificationSeverity.Error, 
      "Hiba! A megadott űrlap nem menthető el, mivel az már létezik az aktív szűrő szekcióban!");
    return;
  }

  const inputFormId =
    filterFormDataGrid.filterComponents.length > 0
      ? Math.max(
          ...filterFormDataGrid.filterComponents.map(
            (group) => group.inputFormId ?? 0
          )
        ) + 1
      : 1;

  dispatch(
    setFilterFormDataGrid({
      filterComponents: [
        ...filterFormDataGrid.filterComponents,
        /**
         * The new Filter Group to display in the Data Grid.
         * Defined without a GroupId.
         */
        {
          ...filterFormComponent,
          inputFormId: inputFormId,
        },
      ],
      groupRelations: 
        /**
         * We need to add relations between the components.
         */
        [
          {
            inputComponentId: undefined,
            outputComponentId: undefined,
            logicalExpression: FormLogicalExpressions.And
          }
          /*
          ...definedRelationsBetweenFormGroups(
            inputFormId,
            filterFormDataGrid
          ),
          */
          //...filterFormDataGrid.groupRelations
        ],
    })
  );
};
