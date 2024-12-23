import {
  FilterDialogFilterOptions,
  FilteringFormInputKeys,
} from "@model/enum";
import {
  useCoordinateXStorageInit,
  useCoordinateYStorageInit,
  useCreationCountryStorageInit,
  useCreationDirectionStorageInit,
  useCreationYearStorageInit,
  useExifKeyStorageInit,
} from "./useStorageInit";
import { FilterFormTemplate } from "@model/FilterFormTemplate";
import {
  operatorComparableItems,
  operatorSelectItems,
  operatorTextfieldItems,
} from "@helper/filterFormUtils";

export const useSelectedTabToFilterTemplate = (
  filterTab?: FilterDialogFilterOptions
) => {
  const listOfCreationYears = useCreationYearStorageInit();
  const listOfCreationCountries = useCreationCountryStorageInit();
  const listOfCreationDirections = useCreationDirectionStorageInit();
  const listOfCoordinateX = useCoordinateXStorageInit();
  const listOfCoordinateY = useCoordinateYStorageInit();
  const listOfExifKeys = useExifKeyStorageInit();

  const getFilterFormTemplate = (): FilterFormTemplate[] => {
    if (!filterTab) {
      return [];
    }
    switch (filterTab) {
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

  return getFilterFormTemplate();
};
