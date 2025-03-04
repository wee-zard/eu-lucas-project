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

export enum BackendCoordinateXControllerEndpoints {
  GetCoordinateXList = "/api/coordinate-x/get-coordinate-x",
}

export enum BackendCoordinateYControllerEndpoints {
  GetCoordinateYList = "/api/coordinate-y/get-coordinate-y",
}

export enum BackendExifKeyControllerEndpoints {
  GetExifKeyList = "/api/exif-key",
}

export enum BackendImageControllerEndpoints {
  PostFilterImage = "/api/image/filter-images",
}

export enum BackendProcedureControllerEndpoints {
  UploadProcedure = "/api/procedure/upload",
  GetProcedures = "/api/procedure/",
  DeleteProcedures = "/api/procedure/delete-all",
}

export enum BackendPlantNameControllerEndpoints {
  DeletePlantNames = "/api/plant-name/delete-all",
}

export enum BackendPlantControllerEndpoints {
  GetPlants = "/api/plant/",
}

export enum BackendPlantSpeciesControllerEndpoints {
  GetPlantSpecies = "/api/plant-species/",
}

export enum BackendProcedureLogParamControllerEndpoints {
  GetProcedureParamsByProcedureId = "/api/procedure-param/",
}

export enum BackendSmtpEmailControllerEndpoints {
  ReportEmail = "/api/email/report",
}

export enum GoogleTokenEndpoints {
  Token = "/token",
}
/**
 * Stores the backend endpoints in one place.
 */
export type BackendControllerEndpointTypes =
  | BackendUserControllerEndpoints
  | BackendCreationYearControllerEndpoints
  | BackendCreationCountryControllerEndpoints
  | BackendCreationDirectionControllerEndpoints
  | BackendCoordinateXControllerEndpoints
  | BackendCoordinateYControllerEndpoints
  | BackendExifKeyControllerEndpoints
  | BackendImageControllerEndpoints
  | BackendProcedureControllerEndpoints
  | BackendPlantNameControllerEndpoints
  | BackendPlantControllerEndpoints
  | BackendPlantSpeciesControllerEndpoints
  | BackendProcedureLogParamControllerEndpoints
  | BackendSmtpEmailControllerEndpoints;

/**
 * Stores the Lucas-image-server endpoints in one place.
 */
export type LucasImageServiceEndpointTypes = ImageServiceEndpoints;

/**
 * Stores the Google server endpoints in one place.
 */
export type GoogleServiceEndpointTypes = GoogleTokenEndpoints;

/**
 * Universal type that hold the endpoints of the whole project.
 */
export type RootEndpoints =
  | LucasImageServiceEndpointTypes
  | BackendControllerEndpointTypes
  | GoogleServiceEndpointTypes;

/**
 * The list of servers where the api requests could be sent out to.
 */
export enum ServersToConnectTo {
  Backend,
  LucasImageServer,
  GoogleServer,
}

