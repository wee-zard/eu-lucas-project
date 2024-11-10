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

/**
 * Stores the backend endpoints in one place.
 */
export type BackendControllerEndpointTypes =
    BackendUserControllerEndpoints;

/**
 * Stores the Lucas-image-server endpoints in one place.
 */
export type LucasImageServiceEndpointTypes =
    ImageServiceEndpoints;

/**
 * Universal type that hold the endpoints of the whole project.
 */
export type RootEndpoints =
    LucasImageServiceEndpointTypes
    | BackendControllerEndpointTypes;

/**
 * The list of servers where the api requests could be sent out to.
 */
export enum ServersToConnectTo {
    Backend,
    LucasImageServer
};

export enum LocalStorageKeys {
    GoogleOAuthToken = "google_oauth_token",
}

export enum ScreenUrls {
    DefaultScreenPath = "/",
    LoginScreenPath = "/login",
    LucasScreenPath = "/lucas",
    FilterScreenPath = "/lucas/filter",
    NotFoundScreenPath = "*",
}