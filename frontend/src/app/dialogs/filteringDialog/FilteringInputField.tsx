import React from "react";
import { QueryComponent } from "@model/QueryBuilderModel";
import { FilterFormTemplate } from "@model/FilterFormTemplate";
import { FilteringFormInputKeys } from "@model/enum";
import { useSelectedTabToFilterTemplate } from "@hooks/useConversionHooks";
import { StyledInputHolder } from "./FilteringMenu";
import StyledSelectComponent from "@components/StyledSelectComponent";
import StyledTextFieldComponent from "@components/StyledTextFieldComponent";
import { OperatorItems } from "@model/FilterFormComponents";

type Props = {
  component: QueryComponent;
  setComponent: (queryComponent: QueryComponent) => void;
};

const FilteringInputField = ({ component, setComponent }: Props) => {
  console.log("[FilteringInputField]:", component);

  const filterFormTemplate: FilterFormTemplate[] =
    useSelectedTabToFilterTemplate(component?.selectedFilterTab);

  const handleValueChanges = (key: FilteringFormInputKeys, value: string) => {
    const handler = Object.freeze({
      [FilteringFormInputKeys.SelectInput]: () =>
        setComponent({
          ...component,
          selectInput: value,
        }),
      [FilteringFormInputKeys.OperatorInput]: () =>
        setComponent({
          ...component,
          operatorInput: value as OperatorItems,
        }),
      [FilteringFormInputKeys.TextfieldInput]: () =>
        setComponent({
          ...component,
          textFieldInput: value,
        }),
    });
    handler[key].call(() => null);
  };

  const renderInputField = (template: FilterFormTemplate) => {
    switch (template.inputKey) {
      case FilteringFormInputKeys.SelectInput:
        return (
          <StyledInputHolder>
            <StyledSelectComponent
              inputTitle={template.inputTitle}
              options={template.options ?? []}
              inputValue={component.selectInput ?? ""}
              setValue={(value) =>
                handleValueChanges(FilteringFormInputKeys.SelectInput, value)
              }
            />
          </StyledInputHolder>
        );
      case FilteringFormInputKeys.OperatorInput:
        return (
          <StyledInputHolder
            $elementWidth={
              template.inputKey === FilteringFormInputKeys.OperatorInput
                ? "50%"
                : undefined
            }
          >
            <StyledSelectComponent
              inputTitle={template.inputTitle}
              options={template.options ?? []}
              inputValue={component.operatorInput ?? ""}
              setValue={(value) =>
                handleValueChanges(FilteringFormInputKeys.OperatorInput, value)
              }
            />
          </StyledInputHolder>
        );
      case FilteringFormInputKeys.TextfieldInput:
        return (
          <StyledInputHolder>
            <StyledTextFieldComponent
              inputTitle={template.inputTitle}
              inputValue={component.textFieldInput ?? ""}
              setValue={(value) =>
                handleValueChanges(FilteringFormInputKeys.TextfieldInput, value)
              }
            />
          </StyledInputHolder>
        );
    }
  };

  return (
    <React.Fragment>
      {filterFormTemplate.map((template, index) => (
        <React.Fragment key={index}>
          {renderInputField(template)}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default FilteringInputField;
