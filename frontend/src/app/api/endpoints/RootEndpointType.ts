import { BackendControllerEndpointType } from "./apiCommandEndpoints";
import { GoogleServiceEndpointType } from "./GoogleServiceEndpointType";

/**
 * Universal type that hold the endpoints of the whole project.
 */
export type RootEndpoints = BackendControllerEndpointType | GoogleServiceEndpointType;
