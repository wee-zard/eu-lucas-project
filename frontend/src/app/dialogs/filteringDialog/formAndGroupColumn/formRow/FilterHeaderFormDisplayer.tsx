import React, { useState } from "react";
import StyledButton from "../../../../components/StyledButton";
import {
  FilterDialogFilterOptions,
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
import {
  selectFilterFormDataGrid,
  selectSelectedFilterTab,
} from "../../../../redux/selectors/imageSelector";
import { useDispatch } from "react-redux";
import { saveFilterFormcomponent } from "../../../../helper/filterFormUtils";
import { FilterFormTemplate } from "../../../../model/FilterFormTemplate";
import StyledTextFieldComponent from "../../../../components/StyledTextFieldComponent";
import { NotificationSeverity, throwNotification } from "../../../../helper/notificationUtil";

type Props = {
  filteringFormTemplate: FilterFormTemplate[];
};

const FilterHeaderFormDisplayer = ({ filteringFormTemplate }: Props) => {
  const dispatch = useDispatch();
  const filterFormDataGrid = useSelector(selectFilterFormDataGrid);
  const selectedFilterTab = useSelector(selectSelectedFilterTab);
  const defaultFilterFormGroup: FilterFormGroups = {selectedFilterTab: selectedFilterTab};
  const [filterFormComponent, setFilterFormComponent] = useState<FilterFormGroups>(defaultFilterFormGroup);
  const isSaveButtonDisabled = !(filteringFormTemplate.length === Object.keys(filterFormComponent).length - 1);

  const handleOnSubmit = () => {
    if (!isSaveButtonDisabled) {
      saveFilterFormcomponent(filterFormComponent, filterFormDataGrid, dispatch);
      setFilterFormComponent(defaultFilterFormGroup);
    } else {
      throwNotification(NotificationSeverity.Warning, "Figyelmeztetés! Csak akkor mentheted el az űrlapot, ha minden elemet kitöltöttél.")
    }
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
      [FilteringFormInputKeys.TextfieldInput]: () => 
        setFilterFormComponent({
          ...filterFormComponent,
          textFieldInput: value,
        }),
    });
    handler[key].call(() => null);
  };

  const renderStyledInput = (inputKey: FilteringFormInputKeys) => {
    const obj = filteringFormTemplate.find(
      (form) => form.inputKey === inputKey
    );
    const formInputValue = Object.entries(filterFormComponent)
      .find((pair) => pair[0] === obj?.inputKey)?.[1]
      ?.toString();
    if (obj) {
      switch (inputKey) {
        case FilteringFormInputKeys.SelectInput:
        case FilteringFormInputKeys.OperatorInput:
          return (
            <StyledInputHolder>
              <StyledSelectComponent
                inputTitle={obj.inputTitle}
                options={obj.options ?? []}
                inputValue={formInputValue ?? ""}
                setValue={(value) => handleValueChanges(obj.inputKey, value)}
              />
            </StyledInputHolder>
          );
        case FilteringFormInputKeys.TextfieldInput:
          return (
            <StyledInputHolder>
              <StyledTextFieldComponent
                inputTitle={obj.inputTitle}
                inputValue={formInputValue ?? ""}
                setValue={(value) => handleValueChanges(obj.inputKey, value)}
              />
            </StyledInputHolder>
          );
      }
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <StyledComponentGap display={"grid"} gap={"8px"}>
        <StyledComponentGap gap={"8px"}>
          {renderStyledInput(FilteringFormInputKeys.SelectInput)}
          {renderStyledInput(FilteringFormInputKeys.OperatorInput)}
        </StyledComponentGap>
        {selectedFilterTab === FilterDialogFilterOptions.ExifData ? (
          <StyledComponentGap gap={"8px"}>
            {renderStyledInput(FilteringFormInputKeys.TextfieldInput)}
          </StyledComponentGap>
        ) : null}
        <StyledButtonHolder>
          <StyledButton
            isDisabled={isSaveButtonDisabled}
            buttonText={FilteringDialogTexts.AgreeButtonText}
            buttonColor="success"
            buttonVariant="outlined"
            onClick={() => null}
          />
        </StyledButtonHolder>
      </StyledComponentGap>
    </form>
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
