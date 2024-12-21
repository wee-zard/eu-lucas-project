import React from "react";
import { QueryComponent } from "app/model/QueryBuilderModel";
import {
  useCoordinateXStorageInit,
  useCoordinateYStorageInit,
  useCreationCountryStorageInit,
  useCreationDirectionStorageInit,
  useCreationYearStorageInit,
  useExifKeyStorageInit,
} from "app/hooks/useStorageInit";
import { FilterFormTemplate } from "app/model/FilterFormTemplate";
import {
  FilterDialogFilterOptions,
  FilteringFormInputKeys,
} from "app/model/enum";
import {
  operatorComparableItems,
  operatorSelectItems,
  operatorTextfieldItems,
} from "app/helper/filterFormUtils";
import { useSelectedTabToFilterTemplate } from "app/hooks/useConversionHooks";
import { StyledInputHolder } from "./FilteringMenu";
import StyledSelectComponent from "app/components/StyledSelectComponent";
import StyledTextFieldComponent from "app/components/StyledTextFieldComponent";
import { OperatorItems } from "app/model/FilterFormComponents";

type Props = {
  component: QueryComponent;
  setComponent: (queryComponent: QueryComponent) => void;
};

const FilteringInputField = ({ component, setComponent }: Props) => {
  console.log("[FilteringInputField]:", component);

  /*
  const listOfCreationYears = useCreationYearStorageInit();
  const listOfCreationCountries = useCreationCountryStorageInit();
  const listOfCreationDirections = useCreationDirectionStorageInit();
  const listOfCoordinateX = useCoordinateXStorageInit();
  const listOfCoordinateY = useCoordinateYStorageInit();
  const listOfExifKeys = useExifKeyStorageInit();

  const getFilterFormTemplate = (): FilterFormTemplate[] => {
    if (component?.selectedFilterTab) {
      switch (component.selectedFilterTab) {
        case FilterDialogFilterOptions.Year:
          return [
            {
              inputTitle: "Év",
              options: listOfCreationYears
                .map((obj) => obj.year.toString())
                .sort(),
              inputKey: FilteringFormInputKeys.SelectInput,
            },
            {
              inputTitle: "Feltétel",
              options: operatorSelectItems.sort(),
              inputKey: FilteringFormInputKeys.OperatorInput,
            },
          ];
        case FilterDialogFilterOptions.Country:
          return [
            {
              inputTitle: "Ország",
              options: listOfCreationCountries
                .map((obj) => `(${obj.countryCode}) ${obj.countryName}`)
                .sort(),
              inputKey: FilteringFormInputKeys.SelectInput,
            },
            {
              inputTitle: "Feltétel",
              options: operatorSelectItems.sort(),
              inputKey: FilteringFormInputKeys.OperatorInput,
            },
          ];
        case FilterDialogFilterOptions.XCoordinates:
          return [
            {
              inputTitle: "X Koordináta",
              options: listOfCoordinateX
                .sort()
                .map((obj) => obj.coordinateX.toString()),
              inputKey: FilteringFormInputKeys.SelectInput,
            },
            {
              inputTitle: "Feltétel",
              options: operatorComparableItems.sort(),
              inputKey: FilteringFormInputKeys.OperatorInput,
            },
          ];
        case FilterDialogFilterOptions.YCoordinates:
          return [
            {
              inputTitle: "Y Koordináta",
              options: listOfCoordinateY
                .sort()
                .map((obj) => obj.coordinateY.toString()),
              inputKey: FilteringFormInputKeys.SelectInput,
            },
            {
              inputTitle: "Feltétel",
              options: operatorComparableItems.sort(),
              inputKey: FilteringFormInputKeys.OperatorInput,
            },
          ];
        case FilterDialogFilterOptions.Direction:
          return [
            {
              inputTitle: "Irány",
              options: listOfCreationDirections
                .map((obj) => obj.directionName)
                .sort(),
              inputKey: FilteringFormInputKeys.SelectInput,
            },
            {
              inputTitle: "Feltétel",
              options: operatorSelectItems.sort(),
              inputKey: FilteringFormInputKeys.OperatorInput,
            },
          ];
        case FilterDialogFilterOptions.ExifData:
          return [
            {
              inputTitle: "Exif kulcs",
              options: listOfExifKeys.map((obj) => obj.exifKeyName).sort(),
              inputKey: FilteringFormInputKeys.SelectInput,
            },
            {
              inputTitle: "Feltétel",
              options: operatorTextfieldItems.sort(),
              inputKey: FilteringFormInputKeys.OperatorInput,
            },
            {
              inputTitle: "Exif érték",
              inputKey: FilteringFormInputKeys.TextfieldInput,
            },
          ];
        case FilterDialogFilterOptions.Plant:
          return [];
        case FilterDialogFilterOptions.Algorith:
          return [];
        default:
          return [];
      }
    }
    return [];
  };
  */

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
      {component.selectedFilterTab && filterFormTemplate.length > 0 ? (
        filterFormTemplate.map((template, index) => (
          <React.Fragment key={index}>
            {renderInputField(template)}
          </React.Fragment>
        ))
      ) : (
        <React.Fragment
        /** TODO: Remove later, when every element is implemented
         * in the above section.
         */
        >
          selected filter tab is empty! Do something with it, developer!
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default FilteringInputField;
