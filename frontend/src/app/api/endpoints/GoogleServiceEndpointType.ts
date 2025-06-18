import { BaseControllerEndpoint } from "./BaseControllerEndpoint";

/**
 * Stores the Google server endpoints in one place.
 */
export class GoogleTokenEndpoint extends BaseControllerEndpoint {
  public static readonly TOKEN = `/token`;
}

export type GoogleServiceEndpointType = GoogleTokenEndpoint;
