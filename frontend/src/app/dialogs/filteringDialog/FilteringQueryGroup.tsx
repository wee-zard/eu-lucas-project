import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { QueryGroup } from "@model/QueryBuilderModel";
import { FilteringHelper } from "@helper/filteringHelper";
import FilteringQueryGroupActions from "./FilteringQueryGroupActions";
import FilteringQueryBodyTemplate from "./FilteringQueryBodyTemplate";
import { IdUtils } from "@helper/idUtils";

type Props = {
  id: number;
};

const FilteringQueryGroup = React.memo(function FilteringQueryGroup({
  id,
}: Props) {
  console.log("[FilteringQueryGroup]: RENDERED");

  const renderComponent = () => {
    const states = FilteringHelper.getUpdatedStates<QueryGroup>(id);
    return (
      <StyledQueryComponentHolder>
        <FilteringQueryGroupActions id={id} />
        {states.filtered.listOfComponents.length > 0 ? (
          <FilteringQueryBodyTemplate queryMultiType={states.filtered} />
        ) : (
          <StyledEmptyGroupHolder
          /** TODO: Add a default error message here. */
          // TODO: Can this component be reused in the Query Builder Model Group as well?
          >
            EMPTY QUERY GROUP FIELD!!!!!!!!!!!!!!!!!!
          </StyledEmptyGroupHolder>
        )}
      </StyledQueryComponentHolder>
    );
  };

  const [element, setElement] = useState(renderComponent());

  const updateElement = () => setElement(renderComponent());

  useEffect(() => {
    const states = FilteringHelper.getUpdatedStates<QueryGroup>(id);
    const eventName = IdUtils.getEventListenerName(states.filtered.id);
    window.addEventListener(eventName, updateElement);
    return () => window.removeEventListener(eventName, updateElement);
  }, []);

  return <React.Fragment>{element}</React.Fragment>;
});

export default FilteringQueryGroup;

export const StyledQueryHolder = styled.div<{}>((props) => ({
  width: "100%",
  display: "grid",
  gap: "16px",
}));

const StyledQueryComponentHolder = styled.div<{}>((props) => ({
  display: "grid",
  gap: "16px",
  margin: "16px 0 16px 16px",
  borderLeft: "4px solid white",
  padding: "16px 0 16px 8px",
  boxShadow: "0px 4px 12px rgba(255, 255, 255, 0.27)",
  borderRadius: "12px",
}));

const StyledEmptyGroupHolder = styled.div<{}>((props) => ({
  margin: "16px",
  borderLeft: "2px solid orange",
  padding: "8px",
}));
