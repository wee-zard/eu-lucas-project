import { FilterDialogFilters, FilteringFormInputKeys } from "@model/enum";
import { FilterFormTemplate } from "@model/FilterFormTemplate";
import {
  operatorBooleanItems,
  operatorComparableItems,
  operatorSelectItems,
} from "@model/QueryBuilderModel";
import { ConversionUtils } from "@helper/conversionUtils";
import i18n from "@i18n/i18nHandler";
import { useSelector } from "react-redux";
import { selectListOfCreationYears } from "@redux/selectors/creationYearSelector";
import { selectListOfCreationCountry } from "@redux/selectors/creationCountrySelector";
import { selectListOfCreationDirection } from "@redux/selectors/creationDirectionSelector";
import { selectListOfCoordinateX } from "@redux/selectors/coordinateXSelector";
import { selectListOfCoordinateY } from "@redux/selectors/coordinateYSelector";
import { selectListOfExifKeys } from "@redux/selectors/exifKeySelector";
import { selectListOfProcedures } from "@redux/selectors/procedureSelector";
import { selectListOfProcedureLogParamsByParam } from "@redux/selectors/procedureLogParamSelector";
import { selectListOfPlantsByName } from "@redux/selectors/plantSelector";
// TODO: Allow filtering by plant species.
//import { selectListOfPlantSpeciesByScientificName } from "@redux/selectors/plantSpeciesSelector";

export const useSelectedTabToFilterTemplate = (filterTab?: keyof typeof FilterDialogFilters) => {
  const listOfCreationYears = useSelector(selectListOfCreationYears);
  const listOfCreationCountries = useSelector(selectListOfCreationCountry);
  const listOfCreationDirections = useSelector(selectListOfCreationDirection);
  const listOfCoordinateX = useSelector(selectListOfCoordinateX);
  const listOfCoordinateY = useSelector(selectListOfCoordinateY);
  const listOfExifKeys = useSelector(selectListOfExifKeys);
  const listOfPlants = useSelector(selectListOfPlantsByName);
  // TODO: Allow filtering by plant species.
  //const listOfPlantSpecies = useSelector(selectListOfPlantSpeciesByScientificName);
  const listOfProcedures = useSelector(selectListOfProcedures)?.map((item) => item.name);
  const listOfProcedureLogParams = useSelector(selectListOfProcedureLogParamsByParam);
  const probabilityList = Array.from(Array(101).keys()).map((element) => element.toString());

  const getFilterFormTemplate = (): FilterFormTemplate[] => {
    if (!filterTab) {
      return [];
    }

    switch (filterTab) {
      case "YEAR":
        return [
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.year"),
            options: listOfCreationYears?.map((obj) => obj.year.toString()),
            inputKey: FilteringFormInputKeys.SelectInput,
          },
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
            options: operatorSelectItems,
            inputKey: FilteringFormInputKeys.OperatorInput,
          },
        ];
      case "COUNTRY":
        return [
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.country"),
            options: !listOfCreationCountries
              ? undefined
              : ConversionUtils.CreationCountriesToFormatString(listOfCreationCountries),
            inputKey: FilteringFormInputKeys.SelectInput,
          },
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
            options: operatorSelectItems,
            inputKey: FilteringFormInputKeys.OperatorInput,
          },
        ];
      case "X_COORDINATE":
        return [
          {
            inputTitle: i18n.t(
              "screens.filtering.query-builder.query-by-option-names.x-coordinates",
            ),
            options: listOfCoordinateX?.map((obj) => obj.coordinateX.toString()),
            inputKey: FilteringFormInputKeys.SelectInput,
          },
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
            options: operatorComparableItems,
            inputKey: FilteringFormInputKeys.OperatorInput,
          },
        ];
      case "Y_COORDINATE":
        return [
          {
            inputTitle: i18n.t(
              "screens.filtering.query-builder.query-by-option-names.y-coordinates",
            ),
            options: listOfCoordinateY?.map((obj) => obj.coordinateY.toString()),
            inputKey: FilteringFormInputKeys.SelectInput,
          },
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
            options: operatorComparableItems,
            inputKey: FilteringFormInputKeys.OperatorInput,
          },
        ];
      case "DIRECTION":
        return [
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.direction"),
            options: listOfCreationDirections?.map((obj) => obj.directionName),
            inputKey: FilteringFormInputKeys.SelectInput,
          },
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
            options: operatorSelectItems,
            inputKey: FilteringFormInputKeys.OperatorInput,
          },
        ];
      case "EXIF_DATA":
        return [
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.exif-key"),
            options: listOfExifKeys?.map((obj) => obj.name),
            inputKey: FilteringFormInputKeys.SelectInput,
          },
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
            options: operatorSelectItems,
            inputKey: FilteringFormInputKeys.OperatorInput,
          },
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.exif-value"),
            inputKey: FilteringFormInputKeys.SecondSelectInput,
          },
        ];
      case "PROCEDURE_NAME":
        return [
          {
            inputTitle: i18n.t(
              "screens.filtering.query-builder.query-by-option-names.procedure-name",
            ),
            options: listOfProcedures,
            inputKey: FilteringFormInputKeys.SelectInput,
          },
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
            options: operatorSelectItems,
            inputKey: FilteringFormInputKeys.OperatorInput,
          },
        ];
      case "PROCEDURE_PARAMS":
        return [
          {
            inputTitle: i18n.t(
              "screens.filtering.query-builder.query-by-option-names.procedure-params",
            ),
            options: listOfProcedureLogParams,
            inputKey: FilteringFormInputKeys.SelectInput,
          },
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
            options: operatorSelectItems,
            inputKey: FilteringFormInputKeys.OperatorInput,
          },
        ];
      case "IS_HOMOGENOUS":
        return [
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.homogenous"),
            options: operatorBooleanItems,
            inputKey: FilteringFormInputKeys.OperatorInput,
          },
        ];
      case "PROBABILITY":
        return [
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.probability"),
            // TODO: This should be changes to a number input textfield.
            options: probabilityList,
            inputKey: FilteringFormInputKeys.SelectInput,
          },
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
            options: operatorComparableItems,
            inputKey: FilteringFormInputKeys.OperatorInput,
          },
        ];
      /*
      // TODO: Allow filtering by plant species.
      case "PLANT_SPECIES":
        return [
          {
            inputTitle: i18n.t(
              "screens.filtering.query-builder.query-by-option-names.plant-species",
            ),
            options: listOfPlantSpecies,
            inputKey: FilteringFormInputKeys.SelectInput,
          },
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
            options: operatorSelectItems,
            inputKey: FilteringFormInputKeys.OperatorInput,
          },
        ];
        */
      case "PLANT_NAME":
        return [
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.plant"),
            options: listOfPlants,
            inputKey: FilteringFormInputKeys.SelectInput,
          },
          {
            inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
            options: operatorSelectItems,
            inputKey: FilteringFormInputKeys.OperatorInput,
          },
        ];
    }
  };

  return getFilterFormTemplate();
};
