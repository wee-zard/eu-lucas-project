import {
  getNewIdToElement,
  QueryComponent,
  QueryElementRelations,
  QueryGroup,
} from "@model/QueryBuilderModel";
import { FilteringHelper } from "@helper/filteringHelper";
import { LocalStorageUtils } from "@helper/localStorageUtil";

/*
 * One button must be displayed here for the purpose
 * of adding new {@link QueryComponent} type of objects into the list
 * and displaying them in the menu.
 *
 * If the number of components in the group are exactly two,
 * then assign an AND value to the {@link QueryElementRelations}.
 * This will be the default relation between the components,
 * what the users could overwrite later.
 */
export const handleOnClickAddFilterCondition = (id: number) => {
  const states = FilteringHelper.getUpdatedStates<QueryGroup>(id);
  const modifiedQueryComponents: QueryComponent[] = [
    ...states.filtered.listOfComponents,
    { id: getNewIdToElement(), parentId: states.filtered.id },
  ];
  const modifiedQueryGroup: QueryGroup = {
    ...states.filtered,
    listOfComponents: modifiedQueryComponents,
    queryElementRelation:
      !states.filtered.queryElementRelation && modifiedQueryComponents.length === 2
        ? QueryElementRelations.And
        : states.filtered.queryElementRelation,
  };
  const obj = FilteringHelper.handleFilterChanges(states.root, id, modifiedQueryGroup);
  LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
  // Update the component itself on changes.
  FilteringHelper.sendUpdateEvent(states.filtered.id);
};

export const handleComponentRemoval = (id: number) => {
  const states = FilteringHelper.getUpdatedStates<QueryComponent>(id);
  const obj = FilteringHelper.handleFilterChanges(states.root, id);
  LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
  // Update the parent component itself on component deletion.
  FilteringHelper.sendUpdateEvent(states.filtered.parentId);
};

export const handleOnClickRemoveQueryGroup = (id: number) => {
  const states = FilteringHelper.getUpdatedStates<QueryGroup>(id);
  const obj = FilteringHelper.handleFilterChanges(states.root, id);
  LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
  FilteringHelper.sendUpdateEvent(states.filtered.parentId);
};
