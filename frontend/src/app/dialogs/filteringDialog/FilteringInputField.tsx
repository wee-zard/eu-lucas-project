import React from "react";
import { QueryComponent, QueryConditions } from "@model/QueryBuilderModel";
import { FilterFormTemplate } from "@model/FilterFormTemplate";
import { FilterDialogFilterOptions, FilteringFormInputKeys } from "@model/enum";
import { useSelectedTabToFilterTemplate } from "@hooks/useConversionHooks";
import { StyledInputHolder } from "./FilteringMenu";
import StyledSelectComponent from "@components/StyledSelectComponent";
import StyledTextFieldComponent from "@components/StyledTextFieldComponent";
import { ConversionUtils } from "@helper/conversionUtils";
import { useSelector } from "react-redux";
import { selectListOfCreationCountry } from "@redux/selectors/creationCountrySelector";

type Props = {
  component: QueryComponent;
  setComponent: (queryComponent: QueryComponent) => void;
};

const FilteringInputField = ({ component, setComponent }: Props) => {
  console.log("[FilteringInputField]:", component);

  const listOfCreationCountries = useSelector(selectListOfCreationCountry);

  const filterFormTemplate: FilterFormTemplate[] =
    useSelectedTabToFilterTemplate(component?.selectedFilterTab);

  const handleCountrySelectionConversion = (value: string) =>
    component.selectedFilterTab === FilterDialogFilterOptions.Country
      ? ConversionUtils.FormatStringToCreationCountryDto(
          value,
          listOfCreationCountries
        )
      : value;

  const handleCountryInputValueChange = () =>
    component.selectedFilterTab === FilterDialogFilterOptions.Country
      ? ConversionUtils.CreationCountryToFormatString(
          listOfCreationCountries.find(
            (country) => country.countryCode === component?.selectInput
          )
        )
      : (component?.selectInput ?? "");

  const handleValueChanges = (key: FilteringFormInputKeys, value: string) => {
    const handler = Object.freeze({
      [FilteringFormInputKeys.SelectInput]: () =>
        setComponent({
          ...component,
          selectInput: handleCountrySelectionConversion(value),
        }),
      [FilteringFormInputKeys.OperatorInput]: () =>
        setComponent({
          ...component,
          operatorInput: ConversionUtils.OperatorItemNamesToOperatorItems(
            value
          ) as QueryConditions,
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
              inputValue={handleCountryInputValueChange() ?? ""}
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
              inputValue={
                ConversionUtils.OperatorItemsToOperatorItemNames(
                  component.operatorInput
                ) ?? ""
              }
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
