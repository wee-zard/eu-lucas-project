import { Dispatch } from "@reduxjs/toolkit";
import {
  FormLogicalExpressions,
  OperatorNonSpecificItems,
  OperatorSpecificItems,
} from "../model/enum";
import {
  FilterFormDataGrid,
  FilterFormGroups,
  FormRelations,
} from "../model/FilterFormComponents";
import { setFilterFormDatagrid } from "../redux/actions/imageActions";
import { NotificationSeverity, throwNotification } from "./notificationUtil";

export const operatorSpecificItems = Object.values(OperatorSpecificItems);

export const operatorNonSpecificItems = [
  operatorSpecificItems,
  ...Object.values(OperatorNonSpecificItems),
];

export const initFilterFormDataGrid: FilterFormDataGrid = {
  filterFormGroups: [],
  relations: {
    inputRelations: [],
    groupRelations: [],
  },
};

const fetchFormGroupWithUndefinedGroupId = (
  filterFormDataGrid: FilterFormDataGrid
) => {
  return filterFormDataGrid.filterFormGroups.filter(
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
        filterFormDataGrid.relations.inputRelations.find(
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
      outputComponentId: Number(group.inputFormId),
      logicalExpression: logicalExpression,
    }));
  }
  return [];
};

export const saveFilterFormcomponent = (
  filterFormComponent: FilterFormGroups,
  filterFormDataGrid: FilterFormDataGrid,
  dispatch: Dispatch
) => {
  // Is inputForm is already in the undefined group?
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
    filterFormDataGrid.filterFormGroups.length > 0
      ? Math.max(
          ...filterFormDataGrid.filterFormGroups.map(
            (group) => group.inputFormId ?? 0
          )
        ) + 1
      : 1;

  dispatch(
    setFilterFormDatagrid({
      filterFormGroups: [
        ...filterFormDataGrid.filterFormGroups,
        /**
         * The new Filter Group to display in the Data Grid.
         * Defined without a GroupId.
         */
        {
          ...filterFormComponent,
          inputFormId: inputFormId,
        },
      ],
      relations:
        filterFormDataGrid.filterFormGroups.length === 0
          ? /**
             * If there is no component in the list, then there is
             * no need to add relations between the components.
             */
            {
              ...filterFormDataGrid.relations,
            }
          : /**
             * We need to add relations between the components.
             */
            {
              inputRelations: [
                ...filterFormDataGrid.relations.inputRelations,
                ...definedRelationsBetweenFormGroups(
                  inputFormId,
                  filterFormDataGrid
                ),
              ],
              groupRelations: [...filterFormDataGrid.relations.groupRelations],
            },
    })
  );
};
