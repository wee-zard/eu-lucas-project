/**
 * Endpoints of the Lucas-Image-Server
 */
export enum ImageServiceEndpoints {
  FetchImage = "/image",
  RandomImage = "/random-image",
  RandomImages = "/random-images",
}

export enum BackendAuthenticationEndpoints {
  Validate = "/api/authorization/",
}

export enum BackendRoleControllerEndpoints {
  GetAllRole = "/api/role/",
}

export enum BackendUserControllerEndpoints {
  ActivateUser = "/api/user/activate",
  SaveEmail = "/api/user/save-email",
  ToolpadSession = "/api/user/toolpad-session",
  Users = "/api/user/",
  CreateUser = "/api/user/save-email",
  DeleteUser = "/api/user/",
  ActivateDeleted = "/api/user/activate-deleted",
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
  GetImageByImageNameAndCreationYear = "/api/image/",
}

export enum BackendImageFetcherControllerEndpoints {
  DownloadImagesByUrls = "/api/fetcher/download-image",
  DownloadLocalImageServerResources = "/api/fetcher/image-server",
  GetRandomImages = "/api/fetcher/random",
  FetchImagesFromLocalServer = "/api/image/",
}

export enum BackendProcedureControllerEndpoints {
  UploadProcedure = "/api/procedure/upload",
  GetProcedures = "/api/procedure/",
  DeleteProcedures = "/api/procedure/delete-all",
}

export enum BackendProcedureLogControllerEndpoints {
  GetProcedureLogsByImageId = "/api/procedure-log/",
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

export enum BackendFolderControllerEndpoints {
  CreateFolder = "/api/folder/create",
  ImageToFolderAddition = "/api/folder/add",
  GetFolders = "/api/folder/",
  GetFoldersByUserIdSortedByUpdatedAt = "/api/folder/list-all",
  DeleteFolder = "/api/folder/",
  ClearFolder = "/api/folder/clear",
}

export enum GoogleTokenEndpoints {
  Token = "/token",
}
/**
 * Stores the backend endpoints in one place.
 */
export type BackendControllerEndpointTypes =
  | BackendUserControllerEndpoints
  | BackendAuthenticationEndpoints
  | BackendRoleControllerEndpoints
  | BackendCreationYearControllerEndpoints
  | BackendCreationCountryControllerEndpoints
  | BackendCreationDirectionControllerEndpoints
  | BackendCoordinateXControllerEndpoints
  | BackendCoordinateYControllerEndpoints
  | BackendExifKeyControllerEndpoints
  | BackendImageControllerEndpoints
  | BackendProcedureControllerEndpoints
  | BackendImageFetcherControllerEndpoints
  | BackendPlantNameControllerEndpoints
  | BackendPlantControllerEndpoints
  | BackendPlantSpeciesControllerEndpoints
  | BackendProcedureLogParamControllerEndpoints
  | BackendProcedureLogControllerEndpoints
  | BackendFolderControllerEndpoints
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
  SessionAccount = "session-account",
  ToolPadMode = "toolpad-mode",
  SetItem = "setItem",
  FilteringDialog = "filtering-dialog",
  UserCreationForm = "user-creation-form",
  FolderCreationForm = "folder-creation-form",
  FolderListDataGrid = "/folder-list",
  ReportCreationForm = "report-creation-form",
  Settings = "settings",
}

export enum FormEnums {
  ReportCreationForm = "report-creation-form",
  //UserCreationForm = "user-creation-form",
  FolderCreationForm = "folder-creation-form",
  ImageToFolderAdditionForm = "image-to-folder-addition-form",
  SettingsForm = "settings-form",
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
  AddImageText = "Képek kiválasztása",
  AddImagesToFolder = "Képek mentése",
  AddImagesToFolderTooltip = "Add hozzá az általad kiválasztott képeket egy már létező mappához (amit korábban létrehoztál), vagy egy teljesen új mappához.",
  DownloadTooltip = "Kijelölt képek letöltése",
}

export enum FilterDialogFilters {
  YEAR = "Év",
  COUNTRY = "Ország",
  X_COORDINATE = "X Koordináta",
  Y_COORDINATE = "Y Koordináta",
  DIRECTION = "Készítés Iránya",
  // TODO: Allow filtering by EXIF_DATA
  //EXIF_DATA = "Exif adat",
  PROCEDURE_NAME = "Eljárás neve",
  PROCEDURE_PARAMS = "Eljárás pareméterei",
  IS_HOMOGENOUS = "Detektált növény homogén-e",
  PROBABILITY = "Detektálás valószínűsége",
  // TODO: Allow filtering by plant species.
  //PLANT_SPECIES = "Növényfajok",
  PLANT_NAME = "Növények",
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
  Search = "Befoglaló téglalapok megjelenítése",
}

