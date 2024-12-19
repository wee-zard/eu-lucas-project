import React from "react";
import styled from "@emotion/styled";
import {
  getNewIdToElement,
  initQueryBuilderObj,
  QueryBuilderModel,
  QueryGroup,
  QueryMultiType,
  QueryTypes,
} from "app/model/QueryBuilderModel";
import StyledButton from "app/components/StyledButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilteringQueryMultiType from "./FilteringQueryMultiType";
import { StyledComponentGap } from "app/global/globalStyles";
import { FilteringHelper } from "app/helper/filteringHelper";
import { useSelector } from "react-redux";
import { selectQueryBranch } from "app/redux/selectors/imageSelector";
import { RootState } from "app/redux/store";

type Props = {
  id: number;
  callback: (modifiedQueryBuilderModel: QueryBuilderModel) => void;
};

const FilteringMenuBody = ({ id, callback }: Props) => {
  console.log("[FilteringMenuBody]: RENDERED");

  const queryBuilderModel = useSelector((state) => selectQueryBranch(state as RootState, id)) as QueryBuilderModel;

  /**
   * Adding a new {@link QueryBuilderModel} to the TREE.
   * Only add a new group to the list, of one element is already
   * exists in the actual branch.
   */
  const handleClickOnAddGroup = () => {
    const modifiedQueryMultiTypes: QueryMultiType[] = [
      ...queryBuilderModel.queryMultiTypes,
      initQueryBuilderObj(),
    ];
    callback(
      FilteringHelper.modifyQueryBuilderModel(
        modifiedQueryMultiTypes,
        queryBuilderModel
      )
    );
  };

  /**
   * Adding a new {@link QueryGroup} to the TREE.
   */
  const handleClickOnAddCondition = () => {
    const newQueryGroup: QueryGroup = {
      id: getNewIdToElement(),
      queryType: QueryTypes.QUERY_GROUP,
      queryComponents: [{ id: getNewIdToElement() + 1 }],
    };
    const modifiedQueryMultiTypes: QueryMultiType[] = [
      ...queryBuilderModel.queryMultiTypes,
      newQueryGroup,
    ];
    callback(
      FilteringHelper.modifyQueryBuilderModel(
        modifiedQueryMultiTypes,
        queryBuilderModel
      )
    );
  };

  return (
    <StyledQueryBuilderHolder>
      {queryBuilderModel.queryMultiTypes.length > 0 ? (
        queryBuilderModel.queryMultiTypes.map((multiType: QueryMultiType) => (
          <div key={multiType.id}>
            <FilteringQueryMultiType
              id={multiType.id}
              callback={(modifiedMultiType) =>
                callback(
                  FilteringHelper.handleSliceOutOldBranchReplaceWithNewOne(
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
