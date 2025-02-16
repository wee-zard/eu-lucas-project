import { FilterDialogFilters, FilteringFormInputKeys } from "@model/enum";
import { FilterFormTemplate } from "@model/FilterFormTemplate";
import {
  operatorBooleanItems,
  operatorComparableItems,
  operatorSelectItems,
  operatorTextfieldItems,
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
import { selectListOfProcedureLogParams } from "@redux/selectors/procedureLogParamSelector";

export const useSelectedTabToFilterTemplate = (filterTab?: keyof typeof FilterDialogFilters) => {
  const listOfCreationYears = useSelector(selectListOfCreationYears);
  const listOfCreationCountries = useSelector(selectListOfCreationCountry);
  const listOfCreationDirections = useSelector(selectListOfCreationDirection);
  const listOfCoordinateX = useSelector(selectListOfCoordinateX);
  const listOfCoordinateY = useSelector(selectListOfCoordinateY);
  const listOfExifKeys = useSelector(selectListOfExifKeys);
  const listOfProcedures = useSelector(selectListOfProcedures).map((item) => item.name);
  const listOfProcedureLogParams = useSelector(selectListOfProcedureLogParams).map(
    (item) => item.procedureParamName,
  );
  const probabilityList = Array.from(Array(101).keys()).map((element) => element.toString());

  const getFilterFormTemplate = (): FilterFormTemplate[] => {
    if (!filterTab) {
      return [];
    }

    // TODO: Fix the following error: "no-useless-computed-key"
    const handler = Object.freeze({
      ["YEAR"]: () => [
        {
          inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.year"),
          options: listOfCreationYears.map((obj) => obj.year.toString()),
          inputKey: FilteringFormInputKeys.SelectInput,
        },
        {
          inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
          options: operatorSelectItems,
          inputKey: FilteringFormInputKeys.OperatorInput,
        },
      ],
      ["COUNTRY"]: () => [
        {
          inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.country"),
          options: ConversionUtils.CreationCountriesToFormatString(listOfCreationCountries),
          inputKey: FilteringFormInputKeys.SelectInput,
        },
        {
          inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
          options: operatorSelectItems,
          inputKey: FilteringFormInputKeys.OperatorInput,
        },
      ],
      ["X_COORDINATE"]: () => [
        {
          inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.x-coordinates"),
          options: listOfCoordinateX.map((obj) => obj.coordinateX.toString()),
          inputKey: FilteringFormInputKeys.SelectInput,
        },
        {
          inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
          options: operatorComparableItems,
          inputKey: FilteringFormInputKeys.OperatorInput,
        },
      ],
      ["Y_COORDINATE"]: () => [
        {
          inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.y-coordinates"),
          options: listOfCoordinateY.map((obj) => obj.coordinateY.toString()),
          inputKey: FilteringFormInputKeys.SelectInput,
        },
        {
          inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
          options: operatorComparableItems,
          inputKey: FilteringFormInputKeys.OperatorInput,
        },
      ],
      ["DIRECTION"]: () => [
        {
          inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.direction"),
          options: listOfCreationDirections.map((obj) => obj.directionName),
          inputKey: FilteringFormInputKeys.SelectInput,
        },
        {
          inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
          options: operatorSelectItems,
          inputKey: FilteringFormInputKeys.OperatorInput,
        },
      ],
      ["EXIF_DATA"]: () => [
        {
          inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.exif-key"),
          options: listOfExifKeys.map((obj) => obj.exifKeyName),
          inputKey: FilteringFormInputKeys.SelectInput,
        },
        {
          inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
          options: operatorTextfieldItems,
          inputKey: FilteringFormInputKeys.OperatorInput,
        },
        {
          inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.exif-value"),
          inputKey: FilteringFormInputKeys.TextfieldInput,
        },
      ],
      ["PROCEDURE_NAME"]: () => [
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
      ],
      ["PROCEDURE_PARAMS"]: () => [
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
      ],
      ["IS_HOMOGENOUS"]: () => [
        {
          inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.homogenous"),
          options: operatorBooleanItems,
          inputKey: FilteringFormInputKeys.OperatorInput,
        },
      ],
      ["PROBABILITY"]: () => [
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
      ],
      // TODO: ...
      ["PLANT_SPECIES"]: () => [
        {
          inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
          options: operatorSelectItems,
          inputKey: FilteringFormInputKeys.OperatorInput,
        },
      ],

      // TODO: ...
      ["PLANT_NAME"]: () => [
        {
          inputTitle: i18n.t("screens.filtering.query-builder.query-by-option-names.condition"),
          options: operatorSelectItems,
          inputKey: FilteringFormInputKeys.OperatorInput,
        },
      ],
    });

    return handler[filterTab].call(() => null);
  };

  return getFilterFormTemplate();
};
