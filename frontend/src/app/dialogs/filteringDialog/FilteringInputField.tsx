import React, { useEffect, useMemo, useState } from "react";
import { QueryComponent, QueryConditions } from "@model/QueryBuilderModel";
import { FilterFormTemplate } from "@model/FilterFormTemplate";
import { FilteringFormInputKeys } from "@model/enum";
import { useSelectedTabToFilterTemplate } from "@hooks/useConversionHooks";
import { StyledInputHolder } from "./FilteringMenu";
import StyledSelectComponent from "@components/StyledSelectComponent";
import StyledTextFieldComponent from "@components/StyledTextFieldComponent";
import { ConversionUtils } from "@helper/conversionUtils";
import { useSelector } from "react-redux";
import { selectListOfCreationCountry } from "@redux/selectors/creationCountrySelector";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import { FilteringHelper } from "@helper/filteringHelper";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import StyledCircularProgressOverlay from "@components/progressbar/StyledCircularProgressOverlay";

type Props = {
  component: QueryComponent;
  setComponent: (queryComponent: QueryComponent) => void;
};

const FilteringInputField = ({ component, setComponent }: Props) => {
  console.log("[FilteringInputField]:", component);

  const [queryComponent, setQueryComponent] = useState<QueryComponent>(component);
  const listOfCreationCountries = useSelector(selectListOfCreationCountry);
  const filterFormTemplate = useSelectedTabToFilterTemplate(component?.selectedFilterTab);
  const handler: GenericHandlerType<
    FilteringFormInputKeys,
    (qc: QueryComponent) => QueryComponent
  > = useMemo(
    () => ({
      [FilteringFormInputKeys.OperatorInput]: (qc: QueryComponent) => ({
        ...qc,
        errors: {
          ...qc.errors,
          operatorInput: "",
        },
      }),
      [FilteringFormInputKeys.SelectInput]: (qc: QueryComponent) => ({
        ...qc,
        errors: {
          ...qc.errors,
          selectInput: "",
        },
      }),
      [FilteringFormInputKeys.TextfieldInput]: (qc: QueryComponent) => ({
        ...qc,
        errors: {
          ...qc.errors,
          textFieldInput: "",
        },
      }),
    }),
    [],
  );

  useEffect(() => {
    let qc = component;

    if (Object.keys(qc.errors ?? {}).length !== 1) {
      setQueryComponent(qc);
      return;
    }

    filterFormTemplate.forEach((template) => (qc = handler[template.inputKey](qc)));

    setQueryComponent(qc);
    const states = FilteringHelper.getUpdatedStates<QueryComponent>(qc.id);
    const obj = FilteringHelper.handleFilterChanges(states.root, qc.id, qc);
    LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
    FilteringHelper.sendUpdateEvent(states.filtered.id);
  }, [component, filterFormTemplate, handler]);

  const handleCountrySelectionConversion = (value: string) =>
    queryComponent.selectedFilterTab === "COUNTRY" && listOfCreationCountries
      ? ConversionUtils.FormatStringToCreationCountryDto(value, listOfCreationCountries)
      : value;

  const handleCountryInputValueChange = () =>
    queryComponent.selectedFilterTab === "COUNTRY"
      ? ConversionUtils.CreationCountryToFormatString(
          listOfCreationCountries?.find(
            (country) => country.countryCode === queryComponent?.selectInput,
          ),
        )
      : (queryComponent?.selectInput ?? "");

  const handleValueChanges = (key: FilteringFormInputKeys, value: string) => {
    const handler: GenericHandlerType<FilteringFormInputKeys, QueryComponent> = {
      [FilteringFormInputKeys.SelectInput]: {
        ...queryComponent,
        selectInput: handleCountrySelectionConversion(value),
        errors: {
          ...queryComponent?.errors,
          selectInput: "",
        },
      },
      [FilteringFormInputKeys.OperatorInput]: {
        ...queryComponent,
        operatorInput: ConversionUtils.OperatorItemNamesToOperatorItems(value) as QueryConditions,
        errors: {
          ...queryComponent?.errors,
          operatorInput: "",
        },
      },
      [FilteringFormInputKeys.TextfieldInput]: {
        ...queryComponent,
        textFieldInput: value,
        errors: {
          ...queryComponent?.errors,
          textFieldInput: "",
        },
      },
    };
    setComponent(handler[key]);
  };

  const renderInputField = (template: FilterFormTemplate) => {
    const isComponentLoading = template.options === undefined;
    const inputTitle = isComponentLoading ? "" : template.inputTitle;
    const progressBarWithLabel = isComponentLoading ? (
      <div className="flex-gap">
        <StyledCircularProgressOverlay styles={{ isBackgroundHidden: true }} size={24} />
        <div style={{ color: "gray" }}>{"Loading..."}</div>
      </div>
    ) : undefined;

    switch (template.inputKey) {
      case FilteringFormInputKeys.SelectInput:
        return (
          <StyledInputHolder>
            <StyledSelectComponent
              icon={progressBarWithLabel}
              inputTitle={inputTitle}
              options={template.options ?? []}
              inputValue={handleCountryInputValueChange() ?? ""}
              setValue={(value) => handleValueChanges(FilteringFormInputKeys.SelectInput, value)}
              isDisabled={isComponentLoading}
              errorMessage={queryComponent.errors?.selectInput}
            />
          </StyledInputHolder>
        );
      case FilteringFormInputKeys.OperatorInput:
        return (
          <StyledInputHolder
            $elementWidth={
              template.inputKey === FilteringFormInputKeys.OperatorInput ? "50%" : undefined
            }
          >
            <StyledSelectComponent
              icon={progressBarWithLabel}
              inputTitle={inputTitle}
              options={template.options ?? []}
              inputValue={
                ConversionUtils.OperatorItemsToOperatorItemNames(queryComponent.operatorInput) ?? ""
              }
              setValue={(value) => handleValueChanges(FilteringFormInputKeys.OperatorInput, value)}
              isDisabled={isComponentLoading}
              errorMessage={queryComponent.errors?.operatorInput}
            />
          </StyledInputHolder>
        );
      case FilteringFormInputKeys.TextfieldInput:
        return (
          <StyledInputHolder>
            <StyledTextFieldComponent
              inputTitle={inputTitle}
              inputValue={queryComponent.textFieldInput ?? ""}
              setValue={(value) => handleValueChanges(FilteringFormInputKeys.TextfieldInput, value)}
              isDisabled={isComponentLoading}
              errorMessage={queryComponent.errors?.textFieldInput}
            />
          </StyledInputHolder>
        );
    }
  };

  return (
    <React.Fragment>
      {filterFormTemplate.map((template, index) => (
        <React.Fragment key={index}>{renderInputField(template)}</React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default FilteringInputField;
