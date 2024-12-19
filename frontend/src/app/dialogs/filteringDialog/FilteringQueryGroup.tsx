import React from "react";
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

type Props = {
  queryGroup: QueryGroup;
  callback: (queryGroup?: QueryGroup) => void;
};

const FilteringQueryGroup = ({ queryGroup, callback }: Props) => {
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
    const modifiedQueryComponents: QueryComponent[] = [
      ...queryGroup.queryComponents,
      { id: getNewIdToElement() },
    ];
    callback({
      id: queryGroup.id,
      queryType: queryGroup.queryType,
      queryComponents: modifiedQueryComponents,
      queryElementRelation:
        !queryGroup.queryElementRelation && modifiedQueryComponents.length === 2
          ? QueryElementRelations.And
          : queryGroup.queryElementRelation,
    });
  };

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
              onClick={() => callback()}
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
          queryGroup.queryComponents.length > 0 ? (
            queryGroup.queryComponents.map((queryComponent) => (
              <div key={queryComponent.id}>
                {
                  // TODO: Remove this if check later, and remove the component in the else case.
                  queryGroup.queryComponents.length > 1000 ? (
                    <FilteringQueryComponent
                      queryComponent={queryComponent}
                      callback={(modifiedQueryComponent) => {
                        if (modifiedQueryComponent) {
                          const components = queryGroup.queryComponents.map(
                            (item) =>
                              item.id === queryComponent.id
                                ? modifiedQueryComponent
                                : item
                          );
                          const modifiedQueryGroup: QueryGroup = {
                            ...queryGroup,
                            queryComponents: components,
                            queryElementRelation:
                              !queryGroup.queryElementRelation &&
                              components.length === 2
                                ? (queryGroup.queryElementRelation =
                                    QueryElementRelations.And)
                                : queryGroup.queryElementRelation,
                          };
                          callback(modifiedQueryGroup);
                        } else {
                          const components = queryGroup.queryComponents.filter(
                            (item) => item.id !== queryComponent.id
                          );
                          const modifiedQueryGroup: QueryGroup = {
                            ...queryGroup,
                            queryComponents: components,
                            queryElementRelation:
                              !queryGroup.queryElementRelation &&
                              components.length === 2
                                ? (queryGroup.queryElementRelation =
                                    QueryElementRelations.And)
                                : queryGroup.queryElementRelation,
                          };
                          callback(modifiedQueryGroup);
                        }
                      }}
                    />
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
