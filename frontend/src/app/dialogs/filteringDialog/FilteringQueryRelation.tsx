import styled from "@emotion/styled";
import {
  QueryBuilderModel,
  QueryComponent,
  QueryElementRelations,
  QueryGroup,
  QueryMultiType,
} from "@model/QueryBuilderModel";
import { FilteringHelper } from "@helper/filteringHelper";
import StyledSelectComponent from "@components/StyledSelectComponent";
import { minWidthOfRelationColumn } from "./FilteringQueryBodyTemplate";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import { QueryTypes } from "@model/enum";
import i18n from "@i18n/i18nHandler";

type Props = {
  queryMultiType: QueryMultiType;
};

const FilteringQueryRelation = ({ queryMultiType }: Props) => {
  console.log("[FilteringQueryRelation]: RENDERED");

  const isListLengthBiggerThenTwo =
    queryMultiType.queryType === QueryTypes.QUERY_BUILDER
      ? (queryMultiType as QueryBuilderModel).listOfQueries.length > 2
      : (queryMultiType as QueryGroup).listOfComponents.length > 2;

  const handleFilteringChanges = (modifiedQuery: QueryComponent | QueryMultiType) => {
    const obj = FilteringHelper.handleFilterChanges(
      LocalStorageUtils.getQueryBuilderModel(),
      queryMultiType.id,
      modifiedQuery,
    );
    LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
    // Update the component itself on changes.
    FilteringHelper.sendUpdateEvent(queryMultiType.id);
  };

  const handleElementRelationSelection = (value: string) => {
    if (queryMultiType.queryType === QueryTypes.QUERY_GROUP) {
      const modifiedQueryGroup: QueryGroup = {
        ...(queryMultiType as QueryGroup),
        queryElementRelation: value as QueryElementRelations,
      };
      handleFilteringChanges(modifiedQueryGroup);
    } else {
      const modifiedQueryBuilderModel: QueryBuilderModel = {
        ...(queryMultiType as QueryBuilderModel),
        queryElementRelation: value as QueryElementRelations,
      };
      handleFilteringChanges(modifiedQueryBuilderModel);
    }
  };

  return (
    <StyledQueryRelationHolder>
      <StyledQueryRelationInputHolder>
        {isListLengthBiggerThenTwo ? <StyledTopQueryRelationHolder /> : null}
        <StyledSelectComponent
          inputTitle={i18n.t("screens.filtering.query-builder.relation")}
          options={Object.values(QueryElementRelations)}
          inputValue={queryMultiType.queryElementRelation ?? ""}
          setValue={handleElementRelationSelection}
        />
        {isListLengthBiggerThenTwo ? <StyledBottomQueryRelationHolder /> : null}
      </StyledQueryRelationInputHolder>
    </StyledQueryRelationHolder>
  );
};

export default FilteringQueryRelation;

const StyledQueryRelationHolder = styled.div<{}>((_) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  justifyContent: "center",
  height: "100%",
  minWidth: minWidthOfRelationColumn,
}));

const StyledQueryRelationInputHolder = styled.div<{}>((_) => ({
  height: "100%",
  display: "contents",
}));

const commonStyles = {
  borderColor: "3px double #616161",
  borderRadius: "16px",
};

const StyledRootQueryRelationHolder = styled.div<{}>((_) => ({
  display: "flex",
  height: "100%",
  justifyContent: "center",
  marginLeft: "50%",
  borderLeft: commonStyles.borderColor,
}));

const StyledTopQueryRelationHolder = styled(StyledRootQueryRelationHolder)<{}>((_) => ({
  borderTop: commonStyles.borderColor,
  borderTopLeftRadius: commonStyles.borderRadius,
}));

const StyledBottomQueryRelationHolder = styled(StyledRootQueryRelationHolder)<{}>((_) => ({
  borderBottom: commonStyles.borderColor,
  borderBottomLeftRadius: commonStyles.borderRadius,
}));
