/**
 * Endpoints of the Lucas-Image-Server
 */
export enum ImageServiceEndpoints {
  FetchImage = "/image",
  RandomImage = "/random-image",
  RandomImages = "/random-images",
}

export enum BackendUserControllerEndpoints {
  ValidateEmail = "/api/user/validate-email",
  SaveEmail = "/api/user/save-email",
}

export enum BackendCreationYearControllerEndpoints {
  GetCreationYears = "/api/year/get-creation-years",
}

export enum BackendCreationCountryControllerEndpoints {
  GetCreationCountries = "/api/country/get-creation-countries",
}

export enum BackendCreationDirectionControllerEndpoints {
  GetCreationDirections = "/api/direction/get-creation-direction",
}

/**
 * Stores the backend endpoints in one place.
 */
export type BackendControllerEndpointTypes = 
  BackendUserControllerEndpoints
  | BackendCreationYearControllerEndpoints
  | BackendCreationCountryControllerEndpoints
  | BackendCreationDirectionControllerEndpoints;

/**
 * Stores the Lucas-image-server endpoints in one place.
 */
export type LucasImageServiceEndpointTypes = ImageServiceEndpoints;

/**
 * Universal type that hold the endpoints of the whole project.
 */
export type RootEndpoints =
  | LucasImageServiceEndpointTypes
  | BackendControllerEndpointTypes;

/**
 * The list of servers where the api requests could be sent out to.
 */
export enum ServersToConnectTo {
  Backend,
  LucasImageServer,
}

export enum LocalStorageKeys {
  GoogleOAuthToken = "google_oauth_token",
  NotificationColor = "toolpad-mode",
}

export enum ScreenUrls {
  DefaultScreenPath = "/",
  LoginScreenPath = "/login",
  LucasScreenPath = "/lucas",
  NotFoundScreenPath = "*",
}

export enum FilteringScreenTexts {
  ClearAllTooltip = "Kijelölések megszüntetése",
  ClearAllText = "Clear All",
  AddImageTooltip = "Új kép kiválasztása",
  AddImageText = "Add new",
  DownloadTooltip = "Kijelölt képek letöltése",
}

export enum FilteringDialogTexts {
  DisagreeButtonText = "Mégsem",
  AgreeButtonText = "Mentés",
}

export enum FilterDialogFilterOptions {
  Year = "Év",
  Country = "Ország",
  XCoordinates = "X Koordináta",
  YCoordinates = "Y Koordináta",
  Direction = "Készítés iránya",
  ExifData = "Exif adat",
  Plant = "Növények",
  Algorith = "Algoritmus",
}

export enum DialogToOpens {
  FilteringDialog = "Filtering Dialog",
}

export enum OperatorSpecificItems {
  Equals = "equals",
  DoesNotEqual = "does not equal",
}

export enum OperatorNonSpecificItems {
  Contains = "contains",
  DoesNotContain = "does not contain",
  StartsWith = "starts with",
  EndsWith = "ends with",
  IsEmpty = "is empty",
  IsNotEmpty = "is not empty",
  IsAnyOf = "is any of",
}

export enum FormLogicalExpressions {
  And = "And",
  Or = "Or",
  Not = "Not",
}

export enum FilteringFormInputKeys {
  SelectInput = "Select Input",
  OperatorInput = "Operator Input",
  TextfieldInput = "Textfield Input",
}
