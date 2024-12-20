import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  initQueryBuilderObj,
  initQueryGroupObj,
  QueryBuilderModel,
  QueryMultiType,
} from "app/model/QueryBuilderModel";
import StyledButton from "app/components/StyledButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilteringQueryMultiType from "./FilteringQueryMultiType";
import { StyledComponentGap } from "app/global/globalStyles";
import { FilteringHelper } from "app/helper/filteringHelper";
import { setQueryBuilderModelLocalStorage } from "./FilteringMenu";

type Props = {
  id: number;
};

const FilteringMenuBody = React.memo(function FilteringMenuBody({ id }: Props) {
  console.log("[FilteringMenuBody]: RENDERED");

  /**
   * Adding a new {@link QueryBuilderModel} to the TREE.
   * Only add a new group to the list, of one element is already
   * exists in the actual branch.
   */
  const handleClickOnAddGroup = () => {
    const states = FilteringHelper.getUpdatedStates<QueryBuilderModel>(id);
    const modifiedQueryMultiTypes: QueryMultiType[] = [
      ...states.filtered.queryMultiTypes,
      initQueryBuilderObj(states.filtered.id),
    ];
    const modifiedQueryBuilderModel = FilteringHelper.modifyQueryBuilderModel(
      modifiedQueryMultiTypes,
      states.filtered
    );
    const obj = FilteringHelper.handleFilterChanges(
      states.root,
      id,
      modifiedQueryBuilderModel
    );
    setQueryBuilderModelLocalStorage(obj);
    FilteringHelper.sendUpdateEvent(states.filtered.id);
  };

  const handleClickOnAddCondition = () => {
    const states = FilteringHelper.getUpdatedStates<QueryBuilderModel>(id);
    const modifiedQueryMultiTypes: QueryMultiType[] = [
      ...states.filtered.queryMultiTypes,
      initQueryGroupObj(states.filtered.id),
    ];
    const modifiedQueryBuilderModel = FilteringHelper.modifyQueryBuilderModel(
      modifiedQueryMultiTypes,
      states.filtered
    );
    const obj = FilteringHelper.handleFilterChanges(
      states.root,
      id,
      modifiedQueryBuilderModel
    );
    setQueryBuilderModelLocalStorage(obj);
    FilteringHelper.sendUpdateEvent(states.filtered.id);
  };

  const renderComponent = () => {
    const states = FilteringHelper.getUpdatedStates<QueryBuilderModel>(id);
    return (
      <StyledQueryBuilderHolder>
        {states.filtered.queryMultiTypes.length > 0 ? (
          states.filtered.queryMultiTypes.map((multiType: QueryMultiType) => (
            <div key={multiType.id}>
              <FilteringQueryMultiType id={multiType.id} />
            </div>
          ))
        ) : (
          <StyledEmptyQueryBuilderHolder>
            EMPTY QUERY BUILDER MODEL FIELD
          </StyledEmptyQueryBuilderHolder>
        )}

        <StyledComponentGap gap={"8px"}>
          <StyledButton
            buttonIcon={<AddCircleOutlineIcon />}
            buttonText="Add condition"
            onClick={handleClickOnAddCondition}
          />
          {states.filtered.queryMultiTypes.length > 0 ? (
            <StyledButton
              buttonIcon={<AddCircleOutlineIcon />}
              buttonText="Add group"
              onClick={handleClickOnAddGroup}
            />
          ) : null}
        </StyledComponentGap>
      </StyledQueryBuilderHolder>
    );
  };

  const [element, setElement] = useState(renderComponent());

  const updateElement = () => setElement(renderComponent());
  
  useEffect(() => {
    const eventName = FilteringHelper.getEventListenerName(
      FilteringHelper.getUpdatedStates<QueryBuilderModel>(id).filtered.id
    );
    window.addEventListener(eventName, updateElement);
    return () => window.removeEventListener(eventName, updateElement);
  }, []);

  return <React.Fragment>{element}</React.Fragment>;
});

export default FilteringMenuBody;

const StyledQueryBuilderHolder = styled.div<{}>((props) => ({
  display: "grid",
  gap: "8px",
  margin: "16px 0 16px 16px",
  borderLeft: "2px solid blue",
  padding: "8px 0 8px 8px",
}));

const StyledEmptyQueryBuilderHolder = styled.div<{}>((props) => ({
  margin: "16px",
  borderLeft: "2px solid yellow",
  padding: "8px",
}));
