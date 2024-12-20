import React, { useEffect, useState } from "react";
import { QueryMultiType, QueryTypes } from "app/model/QueryBuilderModel";
import FilteringQueryGroup from "./FilteringQueryGroup";
import FilteringMenuBody from "./FilteringMenuBody";
import { FilteringHelper } from "app/helper/filteringHelper";

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
      <FilteringMenuBody id={states.filtered.id} />
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
