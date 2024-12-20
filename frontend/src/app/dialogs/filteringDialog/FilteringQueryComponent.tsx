import StyledIconButton from "app/components/StyledIconButton";
import React, { useEffect, useState } from "react";
import StyledSelectComponent from "app/components/StyledSelectComponent";
import { FilterDialogFilterOptions } from "app/model/enum";
import { QueryComponent } from "app/model/QueryBuilderModel";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import FilteringInputField from "./FilteringInputField";
import {
  setQueryBuilderModelLocalStorage,
  StyledInputHolder,
} from "./FilteringMenu";
import styled from "@emotion/styled";
import { StyledComponentGap } from "app/global/globalStyles";
import { FilteringHelper } from "app/helper/filteringHelper";

type Props = {
  id: number;
};

const FilteringQueryComponent = React.memo(function FilteringQueryComponent({
  id,
}: Props) {
  console.log("[FilteringQueryComponent]: rendered");

  const handleComponentChange = (changedComponent: QueryComponent) => {
    const states = FilteringHelper.getUpdatedStates<QueryComponent>(id);
    const obj = FilteringHelper.handleFilterChanges(
      states.root,
      id,
      changedComponent
    );
    setQueryBuilderModelLocalStorage(obj);
    // Update the component itself on changes.
    FilteringHelper.sendUpdateEvent(states.filtered.id);
  };

  /**
   * New Filter tab have been selected, and because of that,
   * we need to wipe out every information related to the current
   * query component. This way, null or empty values will be assigned to the input fields.
   */
  const handleComponentSelection = (selectedFilter: string) => {
    const states = FilteringHelper.getUpdatedStates<QueryComponent>(id);
    const modifiedQueryComponent: QueryComponent = {
      ...states.filtered,
      selectedFilterTab: selectedFilter as FilterDialogFilterOptions,
    };
    console.log(
      "handleComponentSelection",
      modifiedQueryComponent,
      states.filtered,
      id
    );
    const obj = FilteringHelper.handleFilterChanges(
      states.root,
      id,
      modifiedQueryComponent
    );
    setQueryBuilderModelLocalStorage(obj);
    // Update the component itself on changes.
    FilteringHelper.sendUpdateEvent(states.filtered.id);
  };

  const handleComponentRemoval = () => {
    const states = FilteringHelper.getUpdatedStates<QueryComponent>(id);
    const obj = FilteringHelper.handleFilterChanges(states.root, id);
    setQueryBuilderModelLocalStorage(obj);
    // Update the parent component itself on component deletion.
    FilteringHelper.sendUpdateEvent(states.filtered.parentId);
  };

  /**
   * TODO: The input fields will be implemented here!
   * There should be an option the delete the whole "queryComponent".
   *
   * First, check if the selectedFilterTab has any value.
   * - if yes, then display the corresponding input fields with their values.
   * - else display only the select input field.
   */
  const renderComponent = () => {
    const states = FilteringHelper.getUpdatedStates<QueryComponent>(id);
    console.log("[FilteringQueryComponent]:", states, id);
    return (
      <StyledQueryComponentHolder>
        <StyledInputHolder>
          <StyledSelectComponent
            inputTitle={"Query By"}
            options={Object.values(FilterDialogFilterOptions)}
            inputValue={states.filtered?.selectedFilterTab ?? ""}
            setValue={handleComponentSelection}
          />
        </StyledInputHolder>
        {states.filtered?.selectedFilterTab ? (
          <FilteringInputField
            component={states.filtered}
            setComponent={handleComponentChange}
          />
        ) : null}
        <StyledIconButton
          buttonIcon={<DeleteForeverOutlinedIcon />}
          tooltip={{
            tooltipTitle: "Remove Filter Condition",
            tooltipPlacement: "right-start",
          }}
          onClick={handleComponentRemoval}
        />
      </StyledQueryComponentHolder>
    );
  };

  const [element, setElement] = useState(renderComponent());
  const updateElement = () => setElement(renderComponent());

  useEffect(() => {
    const states = FilteringHelper.getUpdatedStates<QueryComponent>(id);
    const eventName = FilteringHelper.getEventListenerName(states.filtered.id);
    window.addEventListener(eventName, updateElement);
    return () => window.removeEventListener(eventName, updateElement);
  }, []);

  return <React.Fragment>{element}</React.Fragment>;
});

export default FilteringQueryComponent;

const StyledQueryComponentHolder = styled(StyledComponentGap)<{}>((props) => ({
  justifyContent: "space-between",
}));
