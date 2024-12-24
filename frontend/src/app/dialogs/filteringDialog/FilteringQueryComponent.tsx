import StyledIconButton from "@components/StyledIconButton";
import React, { useEffect, useState } from "react";
import StyledSelectComponent from "@components/StyledSelectComponent";
import {
  FilterDialogFilterOptionNames,
  FilterDialogFilterOptions,
} from "@model/enum";
import { QueryComponent } from "@model/QueryBuilderModel";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import FilteringInputField from "./FilteringInputField";
import { StyledInputHolder } from "./FilteringMenu";
import styled from "@emotion/styled";
import { StyledComponentGap } from "@global/globalStyles";
import { FilteringHelper } from "@helper/filteringHelper";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import { ConversionUtils } from "@helper/conversionUtils";

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
    LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
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
      id: states.filtered.id,
      parentId: states.filtered.parentId,
      selectedFilterTab: selectedFilter as FilterDialogFilterOptions,
    };
    const obj = FilteringHelper.handleFilterChanges(
      states.root,
      id,
      modifiedQueryComponent
    );
    LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
    // Update the component itself on changes.
    FilteringHelper.sendUpdateEvent(states.filtered.id);
  };

  const handleComponentRemoval = () => {
    const states = FilteringHelper.getUpdatedStates<QueryComponent>(id);
    const obj = FilteringHelper.handleFilterChanges(states.root, id);
    LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
    // Update the parent component itself on component deletion.
    FilteringHelper.sendUpdateEvent(states.filtered.parentId);
  };

  /**
   * First, check if the selectedFilterTab has any value.
   * - if yes, then display the corresponding input fields with their values.
   * - else display only the select input field.
   */
  const renderComponent = () => {
    const states = FilteringHelper.getUpdatedStates<QueryComponent>(id);
    return (
      <StyledQueryComponentHolder>
        <StyledInputHolder>
          <StyledSelectComponent
            inputTitle={"Query By"}
            options={Object.values(FilterDialogFilterOptionNames)}
            inputValue={
              ConversionUtils.FilterOptionsToFilterOptionNames(
                states.filtered?.selectedFilterTab
              ) ?? ""
            }
            setValue={(item) =>
              handleComponentSelection(
                ConversionUtils.FilterOptionNamesToFilterOptions(
                  item as FilterDialogFilterOptionNames
                )
              )
            }
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
  paddingRight: "8px",
  justifyContent: "space-between",
}));
