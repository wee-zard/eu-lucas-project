import {
  initFirstQueryParent,
  initQueryBuilderObj,
  initQueryGroupObj,
  QueryBuilderModel,
  QueryMultiType,
} from "@model/QueryBuilderModel";
import StyledButton from "@components/StyledButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { StyledComponentGap } from "@global/globalStyles";
import { FilteringHelper, StateUpdateProps } from "@helper/filteringHelper";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import styled from "@emotion/styled";

type Props = {
  id: number;
  states: StateUpdateProps<QueryBuilderModel>;
};

const FilteringQueryBuilderActions = ({ id, states }: Props) => {
  console.log("[FilteringQueryBuilderActions]: RENDERED");

  /**
   * Adding a new {@link QueryBuilderModel} to the TREE.
   * Only add a new group to the list, of one element is already
   * exists in the actual branch.
   */
  const handleClickOnAddGroup = () => {
    const localStates = FilteringHelper.getUpdatedStates<QueryBuilderModel>(id);
    const modifiedQueryMultiTypes: QueryMultiType[] = [
      ...localStates.filtered.listOfQueries,
      initQueryBuilderObj(localStates.filtered.id),
    ];
    const modifiedQueryBuilderModel = FilteringHelper.modifyQueryBuilderModel(
      modifiedQueryMultiTypes,
      localStates.filtered,
    );
    const obj = FilteringHelper.handleFilterChanges(
      localStates.root,
      localStates.filtered.id,
      modifiedQueryBuilderModel,
    );
    LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
    FilteringHelper.sendUpdateEvent(localStates.filtered.id);
  };

  const handleClickOnAddCondition = () => {
    const localStates = FilteringHelper.getUpdatedStates<QueryBuilderModel>(id);
    const modifiedQueryMultiTypes: QueryMultiType[] = [
      ...localStates.filtered.listOfQueries,
      initQueryGroupObj(localStates.filtered.id),
    ];
    const modifiedQueryBuilderModel = FilteringHelper.modifyQueryBuilderModel(
      modifiedQueryMultiTypes,
      localStates.filtered,
    );
    const obj = FilteringHelper.handleFilterChanges(
      localStates.root,
      localStates.filtered.id,
      modifiedQueryBuilderModel,
    );
    LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
    FilteringHelper.sendUpdateEvent(localStates.filtered.id);
  };

  const handleClickOnRemoveGroup = () => {
    const localStates = FilteringHelper.getUpdatedStates<QueryMultiType>(states.filtered.id);
    const obj = FilteringHelper.handleFilterChanges(localStates.root, states.filtered.id);
    LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
    FilteringHelper.sendUpdateEvent(states.filtered.parentId);
  };

  return (
    <StyledActionsHolder>
      <StyledComponentGap gap={"8px"}>
        <StyledButton
          buttonIcon={<AddCircleOutlineIcon />}
          buttonText="Add condition"
          onClick={handleClickOnAddCondition}
        />
        {states.filtered.listOfQueries.length > 0 ? (
          <StyledButton
            buttonIcon={<AddCircleOutlineIcon />}
            buttonText="Add group"
            onClick={handleClickOnAddGroup}
          />
        ) : null}
      </StyledComponentGap>
      {states.filtered.parentId !== initFirstQueryParent ? (
        <StyledButton
          buttonIcon={<DeleteForeverOutlinedIcon />}
          buttonText="Remove group"
          onClick={handleClickOnRemoveGroup}
        />
      ) : null}
    </StyledActionsHolder>
  );
};

export default FilteringQueryBuilderActions;

const StyledActionsHolder = styled.div<{}>((_) => ({
  display: "flex",
  justifyContent: "space-between",
}));