export enum LocalStorageKeys {
  GoogleOAuthToken = "google_oauth_token",
  GoogleRefreshToken = "google-refresh-token",
  NotificationColor = "toolpad-mode",
  FilteringDialog = "filtering-dialog",
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

export enum FilterDialogFilters {
  YEAR = "Év",
  COUNTRY = "Ország",
  X_COORDINATE = "X Koordináta",
  Y_COORDINATE = "Y Koordináta",
  DIRECTION = "Készítés Iránya",
  EXIF_DATA = "Exif adat",
  PROCEDURE_NAME = "Eljárás neve",
  PROCEDURE_PARAMS = "Eljárás pareméterei",
  IS_HOMOGENOUS = "Detektált növény homogén-e",
  PROBABILITY = "Detektálás valószínűsége",
  PLANT_SPECIES = "Növényfajok",
  PLANT_NAME = "Növények",
}

export enum DialogToOpens {
  FilteringDialog = "Filtering Dialog",
}

export enum OperatorSelectItems {
  Equals = "EQUALS",
  DoesNotEqual = "DOES_NOT_EQUALS",
}

export enum OperatorSelectItemNames {
  Equals = "==",
  DoesNotEqual = "!=",
}

export enum OperatorBooleanItems {
  BooleanEqual = "BOOLEAN_EQUAL",
  BooleanNotEqual = "BOOLEAN_NOT_EQUAL",
}

export enum OperatorBooleanItemNames {
  BooleanEqual = "Igen",
  BooleanNotEqual = "Nem",
}

export enum OperatorTextfieldItems {
  Contains = "contains",
  DoesNotContain = "does not contain",
  StartsWith = "starts with",
  EndsWith = "ends with",
  //IsEmpty = "is empty",
  //IsNotEmpty = "is not empty",
  //IsAnyOf = "is any of",
}

export enum OperatorComparableItems {
  Less = "LESS",
  LessOrEqual = "LESS_OR_EQUAL",
  Greater = "GREATER",
  GreaterOrEqual = "GREATER_OR_EQUAL",
}

export enum OperatorComparableItemNames {
  Less = "<",
  LessOrEqual = "<=",
  Greater = ">",
  GreaterOrEqual = ">=",
}

export enum FilteringFormInputKeys {
  SelectInput = "selectInput",
  OperatorInput = "operatorInput",
  TextfieldInput = "textFieldInput",
}

export enum MenuActions {
  CANCEL = "CANCEL",
  SUBMIT = "SUBMIT",
  CLEAR_ALL = "CLEAR_ALL",
  PAGINATION_CHANGE = "PAGINATION_CHANGE",
}

export enum QueryTypes {
  QUERY_BUILDER = "QUERY_BUILDER",
  QUERY_GROUP = "QUERY_GROUP",
  QUERY_COMPONENT = "QUERY_COMPONENT",
}

export enum SelectedImageActionTooltipTitles {
  Delete = "Kép eltávolítása a kiválasztott képek közül",
  Edit = "Szűrési feltételek módosítása",
  Search = "Befoglaló téglalapok megjelenítése",
}

export enum RequestCommandTypes {
  GET,
  POST,
  DELETE,
  PUT,
}

export enum ProcedureFileMessages {
  ErrorWhileProcessingFileAtServer = "screens.upload-procedures.view.error.processing-file-at-server",
  FileIsSuccessfullyUploaded = "screens.upload-procedures.notifications.file-uploaded",
  FileExtensionIsNotXml = "screens.upload-procedures.view.error.file-extension",
  XmlToObjectError = "screens.upload-procedures.view.error.xml-to-object",
  XmlDateInvalidFormat = "screens.upload-procedures.view.error.xml-date-invalid-format",
  ErrorExtractingProcedureMethodName = "screens.upload-procedures.view.error.procedure-method-name",
  ErrorExtractingImageName = "screens.upload-procedures.view.error.image-name",
  ErrorInvasiveResultIsNotPresent = "screens.upload-procedures.view.error.invasive-result-is-not-present",
  ErrorObjectNameIsInvalidFormat = "screens.upload-procedures.view.error.object-name-is-invalid-format",
}

export enum ReportTypes {
  BUG = "BUG",
  REQUEST_FEATURE = "REQUEST_FEATURE",
}

export enum ReportTypesNames {
  BUG = "screens.reporting.report-types.bug",
  REQUEST_FEATURE = "screens.reporting.report-types.request-feature",
}

export enum UniqueErrorResponseTypes {
  UNAUTHORIZED = "UNAUTHORIZED",
}

export enum GuardResultTypes {
  PENDING = "PENDING",
  FAILED = "FAILED",
  PASSED = "PASSED",
}

export enum GuardTypes {
  NOT_LOGGED_IN_GUARD = "NOT_LOGGED_IN_GUARD",
  GOOGLE_ACCOUNT_GUARD = "GOOGLE_ACCOUNT_GUARD",
}
