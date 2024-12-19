import React from "react";
import styled from "@emotion/styled";
import {
  getNewIdToElement,
  initQueryBuilderObj,
  QueryBuilderModel,
  QueryElementRelations,
  QueryGroup,
  QueryMultiType,
  QueryTypes,
} from "app/model/QueryBuilderModel";
import StyledButton from "app/components/StyledButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilteringQueryMultiType from "./FilteringQueryMultiType";
import { StyledComponentGap } from "app/global/globalStyles";

type Props = {
  queryBuilderModel: QueryBuilderModel;
  callback: (modifiedQueryBuilderModel: QueryBuilderModel) => void;
};

const FilteringMenuBody = ({ queryBuilderModel, callback }: Props) => {
  console.log("[FilteringMenuBody]: RENDERED");

  // FIXED (and minimized!)
  const handleSliceOutOldBranchReplaceWithNewOne = (
    queryBuilderModel: QueryBuilderModel,
    index: number,
    modifiedMultiType?: QueryMultiType
  ): QueryBuilderModel => {
    const newQueryBuilderModel: QueryBuilderModel = {
      ...queryBuilderModel,
      queryMultiTypes: modifiedMultiType
        ? queryBuilderModel.queryMultiTypes.map((multiType) =>
            multiType.id === index ? modifiedMultiType : multiType
          )
        : queryBuilderModel.queryMultiTypes.filter(
            (multiType) => multiType.id !== index
          ),
    };
    return modifyQueryBuilderModel(
      newQueryBuilderModel.queryMultiTypes,
      newQueryBuilderModel
    );
  };

  // FIXED (and minimized!)
  const modifyQueryBuilderModel = (
    modifiedQueryMultiTypes: QueryMultiType[],
    queryBuilderModel: QueryBuilderModel
  ): QueryBuilderModel => ({
    id: queryBuilderModel.id,
    queryType: queryBuilderModel.queryType,
    queryMultiTypes: modifiedQueryMultiTypes,
    queryElementRelation:
      !queryBuilderModel.queryElementRelation &&
      modifiedQueryMultiTypes.length === 2
        ? QueryElementRelations.And
        : queryBuilderModel.queryElementRelation,
  });

  const handleClickOnAddGroup = () => {
    /**
     * Adding a new {@link QueryBuilderModel} to the TREE.
     */
    const modifiedQueryMultiTypes: QueryMultiType[] = [
      ...queryBuilderModel.queryMultiTypes,
      initQueryBuilderObj(),
    ];
    /**
     * Force the React to render the new hierarchy of the Query Builder Tree.
     */
    callback(
      modifyQueryBuilderModel(
        modifiedQueryMultiTypes,
        queryBuilderModel
      )
    );
  }

  const handleClickOnAddCondition = () => {
    /**
     * Adding a new {@link QueryGroup} to the TREE.
     */
    const newQueryGroup: QueryGroup = {
      id: getNewIdToElement(),
      queryType: QueryTypes.QUERY_GROUP,
      queryComponents: [{ id: getNewIdToElement() + 1 }],
    };
    const modifiedQueryMultiTypes: QueryMultiType[] = [
      ...queryBuilderModel.queryMultiTypes,
      newQueryGroup,
    ];
    /**
     * Force the React to render the new hierarchy of the Query Builder Tree.
     */
    callback(
      modifyQueryBuilderModel(
        modifiedQueryMultiTypes,
        queryBuilderModel
      )
    );
  }

  return (
    <StyledQueryBuilderHolder>
      {queryBuilderModel.queryMultiTypes.length > 0 ? (
        queryBuilderModel.queryMultiTypes.map((multiType: QueryMultiType) => (
          <div key={multiType.id}>
            <FilteringQueryMultiType
              multiType={multiType}
              callback={(modifiedMultiType) =>
                callback(
                  handleSliceOutOldBranchReplaceWithNewOne(
                    queryBuilderModel,
                    multiType.id,
                    modifiedMultiType
                  )
                )
              }
            />
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
        {queryBuilderModel.queryMultiTypes.length > 0 ? (
          /**
           * Only add a new group to the list, of one element is already
           * exists in the actual branch.
           */
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
