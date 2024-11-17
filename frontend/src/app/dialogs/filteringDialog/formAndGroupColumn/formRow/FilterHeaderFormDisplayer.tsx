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
import { selectFilterFormDataGrid } from "../../../../redux/selectors/imageSelector";
import { useDispatch } from "react-redux";
import { saveFilterFormcomponent } from "../../../../helper/filterFormUtils";
import { FilterFormTemplate } from "../../../../model/FilterFormTemplate";

type Props = {
  defaultFilterFormGroup: FilterFormGroups;
  filteringFormTemplate: FilterFormTemplate[];
};

const FilterHeaderFormDisplayer = ({
  defaultFilterFormGroup,
  filteringFormTemplate,
}: Props) => {
  const dispatch = useDispatch();
  const filterFormDataGrid = useSelector(selectFilterFormDataGrid);

  const [filterFormComponent, setFilterFormComponent] =
    useState<FilterFormGroups>(defaultFilterFormGroup);

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
      [FilteringFormInputKeys.SelectInputSecond]: () => null,
      /** TODO: ... */
      [FilteringFormInputKeys.TextfieldInput]: () => null,
    });
    handler[key].call(() => null);
  };

  return (
    <StyledComponentGap display={"grid"} gap={"8px"}>
      <StyledComponentGap gap={"8px"}>
        {filteringFormTemplate.map((obj, index) => 
        (obj.inputKey === FilteringFormInputKeys.SelectInput 
          || obj.inputKey === FilteringFormInputKeys.OperatorInput) &&
        (
          <StyledInputHolder key={index}>
            <StyledSelectComponent
              inputTitle={obj.inputTitle}
              options={obj.options}
              inputValue={filterFormComponent.selectInput}
              setValue={(value) => handleValueChanges(obj.inputKey, value)}
            />
          </StyledInputHolder>
        ))}
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
