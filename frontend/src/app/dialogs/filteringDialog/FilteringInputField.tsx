import React from "react";
import FilteringInputComponent from "./FilteringInputComponent";
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

type Props = {
  component: QueryComponent;
  setComponent: (queryComponent: QueryComponent) => void;
};

const FilteringInputField = ({ component, setComponent }: Props) => {
  const listOfCreationYears = useCreationYearStorageInit();
  const listOfCreationCountries = useCreationCountryStorageInit();
  const listOfCreationDirections = useCreationDirectionStorageInit();
  const listOfCoordinateX = useCoordinateXStorageInit();
  const listOfCoordinateY = useCoordinateYStorageInit();
  const listOfExifKeys = useExifKeyStorageInit();

  console.log("[FilteringInputField]:", component);

  const getFilterFormTemplate = (): FilterFormTemplate[] => {
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
  };

  return (
    <React.Fragment>
      { component.selectedFilterTab ? (
        <FilteringInputComponent
          filteringFormTemplate={getFilterFormTemplate()}
          selectedFilterTab={component.selectedFilterTab}
          component={component}
          setComponent={setComponent}
        />
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
