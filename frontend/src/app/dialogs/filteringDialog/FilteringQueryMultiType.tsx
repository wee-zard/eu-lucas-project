import React, { useEffect, useState } from "react";
import { QueryMultiType } from "@model/QueryBuilderModel";
import FilteringQueryGroup from "./FilteringQueryGroup";
import FilteringQueryBuilder from "./FilteringQueryBuilder";
import { FilteringHelper } from "@helper/filteringHelper";
import styled from "@emotion/styled";
import { QueryTypes } from "@model/enum";

type Props = {
  id: number;
};

const FilteringQueryMultiType = React.memo(function FilteringQueryMultiType({
  id,
}: Props) {
  console.log("[FilteringQueryMultiType]: RENDERED");

  const renderComponent = () => {
    const states = FilteringHelper.getUpdatedStates<QueryMultiType>(id);
    return states.filtered.queryType === QueryTypes.QUERY_BUILDER ? (
      <StyledQueryBuilderHolder>
        <FilteringQueryBuilder id={states.filtered.id} />
      </StyledQueryBuilderHolder>
    ) : (
      <FilteringQueryGroup id={states.filtered.id} />
    );
  };

  const [element, setElement] = useState(renderComponent());

  const updateElement = () => setElement(renderComponent());

  useEffect(() => {
    const states = FilteringHelper.getUpdatedStates<QueryMultiType>(id);
    const eventName = FilteringHelper.getEventListenerName(states.filtered.id);
    window.addEventListener(eventName, updateElement);
    return () => window.removeEventListener(eventName, updateElement);
  }, []);

  return <React.Fragment>{element}</React.Fragment>;
});

export default FilteringQueryMultiType;

const StyledQueryBuilderHolder = styled.div<{}>((props) => ({
  display: "grid",
  gap: "8px",
  margin: "16px 0 16px 16px",
  borderLeft: "4px solid cyan",
  padding: "8px 0 8px 8px",
  borderRadius: "12px",
  boxShadow: "0px 4px 12px rgba(73, 174, 181, 0.27)",
}));
