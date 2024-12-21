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
import { FilteringHelper } from "app/helper/filteringHelper";
import { setQueryBuilderModelLocalStorage } from "./FilteringMenu";
import StyledSelectComponent from "app/components/StyledSelectComponent";

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

  const handleElementRelationSelection = (value: string) => {
    const states = FilteringHelper.getUpdatedStates<QueryGroup>(id);
    const modifiedQueryGroup: QueryGroup = {
      ...states.filtered,
      queryElementRelation: value as QueryElementRelations,
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

  const displayQueryElementRelationAction = (
    index: number,
    queryElementRelation?: QueryElementRelations
  ) => {
    /**
     * TODO: Ez lehetne egy pure component.
     * Csak azon input mezők kerüljenek renderelésre, amiket tényleg módosítottunk.
     * Ha módosítást csinálunk a Group-on belül, pl. törlünk egy sort, vagy felveszünk egy sort,
     * akkor ne kelljen minden egyes sorhoz külön renderelni a WHERE, AND/OR értékeket.
     */
    return index === 0 ? (
      <StyledQueryActionRelationHolder>WHERE</StyledQueryActionRelationHolder>
    ) : (
      <StyledQueryActionRelationHolder>
        <StyledSelectComponent
          inputTitle={"Relation"}
          options={Object.values(QueryElementRelations)}
          inputValue={queryElementRelation ?? ""}
          setValue={handleElementRelationSelection}
          isDisabled={index > 1}
        />
      </StyledQueryActionRelationHolder>
    );
  };

  const renderComponent = () => {
    const states = FilteringHelper.getUpdatedStates<QueryGroup>(id);
    return (
      <StyledQueryComponentHolder>
        <StyledGroupActionsHolder>
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
        <React.Fragment>
          {states.filtered.queryComponents.length > 0 ? (
            <StyledComponentGap>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <StyledQueryActionRelationHolder>
                  WHERE
                </StyledQueryActionRelationHolder>
                {states.filtered.queryComponents.length > 1 ? (
                  <div
                    style={{
                      height: "100%",
                      gap: "8px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <StyledQueryActionRelationHolder>
                        <StyledSelectComponent
                          inputTitle={"Relation"}
                          options={Object.values(QueryElementRelations)}
                          inputValue={
                            states.filtered.queryElementRelation ?? ""
                          }
                          setValue={handleElementRelationSelection}
                        />
                      </StyledQueryActionRelationHolder>
                    </div>
                    <div
                      style={{
                        height: "100%",
                        borderLeft: "5px solid green",
                        borderTop: "5px solid green",
                        borderBottom: "5px solid green",
                        borderRadius: "16px",
                        width: "12px",
                      }}
                    ></div>
                  </div>
                ) : null}
              </div>
              <StyledFilterComponentsHolder>
                {states.filtered.queryComponents.map(
                  (queryComponent, index) => (
                    <div key={queryComponent.id}>
                      <FilteringQueryComponent id={queryComponent.id} />
                    </div>
                  )
                )}
              </StyledFilterComponentsHolder>
            </StyledComponentGap>
          ) : (
            <StyledEmptyGroupHolder>
              EMPTY QUERY GROUP FIELD!!!!!!!!!!!!!!!!!!
            </StyledEmptyGroupHolder>
          )}
        </React.Fragment>
      </StyledQueryComponentHolder>
    );
  };

  const [element, setElement] = useState(renderComponent());

  const updateElement = () => setElement(renderComponent());

  useEffect(() => {
    const states = FilteringHelper.getUpdatedStates<QueryGroup>(id);
    const eventName = FilteringHelper.getEventListenerName(states.filtered.id);
    window.addEventListener(eventName, updateElement);
    return () => window.removeEventListener(eventName, updateElement);
  }, []);

  return <React.Fragment>{element}</React.Fragment>;
});

export default FilteringQueryGroup;

const StyledFilterComponentsHolder = styled.div<{}>((props) => ({
  width: "100%",
  display: "grid",
  gap: "16px",
}));

/**
 * TODO: a WHERE, AND/OR gombok szélessége lehetne 50%, míg a mellette megjelenő
 * teljes komponens lehetne 100%. Cél, hogy %-os szélességet adjak meg ezen komponensnek,
 * mintsem px/vh szélességet.
 */
const StyledQueryActionRelationHolder = styled.div<{}>((props) => ({
  display: "flex",
  alignItems: "center",
  minWidth: "10vh",
  height: "40px",
  minHeight: "40px",
  justifyContent: "center",
}));

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
  justifyContent: "end",
  alignItems: "center",
  paddingLeft: "8px",
}));
