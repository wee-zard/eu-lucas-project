import React, { useEffect, useState } from "react";
import StyledIconButton from "app/components/StyledIconButton";
import styled from "@emotion/styled";
import { StyledComponentGap } from "app/global/globalStyles";
import {
  getNewIdToElement,
  QueryComponent,
  QueryElementRelations,
  QueryGroup,
} from "app/model/QueryBuilderModel";
import FilteringQueryComponent from "./FilteringQueryComponent";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { OtherworldlyGreeting } from "./OtherworldlyGreeting";
import { FilteringHelper } from "app/helper/filteringHelper";
import { setQueryBuilderModelLocalStorage } from "./FilteringMenu";

type Props = {
  id: number;
};

const FilteringQueryGroup = React.memo(function FilteringQueryGroup({
  id,
}: Props) {
  console.log("[FilteringQueryGroup]: RENDERED");

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
      ...states.filtered.queryComponents,
      { id: getNewIdToElement(), parentId: states.filtered.id },
    ];
    const modifiedQueryGroup: QueryGroup = {
      ...states.filtered,
      queryComponents: modifiedQueryComponents,
      queryElementRelation:
        !states.filtered.queryElementRelation &&
        modifiedQueryComponents.length === 2
          ? QueryElementRelations.And
          : states.filtered.queryElementRelation,
    };
    const obj = FilteringHelper.handleFilterChanges(
      states.root,
      id,
      modifiedQueryGroup
    );
    setQueryBuilderModelLocalStorage(obj);
    // Update the component itself on changes.
    FilteringHelper.sendUpdateEvent(states.filtered.id);
  };

  const handleOnClickRemoveQueryGroup = () => {
    const states = FilteringHelper.getUpdatedStates<QueryGroup>(id);
    const obj = FilteringHelper.handleFilterChanges(states.root, id);
    setQueryBuilderModelLocalStorage(obj);
    FilteringHelper.sendUpdateEvent(states.filtered.parentId);
  };

  const renderComponent = () => {
    const states = FilteringHelper.getUpdatedStates<QueryGroup>(id);
    return (
      <StyledQueryComponentHolder>
        {
          /**
           * Display the relations between the {@link QueryComponent} elements.
           */
          /*
          queryGroup.queryElementRelation ? (
            <div>{queryGroup.queryElementRelation}</div>
          ) : queryGroup.queryComponents.length === 1 ? (
            <div>WHERE</div>
          ) : null
          */
          <StyledGroupActionsHolder>
            <div>WHERE</div>
            <StyledComponentGap>
              <StyledIconButton
                buttonIcon={<AddCircleOutlineIcon />}
                tooltip={{
                  tooltipTitle: "Add Filter Condition",
                  tooltipPlacement: "top",
                }}
                onClick={handleOnClickAddFilterCondition}
              />
              <StyledIconButton
                buttonIcon={<DeleteForeverOutlinedIcon />}
                tooltip={{
                  tooltipTitle: "Remove Query Group",
                  tooltipPlacement: "right-start",
                }}
                onClick={handleOnClickRemoveQueryGroup}
              />
            </StyledComponentGap>
          </StyledGroupActionsHolder>
        }

        <React.Fragment>
          {
            /**
             * TODO: There is a case, where the length of the query components is zero.
             * This case, please display a text to the user, that "GROUP IS EMPTY".
             */
            /**
             * Display the Query Components.
             * If no component is in the array, then nothing will be displayed.
             */
            states.filtered.queryComponents.length > 0 ? (
              states.filtered.queryComponents.map((queryComponent) => (
                <div key={queryComponent.id}>
                  {
                    // TODO: Remove this if check later, and remove the component in the else case.
                    states.filtered.queryComponents.length > 0 ? (
                      <FilteringQueryComponent id={queryComponent.id} />
                    ) : (
                      <OtherworldlyGreeting />
                    )
                  }
                </div>
              ))
            ) : (
              <StyledEmptyGroupHolder>
                EMPTY QUERY GROUP FIELD!!!!!!!!!!!!!!!!!!
              </StyledEmptyGroupHolder>
            )
          }
        </React.Fragment>
      </StyledQueryComponentHolder>
    );
  };

  const [element, setElement] = useState(renderComponent());

  useEffect(() => {
    const states = FilteringHelper.getUpdatedStates<QueryGroup>(id);
    const eventName = FilteringHelper.getEventListenerName(states.filtered.id);
    window.addEventListener(eventName, () => setElement(renderComponent()));
    return () =>
      window.removeEventListener(eventName, () =>
        setElement(renderComponent())
      );
  }, []);

  return <React.Fragment>{element}</React.Fragment>;
});

export default FilteringQueryGroup;

const StyledQueryComponentHolder = styled.div<{}>((props) => ({
  display: "grid",
  gap: "16px",
  margin: "16px",
  borderLeft: "2px solid white",
  backgroundColor: "#00000030",
  padding: "16px 8px 16px 8px",
  boxShadow: "0px 8px 16px #4973b545",
  borderRadius: "12px",
}));

const StyledEmptyGroupHolder = styled.div<{}>((props) => ({
  margin: "16px",
  borderLeft: "2px solid orange",
  padding: "8px",
}));

const StyledGroupActionsHolder = styled.div<{}>((props) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: "8px",
}));
