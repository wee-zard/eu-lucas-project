import React from "react";
import StyledIconButton from "@components/StyledIconButton";
import styled from "@emotion/styled";
import {
  getNewIdToElement,
  QueryComponent,
  QueryElementRelations,
  QueryGroup,
} from "@model/QueryBuilderModel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { FilteringHelper } from "@helper/filteringHelper";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import i18n from "@i18n/i18nHandler";

type Props = {
  id: number;
};

const FilteringQueryGroupActions = React.memo(function FilteringQueryGroupActions({ id }: Props) {
  console.log("[FilteringQueryGroupActions]: RENDERED");

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
  const handleOnClickAddFilterCondition = () => {
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

  const handleOnClickRemoveQueryGroup = () => {
    const states = FilteringHelper.getUpdatedStates<QueryGroup>(id);
    const obj = FilteringHelper.handleFilterChanges(states.root, id);
    LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
    FilteringHelper.sendUpdateEvent(states.filtered.parentId);
  };

  return (
    <StyledGroupActionsHolder>
      <StyledIconButton
        buttonIcon={<AddCircleOutlineIcon />}
        tooltip={{
          tooltipTitle: i18n.t("screens.filtering.query-builder.addFilterConditionTooltip"),
          tooltipPlacement: "top",
        }}
        onClick={handleOnClickAddFilterCondition}
      />
      <StyledIconButton
        buttonIcon={<DeleteForeverOutlinedIcon />}
        buttonColor={"warning"}
        tooltip={{
          tooltipTitle: i18n.t("screens.filtering.query-builder.removeQueryGroupTooltip"),
          tooltipPlacement: "top",
        }}
        onClick={handleOnClickRemoveQueryGroup}
      />
    </StyledGroupActionsHolder>
  );
});

export default FilteringQueryGroupActions;

const StyledGroupActionsHolder = styled.div<{}>((_) => ({
  display: "flex",
  gap: 8,
  justifyContent: "end",
  alignItems: "center",
  padding: "0 8px 0 8px",
}));
