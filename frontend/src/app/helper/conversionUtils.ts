import CreationCountryDto from "@model/dto/CreationCountryDto";
import {
  FilterDialogFilterOptionNames,
  FilterDialogFilterOptions,
  OperatorComparableItemNames,
  OperatorComparableItems,
  OperatorSelectItemNames,
  OperatorSelectItems,
  ReportTypes,
  ReportTypesNames,
  ServersToConnectTo,
} from "@model/enum";
import { QueryConditions } from "@model/QueryBuilderModel";

const imageServerPath = process.env.REACT_APP_USE_IMAGE_SERVER_PATH ?? "";
const backendServerPath = process.env.REACT_APP_USE_BACKEND ?? "";
const googleServerPath = process.env.REACT_APP_USE_GOOGLE_SERVER ?? "";

export const ConversionUtils = {
  FilterOptionNamesToFilterOptions: (item: FilterDialogFilterOptionNames) => {
    switch (item) {
      case FilterDialogFilterOptionNames.Year:
        return FilterDialogFilterOptions.Year;
      case FilterDialogFilterOptionNames.Algorith:
        return FilterDialogFilterOptions.Algorith;
      case FilterDialogFilterOptionNames.Country:
        return FilterDialogFilterOptions.Country;
      case FilterDialogFilterOptionNames.Direction:
        return FilterDialogFilterOptions.Direction;
      case FilterDialogFilterOptionNames.ExifData:
        return FilterDialogFilterOptions.ExifData;
      case FilterDialogFilterOptionNames.Plant:
        return FilterDialogFilterOptions.Plant;
      case FilterDialogFilterOptionNames.XCoordinates:
        return FilterDialogFilterOptions.XCoordinates;
      case FilterDialogFilterOptionNames.YCoordinates:
        return FilterDialogFilterOptions.YCoordinates;
    }
  },

  FilterOptionsToFilterOptionNames: (item?: FilterDialogFilterOptions) => {
    switch (item) {
      case FilterDialogFilterOptions.Year:
        return FilterDialogFilterOptionNames.Year;
      case FilterDialogFilterOptions.Algorith:
        return FilterDialogFilterOptionNames.Algorith;
      case FilterDialogFilterOptions.Country:
        return FilterDialogFilterOptionNames.Country;
      case FilterDialogFilterOptions.Direction:
        return FilterDialogFilterOptionNames.Direction;
      case FilterDialogFilterOptions.ExifData:
        return FilterDialogFilterOptionNames.ExifData;
      case FilterDialogFilterOptions.Plant:
        return FilterDialogFilterOptionNames.Plant;
      case FilterDialogFilterOptions.XCoordinates:
        return FilterDialogFilterOptionNames.XCoordinates;
      case FilterDialogFilterOptions.YCoordinates:
        return FilterDialogFilterOptionNames.YCoordinates;
    }
  },

  OperatorItemsToOperatorItemNames: (item?: QueryConditions) => {
    switch (item) {
      case OperatorSelectItems.Equals:
        return OperatorSelectItemNames.Equals;
      case OperatorSelectItems.DoesNotEqual:
        return OperatorSelectItemNames.DoesNotEqual;
      case OperatorComparableItems.Greater:
        return OperatorComparableItemNames.Greater;
      case OperatorComparableItems.GreaterOrEqual:
        return OperatorComparableItemNames.GreaterOrEqual;
      case OperatorComparableItems.Less:
        return OperatorComparableItemNames.Less;
      case OperatorComparableItems.LessOrEqual:
        return OperatorComparableItemNames.LessOrEqual;
      default:
        return item;
    }
  },

  OperatorItemNamesToOperatorItems: (item?: string) => {
    switch (item) {
      case OperatorSelectItemNames.Equals:
        return OperatorSelectItems.Equals;
      case OperatorSelectItemNames.DoesNotEqual:
        return OperatorSelectItems.DoesNotEqual;
      case OperatorComparableItemNames.Greater:
        return OperatorComparableItems.Greater;
      case OperatorComparableItemNames.GreaterOrEqual:
        return OperatorComparableItems.GreaterOrEqual;
      case OperatorComparableItemNames.Less:
        return OperatorComparableItems.Less;
      case OperatorComparableItemNames.LessOrEqual:
        return OperatorComparableItems.LessOrEqual;
      default:
        return item ?? "";
    }
  },

  /**
   * Converts the list of countries into format string for the purpose of displaying
   * the countries for the users in a readable format.
   *
   * @param listOfCreationCountries The list of all the countries what we want to display.
   * @returns The format string list of the countries.
   */
  CreationCountriesToFormatString: (
    listOfCreationCountries: CreationCountryDto[]
  ) => {
    return listOfCreationCountries
      .map((obj) => ConversionUtils.CreationCountryToFormatString(obj))
      .sort();
  },

  /**
   * Convert a singular {@link CreationCountryDto} into format string for the purpose of displaying
   * the countries for the users in a readable format.
   *
   * @param listOfCreationCountries The list of all the countries what we want to display.
   * @returns The format string list of the countries.
   */
  CreationCountryToFormatString: (obj?: CreationCountryDto) =>
    obj ? `(${obj.countryCode}) ${obj.countryName}` : "",

  /**
   * Converts a singular format string into {@link CreationCountryDto}.
   * Transform all the list of countries into format string and checks which of the format string matches the
   * user provided format string and returns the dto.
   *
   * @param formatString The user selected format string format of a {@link CreationCountryDto} object.
   * @param listOfCreationCountries The list of all the countries.
   * @returns the country code of the format string.
   */
  FormatStringToCreationCountryDto: (
    formatString: string,
    listOfCreationCountries: CreationCountryDto[]
  ) => {
    const country = listOfCreationCountries.find(
      (countryDto) =>
        ConversionUtils.CreationCountryToFormatString(countryDto) ===
        formatString
    );
    return country?.countryCode ?? "";
  },

  /**
   * Converts the provided server connection string to
   * a backend server path that is mainly used in the send out
   * of the http requests to set the destination of the requests.
   *
   * @param serverToUse The server we want to connect to.
   * @returns Returns the url of the server we want to connect to.
   */
  ServerConnectionToServerPath: (serverToUse: ServersToConnectTo) => {
    switch (serverToUse) {
      case ServersToConnectTo.Backend:
        return backendServerPath;
      case ServersToConnectTo.LucasImageServer:
        return imageServerPath;
      case ServersToConnectTo.GoogleServer:
        return googleServerPath;
    }
  },

  ReportTypesNamesToReportTypes: (reportTypeName: ReportTypesNames) => {
    switch (reportTypeName) {
      case ReportTypesNames.BUG:
        return ReportTypes.BUG;
      case ReportTypesNames.REQUEST_FEATURE:
        return ReportTypes.REQUEST_FEATURE;
    }
  },

  ReportTypesToReportTypeNames: (reportType?: ReportTypes) => {
    switch (reportType) {
      case ReportTypes.BUG:
        return ReportTypesNames.BUG;
      case ReportTypes.REQUEST_FEATURE:
        return ReportTypesNames.REQUEST_FEATURE;
    }
  },
};
