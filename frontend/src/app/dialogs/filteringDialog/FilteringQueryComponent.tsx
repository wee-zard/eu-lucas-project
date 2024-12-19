import StyledIconButton from "app/components/StyledIconButton";
import React from "react";
import StyledSelectComponent from "app/components/StyledSelectComponent";
import { FilterDialogFilterOptions } from "app/model/enum";
import { getNewIdToElement, QueryComponent, QueryGroup } from "app/model/QueryBuilderModel";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import FilteringInputField from "./FilteringInputField";
import { StyledInputHolder } from "./FilteringMenu";
import styled from "@emotion/styled";
import { StyledComponentGap } from "app/global/globalStyles";
import { useSelector } from "react-redux";
import { selectQueryBranch } from "app/redux/selectors/imageSelector";
import { RootState } from "app/redux/store";

type Props = {
  id: number;
  callback: (queryComponent?: QueryComponent) => void;
};

const FilteringQueryComponent = React.memo(function FilteringQueryComponent({
  id,
  callback,
}: Props) {
  console.log("[FilteringQueryComponent]: rendered");
  const queryComponent = useSelector((state) => selectQueryBranch(state as RootState, id)) as QueryComponent;

  /**
   * TODO: The input fields will be implemented here!
   * There should be an option the delete the whole "queryComponent".
   *
   * First, check if the selectedFilterTab has any value.
   * - if yes, then display the corresponding input fields with their values.
   * - else display only the select input field.
   */
  return (
    <StyledQueryComponentHolder>
      <StyledInputHolder>
        <StyledSelectComponent
          inputTitle={"Query By"}
          options={Object.values(FilterDialogFilterOptions)}
          inputValue={queryComponent.selectedFilterTab ?? ""}
          setValue={(selectedFilter) => {
            /**
             * New Filter tab have been selected, and because of that,
             * we need to wipe out every information related to the current
             * query component. This way, null or empty values will be assigned to the input fields.
             */

            const modifiedQueryComponent: QueryComponent = {
              id: getNewIdToElement(),
              selectedFilterTab: selectedFilter as FilterDialogFilterOptions,
            };
            /**
             * Push the new changes to the renderer.
             * This will force React to re-render the whole page,
             * while displaying a new component in the corresponding group.
             */
            callback(modifiedQueryComponent);
          }}
        />
      </StyledInputHolder>
      {queryComponent.selectedFilterTab ? (
        <FilteringInputField
          component={queryComponent}
          setComponent={callback}
        />
      ) : null}
      <StyledIconButton
        buttonIcon={<DeleteForeverOutlinedIcon />}
        tooltip={{
          tooltipTitle: "Remove Filter Condition",
          tooltipPlacement: "right-start",
        }}
        onClick={() => callback()}
      />
    </StyledQueryComponentHolder>
  );
});

export default FilteringQueryComponent;

const StyledQueryComponentHolder = styled(StyledComponentGap)<{}>((props)=>({
  justifyContent: "space-between",
}));
