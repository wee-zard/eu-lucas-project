import React, { useState } from "react";
import StyledButton from "../../../../components/StyledButton";
import {
  FilteringDialogTexts,
  FilteringFormInputKeys,
} from "../../../../model/enum";
import StyledSelectComponent from "../../../../components/StyledSelectComponent";
import styled from "@emotion/styled";
import { StyledComponentGap } from "../../../../global/globalStyles";
import {
  FilterFormGroups,
  OperatorItems,
} from "../../../../model/FilterFormComponents";
import { useSelector } from "react-redux";
import { selectFilterFormDataGrid, selectSelectedFilterTab } from "../../../../redux/selectors/imageSelector";
import { useDispatch } from "react-redux";
import { saveFilterFormcomponent } from "../../../../helper/filterFormUtils";
import { FilterFormTemplate } from "../../../../model/FilterFormTemplate";

type Props = {
  filteringFormTemplate: FilterFormTemplate[];
};

const FilterHeaderFormDisplayer = ({
  filteringFormTemplate,
}: Props) => {
  const dispatch = useDispatch();
  const filterFormDataGrid = useSelector(selectFilterFormDataGrid);
  const selectedFilterTab = useSelector(selectSelectedFilterTab);
  const defaultFilterFormGroup: FilterFormGroups = {
    selectedFilterTab: selectedFilterTab,
  };

  const [filterFormComponent, setFilterFormComponent] = useState<FilterFormGroups>(defaultFilterFormGroup);

  const handleOnSubmit = () => {
    saveFilterFormcomponent(filterFormComponent, filterFormDataGrid, dispatch);
    setFilterFormComponent(defaultFilterFormGroup);
  };

  const handleValueChanges = (key: FilteringFormInputKeys, value: string) => {
    const handler = Object.freeze({
      [FilteringFormInputKeys.SelectInput]: () =>
        setFilterFormComponent({
          ...filterFormComponent,
          selectInput: value,
        }),
      [FilteringFormInputKeys.OperatorInput]: () =>
        setFilterFormComponent({
          ...filterFormComponent,
          operatorInput: value as OperatorItems,
        }),
      /** TODO: ... */
      [FilteringFormInputKeys.TextfieldInput]: () => null,
    });
    handler[key].call(() => null);
  };

  const renderStyledInput = (inputKey: FilteringFormInputKeys) => {
    const obj = filteringFormTemplate.find(
      (form) => form.inputKey === inputKey
    );
    const formInputValue = Object.entries(filterFormComponent).find(
      (pair) => pair[0] === obj?.inputKey
    )?.[1]?.toString();
    return obj ? (
      <StyledInputHolder>
        <StyledSelectComponent
          inputTitle={obj.inputTitle}
          options={obj.options}
          inputValue={formInputValue ?? ""}
          setValue={(value) => handleValueChanges(obj.inputKey, value)}
        />
      </StyledInputHolder>
    ) : null;
  };

  return (
    <StyledComponentGap display={"grid"} gap={"8px"}>
      <StyledComponentGap gap={"8px"}>
        {renderStyledInput(FilteringFormInputKeys.SelectInput)}
        {renderStyledInput(FilteringFormInputKeys.OperatorInput)}
      </StyledComponentGap>
      <StyledButtonHolder>
        <StyledButton
          buttonText={FilteringDialogTexts.AgreeButtonText}
          buttonColor="success"
          buttonVariant="outlined"
          onClick={handleOnSubmit}
        />
      </StyledButtonHolder>
    </StyledComponentGap>
  );
};

export default FilterHeaderFormDisplayer;

const StyledInputHolder = styled.div<{}>((props) => ({
  width: "100%",
  minWidth: "40%",
}));

const StyledButtonHolder = styled.div<{}>((props) => ({
  display: "flex",
  justifyContent: "flex-end",
}));
