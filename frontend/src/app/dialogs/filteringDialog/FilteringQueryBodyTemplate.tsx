import React from "react";
import styled from "@emotion/styled";
import { StyledComponentGap } from "@global/globalStyles";
import {
  QueryBuilderModel,
  QueryComponent,
  QueryGroup,
  QueryMultiType,
} from "@model/QueryBuilderModel";
import FilteringQueryComponent from "./FilteringQueryComponent";
import FilteringQueryRelation from "./FilteringQueryRelation";
import FilteringQueryMultiType from "./FilteringQueryMultiType";
import { ArrayUtils } from "@helper/arrayUtils";
import { QueryTypes } from "@model/enum";

type Props = {
  queryMultiType: QueryMultiType;
};

const FilteringQueryBodyTemplate = ({ queryMultiType }: Props) => {
  console.log("[FilteringQueryBodyTemplate]: RENDERED");

  const getFilteringComponent = (id: number) =>
    queryMultiType.queryType === QueryTypes.QUERY_BUILDER ? (
      <FilteringQueryMultiType id={id} />
    ) : (
      <FilteringQueryComponent id={id} />
    );

  const getListOfElements =
    queryMultiType.queryType === QueryTypes.QUERY_BUILDER
      ? (queryMultiType as QueryBuilderModel).listOfQueries
      : (queryMultiType as QueryGroup).listOfComponents;

  return (
    <StyledQueryHolder>
      <StyledComponentGridGap>
        <StyledCustomComponentGap>
          <StyledMinWidthComponent>WHERE</StyledMinWidthComponent>
          <StyledMaxWidthComponentHolder key={getListOfElements[0].id}>
            {getFilteringComponent(getListOfElements[0].id)}
          </StyledMaxWidthComponentHolder>
        </StyledCustomComponentGap>

        {getListOfElements.length > 1 ? (
          <StyledCustomComponentGap>
            <FilteringQueryRelation queryMultiType={queryMultiType} />
            <StyledComponentGridGap $isWidthFull>
              {ArrayUtils.getListWithoutFirstElement<
                QueryMultiType | QueryComponent
              >(getListOfElements).map((element) => (
                <div key={element.id}>{getFilteringComponent(element.id)}</div>
              ))}
            </StyledComponentGridGap>
          </StyledCustomComponentGap>
        ) : null}
      </StyledComponentGridGap>
    </StyledQueryHolder>
  );
};

export default FilteringQueryBodyTemplate;

export const minWidthOfRelationColumn = "100px";

const StyledMinWidthComponent = styled.div<{}>((props) => ({
  minWidth: minWidthOfRelationColumn,
  display: "flex",
  justifyContent: "center",
}));

export const StyledQueryHolder = styled.div<{}>((props) => ({
  width: "100%",
  display: "grid",
  gap: "16px",
}));

const StyledComponentGridGap = styled.div<{ $isWidthFull?: boolean }>(
  (props) => ({
    display: "grid",
    gap: "8px",
    width: props.$isWidthFull ? "100%" : undefined,
  })
);

const StyledCustomComponentGap = styled(StyledComponentGap)<{}>((props) => ({
  alignItems: "center",
}));

const StyledMaxWidthComponentHolder = styled.div<{}>((props) => ({
  width: "100%",
}));
