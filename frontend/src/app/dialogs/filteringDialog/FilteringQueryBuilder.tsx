import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { QueryBuilderModel } from "@model/QueryBuilderModel";
import { FilteringHelper } from "@helper/filteringHelper";
import FilteringQueryBuilderActions from "./FilteringQueryBuilderActions";
import FilteringQueryBodyTemplate from "./FilteringQueryBodyTemplate";
import { IdUtils } from "@helper/idUtils";
import StyledAlert from "@components/StyledAlert";
import i18n from "@i18n/i18nHandler";

type Props = {
  id: number;
};

const FilteringQueryBuilder = React.memo(function FilteringQueryBuilder({ id }: Props) {
  console.log("[FilteringQueryBuilder]: RENDERED");

  const renderComponent = () => {
    const states = FilteringHelper.getUpdatedStates<QueryBuilderModel>(id);
    return (
      <React.Fragment>
        {states.filtered.listOfQueries.length > 0 ? (
          <div>
            {states.filtered.listOfQueries.length > 0 ? (
              <FilteringQueryBodyTemplate queryMultiType={states.filtered} />
            ) : null}
          </div>
        ) : (
          <StyledEmptyQueryBuilderHolder>
            <StyledAlert
              variant={"filled"}
              severity={"warning"}
              message={i18n.t("screens.filtering.query-builder.emptyQueryGroupMessage")}
              alertTitle={i18n.t("components.alert.title.warning")}
            />
          </StyledEmptyQueryBuilderHolder>
        )}
        <FilteringQueryBuilderActions id={id} states={states} />
      </React.Fragment>
    );
  };

  const [element, setElement] = useState(renderComponent());

  const updateElement = () => setElement(renderComponent());

  useEffect(() => {
    const eventName = IdUtils.getEventListenerName(
      FilteringHelper.getUpdatedStates<QueryBuilderModel>(id).filtered.id,
    );
    window.addEventListener(eventName, updateElement);
    return () => window.removeEventListener(eventName, updateElement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return <React.Fragment>{element}</React.Fragment>;
});

export default FilteringQueryBuilder;

const StyledEmptyQueryBuilderHolder = styled.div<{}>((_) => ({
  padding: "8px 8px 0px 0px",
}));
