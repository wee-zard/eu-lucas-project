import { BaseControllerEndpoint } from "./BaseControllerEndpoint";

/**
 * Endpoints of the Folder Controller on the Backend.
 */
export class FolderControllerEndpoints extends BaseControllerEndpoint {
  private static readonly BASE = "folder";
  public static readonly CREATE_FOLDER = `${this.getPath(this.BASE)}/create`;
}

/**
 * Endpoints of the Procedure Controller on the Backend.
 */
export class ProcedureControllerEndpoints extends BaseControllerEndpoint {
  private static readonly BASE = "procedure";
  public static readonly UPLOAD_PROCEDURE = `${this.getPath(this.BASE)}/upload`;
  public static readonly GET_PROCEDURES = `${this.getPath(this.BASE)}/`;
  public static readonly DELETE_PROCEDURES = `${this.getPath(this.BASE)}/delete-all`;
}

/**
 * Endpoints of the Role Controller on the Backend.
 */
export class RoleControllerEndpoints extends BaseControllerEndpoint {
  private static readonly BASE = "role";
  public static readonly GET_ALL_ROLE = `${this.getPath(this.BASE)}/`;
}

/**
 * Endpoints of the User Controller on the Backend.
 */
export class UserControllerEndpoints extends BaseControllerEndpoint {
  private static readonly BASE = "user";
  public static readonly VALIDATE_EMAIL = `${this.getPath(this.BASE)}/validate-email`;
  public static readonly ACTIVATE = `${this.getPath(this.BASE)}/activate`;
  public static readonly SAVE_EMAIL = `${this.getPath(this.BASE)}/save-email`;
  public static readonly TOOLPAD_SESSION = `${this.getPath(this.BASE)}/toolpad-session`;
  public static readonly GET_USERS = `${this.getPath(this.BASE)}/`;
  public static readonly CREATE_USER = `${this.getPath(this.BASE)}/save-email`;
  public static readonly DELETE_USER = `${this.getPath(this.BASE)}/`;
  public static readonly ACTIVATE_DELETED = `${this.getPath(this.BASE)}/activate-deleted`;
}

/**
 * Endpoints of the Creation Year Controller on the Backend.
 */
export class YearControllerEndpoints extends BaseControllerEndpoint {
  private static readonly BASE = "year";
  public static readonly GET_CREATION_YEARS = `${this.getPath(this.BASE)}/get-creation-years`;
}

/**
 * Endpoints of the Creation Country Controller on the Backend.
 */
export class CountryControllerEndpoints extends BaseControllerEndpoint {
  private static readonly BASE = "country";
  public static readonly GET_COUNTRIES = `${this.getPath(this.BASE)}/get-creation-countries`;
}

/**
 * Endpoints of the Direction Controller on the Backend.
 */
export class DirectionControllerEndpoints extends BaseControllerEndpoint {
  private static readonly BASE = "direction";
  public static readonly GET_DIRECTION = `${this.getPath(this.BASE)}/get-creation-direction`;
}

/**
 * Endpoints of the Coordinate X Controller on the Backend.
 */
export class CoordinateXControllerEndpoints extends BaseControllerEndpoint {
  private static readonly BASE = "coordinate-x";
  public static readonly GET_COORDINATE_X = `${this.getPath(this.BASE)}/get-coordinate-x`;
}

/**
 * Endpoints of the Coordinate Y Controller on the Backend.
 */
export class CoordinateYControllerEndpoints extends BaseControllerEndpoint {
  private static readonly BASE = "coordinate-y";
  public static readonly GET_COORDINATE_Y = `${this.getPath(this.BASE)}/get-coordinate-y`;
}

/**
 * Endpoints of the Exif Key Controller on the Backend.
 */
export class ExifKeyControllerEndpoints extends BaseControllerEndpoint {
  private static readonly BASE = "exif-key";
  public static readonly GET_EXIF_KEY_LIST = `${this.getPath(this.BASE)}`;
}

/**
 * Endpoints of the Image Controller on the Backend.
 */
export class ImageControllerEndpoints extends BaseControllerEndpoint {
  private static readonly BASE = "image";
  public static readonly POST_FILTER_IMAGE = `${this.getPath(this.BASE)}/filter-images`;
  public static readonly GET_IMAGES_BY_NAME_AND_YEAR = `${this.getPath(this.BASE)}/`;
}

/**
 * Endpoints of the Image Fetcher Controller on the Backend.
 */
export class ImageFetcherControllerEndpoints extends BaseControllerEndpoint {
  private static readonly BASE = "fetcher";
  public static readonly DOWNLOAD_IMAGE = `${this.getPath(this.BASE)}/download-image`;
}

// ==================================================

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

/**
 * Stores the Backend endpoints.
 */
export type BackendControllerEndpointType =
  | FolderControllerEndpoints
  | ProcedureControllerEndpoints
  | RoleControllerEndpoints
  | UserControllerEndpoints
  | YearControllerEndpoints
  | CountryControllerEndpoints
  | DirectionControllerEndpoints
  | CoordinateXControllerEndpoints
  | CoordinateYControllerEndpoints
  | ExifKeyControllerEndpoints
  | ImageControllerEndpoints
  | ImageFetcherControllerEndpoints;
