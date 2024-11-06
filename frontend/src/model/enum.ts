export enum ImageServiceEndpoints {
    FetchImage = "/image",
    RandomImage = "/random-image",
    RandomImages = "/random-images",
}

export enum BackendControllers {
    ApiImage = "/api/image",
    ApiCountry = "api/country",
    ApiDirection = "api/direction",
}

export enum BackendImageControllerEndpoints {
    RandomImage = "/random-image",
    RandomImages = "/random-images",
}

export enum BackendYearControllerEndpoints {
    GetCreationYears = "/get-creation-year",
}

export enum BackendDirectionControllerEndpoints {
    GetCreationDirectionYears = "/get-creation-direction",
}

export type BackendControllerEndpoints =
    BackendImageControllerEndpoints
    | BackendYearControllerEndpoints
    | BackendDirectionControllerEndpoints;

export type RootServiceEndpoints =
    ImageServiceEndpoints;
