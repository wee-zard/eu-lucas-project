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
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";

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
        <StyledTransitionGroup unmountOnExit>
          <Collapse>
            <StyledCustomComponentGap>
              <StyledMinWidthComponent>WHERE</StyledMinWidthComponent>
              <StyledMaxWidthComponentHolder key={getListOfElements[0].id}>
                {getFilteringComponent(getListOfElements[0].id)}
              </StyledMaxWidthComponentHolder>
            </StyledCustomComponentGap>
          </Collapse>

          {getListOfElements.length > 1 ? (
            <Collapse>
              <StyledCustomComponentGap>
                <FilteringQueryRelation queryMultiType={queryMultiType} />
                <StyledComponentGridGap $isWidthFull>
                  <StyledTransitionGroup unmountOnExit>
                    {ArrayUtils.getListWithoutFirstElement<QueryMultiType | QueryComponent>(
                      getListOfElements,
                    ).map((element) => (
                      <Collapse key={element.id}>{getFilteringComponent(element.id)}</Collapse>
                    ))}
                  </StyledTransitionGroup>
                </StyledComponentGridGap>
              </StyledCustomComponentGap>
            </Collapse>
          ) : null}
        </StyledTransitionGroup>
      </StyledComponentGridGap>
    </StyledQueryHolder>
  );
};

export default FilteringQueryBodyTemplate;

export const minWidthOfRelationColumn = "100px";

const StyledTransitionGroup = styled(TransitionGroup)<{}>((_) => ({
  display: "grid",
  gap: "8px",
}));

const StyledMinWidthComponent = styled.div<{}>((_) => ({
  minWidth: minWidthOfRelationColumn,
  display: "flex",
  justifyContent: "center",
}));

export const StyledQueryHolder = styled.div<{}>((_) => ({
  width: "100%",
  display: "grid",
  gap: "16px",
}));

const StyledComponentGridGap = styled.div<{ $isWidthFull?: boolean }>((props) => ({
  display: "grid",
  gap: "8px",
  width: props.$isWidthFull ? "100%" : undefined,
}));

const StyledCustomComponentGap = styled(StyledComponentGap)<{}>((_) => ({
  alignItems: "center",
  height: "100%",
}));

const StyledMaxWidthComponentHolder = styled.div<{}>((_) => ({
  width: "100%",
}));