export enum RequestCommandTypes {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}

export enum ProcedureFileMessages {
  ErrorWhileProcessingFileAtServer = "screens.upload-procedures.error.processing-file-at-server",
  ErrorWhileConvertingFileToBuffer = "screens.upload-procedures.error.processing-file-to-buffer",
  FileIsSuccessfullyUploaded = "screens.upload-procedures.notifications.file-uploaded",
  FileExtensionIsNotXml = "screens.upload-procedures.error.file-extension",
  XmlToObjectError = "screens.upload-procedures.error.xml-to-object",
  XmlObjectIsEmpty = "screens.upload-procedures.error.xml-object-is-empty",

  XmlAnnotationIsNotDefined = "screens.upload-procedures.error.xml-annotation-is-not-defined",
  XmlDateIsNotDefined = "screens.upload-procedures.error.xml-date-is-not-defined",
  XmlAuthorIsNotDefined = "screens.upload-procedures.error.xml-author-is-not-defined",
  XmlMethodIsNotDefined = "screens.upload-procedures.error.xml-method-is-not-defined",
  XmlImagesNotDefined = "screens.upload-procedures.error.xml-images-is-not-defined",
  XmlFilenameNotDefined = "screens.upload-procedures.error.xml-filename-is-not-defined",
  XmlObjectNotDefined = "screens.upload-procedures.error.xml-object-is-not-defined",
  XmlNameNotDefined = "screens.upload-procedures.error.xml-name-is-not-defined",

  XmlBoundingBoxNotDefined = "screens.upload-procedures.error.xml-bounding-box-is-not-defined",
  XmlCenterXNotDefined = "screens.upload-procedures.error.xml-centerx-is-not-defined",
  XmlCenterYNotDefined = "screens.upload-procedures.error.xml-centery-is-not-defined",
  XmlWidthNotDefined = "screens.upload-procedures.error.xml-width-is-not-defined",
  XmlHeightNotDefined = "screens.upload-procedures.error.xml-height-is-not-defined",

  XmlDateIncorrectType = "screens.upload-procedures.error.xml-date-is-not-in-number",
  XmlAuthorIncorrectType = "screens.upload-procedures.error.xml-author-incorrect-type-provided",
  XmlMethodIncorrectType = "screens.upload-procedures.error.xml-method-incorrect-type-provided",
  XmlFilenameIncorrectType = "screens.upload-procedures.error.xml-filename-incorrect-type-provided",
  XmlConfidenceIncorrectType = "screens.upload-procedures.error.xml-confidence-incorrect-type-provided",
  XmlNameIncorrectType = "screens.upload-procedures.error.xml-name-incorrect-type-provided",
  XmlCenterXIncorrectType = "screens.upload-procedures.error.xml-centerx-incorrect-type-provided",
  XmlCenterYIncorrectType = "screens.upload-procedures.error.xml-centery-incorrect-type-provided",
  XmlWidthIncorrectType = "screens.upload-procedures.error.xml-width-incorrect-type-provided",
  XmlHeightIncorrectType = "screens.upload-procedures.error.xml-height-incorrect-type-provided",

  XmlDateNotLongEnough = "screens.upload-procedures.error.xml-date-not-long-enough",
  XmlDateInvalidFormat = "screens.upload-procedures.error.xml-date-invalid-format",
  ErrorExtractingParamName = "screens.upload-procedures.error.extracting-param-names",
  ErrorExtractingImageName = "screens.upload-procedures.error.image-name",
  ErrorExtractingImageExtension = "screens.upload-procedures.error.image-extension",
  ErrorInvasiveResultIsNotPresent = "screens.upload-procedures.error.invasive-result-is-not-present",
  ErrorObjectNameIsInvalidFormat = "screens.upload-procedures.error.object-name-is-invalid-format",
  ErrorConfidenceIsNotInRange = "screens.upload-procedures.error.confidence-value-is-not-in-range",

  ImageNotFoundOnServer = "screens.upload-procedures.error.image-not-found-on-server",
  ImageNotFoundOnGiscoLucasServer = "screens.upload-procedures.error.image-not-found-on-gisco-lucas-server",
  ErrorUploadingToServer = "screens.upload-procedures.error.log-cannot-be-uploaded-to-server",
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

export enum ProcedureLogProperties {
  Procedure = "screens.bounding-box.procedureLogMenu.procedure",
  Params = "screens.bounding-box.procedureLogMenu.params",
  Plants = "screens.bounding-box.procedureLogMenu.plants",
  User = "screens.bounding-box.procedureLogMenu.user",
  Box = "screens.bounding-box.procedureLogMenu.box",
  CreationDate = "screens.bounding-box.procedureLogMenu.creationDate",
}
