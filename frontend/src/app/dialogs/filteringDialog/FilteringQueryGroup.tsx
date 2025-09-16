import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { QueryGroup } from "@model/QueryBuilderModel";
import { FilteringHelper } from "@helper/filteringHelper";
import FilteringQueryBodyTemplate from "./FilteringQueryBodyTemplate";
import { IdUtils } from "@helper/idUtils";
import FilteringQueryGroupActionsWrapper from "./FilteringQueryGroupActionsWrapper";

type Props = {
  id: number;
};

const FilteringQueryGroup = React.memo(function FilteringQueryGroup({ id }: Props) {
  console.log("[FilteringQueryGroup]: RENDERED");

  const renderComponent = () => {
    const states = FilteringHelper.getUpdatedStates<QueryGroup>(id);
    return (
      <StyledQueryComponentHolder>
        {states.filtered.listOfComponents.length > 0 ? (
          <FilteringQueryBodyTemplate queryMultiType={states.filtered} />
        ) : (
          <StyleQueryGroupActionWrapper>
            <FilteringQueryGroupActionsWrapper
              queryMultiType={states.filtered}
              isDisplayed={true}
            />
          </StyleQueryGroupActionWrapper>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return <React.Fragment>{element}</React.Fragment>;
});

export default FilteringQueryGroup;

const StyleQueryGroupActionWrapper = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "row-reverse",
});

export const StyledQueryHolder = styled.div<{}>((_) => ({
  width: "100%",
  display: "grid",
  gap: "16px",
}));

const StyledQueryComponentHolder = styled.div<{}>((props) => ({
  display: "grid",
  gap: "16px",
  margin: "8px 0 8px 8px",
  borderLeft: `4px solid ${(props.theme as any)?.palette?.warning?.main}`,
  padding: "16px 0 16px 8px",
  boxShadow: "0px 2px 4px rgba(255, 255, 0, 0.17)",
  borderRadius: "12px",
}));
