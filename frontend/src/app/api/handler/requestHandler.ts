import axios, { isAxiosError } from "axios";
import CustomAxiosResponse from "../../model/CustomAxiosResponse";
import AuthorizationToken from "../../model/AuthorizationToken";
import { RootEndpoints, ServersToConnectTo } from "../../model/enum";

const imageServerPath = process.env.REACT_APP_USE_IMAGE_SERVER_PATH ?? "";
const backendServerPath = process.env.REACT_APP_USE_BACKEND ?? "";

/*
export const postRequest = (
  rootServiceEndpoint: RootServiceEndpoints,
  requestBody: unknown,
  callback: (axiosResponse: CustomAxiosResponse) => void
) => {
  try {
    axios.post(`${imageServerPath}${rootServiceEndpoint}`, {requestBody})
    .then((res) => callback({res: res.data}));
  } catch(err: unknown) {
    callback({err: isAxiosError(err) ? err : null});
  }
};
*/

/**
 * @param serverToUse The server we want to connect to.
 * @returns Returns the url of the server we want to connect to.
 */
const fetchServerPath = (serverToUse: ServersToConnectTo) => {
  switch (serverToUse) {
    case ServersToConnectTo.Backend:
      return backendServerPath;
    case ServersToConnectTo.LucasImageServer:
      return imageServerPath;
  }
}

/**
 * @param authtoken The auth token of the currently browsing user.
 * @returns Returns an object that hold the token in the header
 *     for the api requests.
 */
const getRequestHeader = (authtoken?: string) => {
  return authtoken 
    ? { ...(new AuthorizationToken(authtoken).getHeader()) }
    : {};
}

/**
 * @param authtoken The access token of the currently browsing user.
 */
export const postCommand = (
  serverToUse: ServersToConnectTo,
  universalEndpoint: RootEndpoints,
  obj: any,
  authtoken?: string,
) => {
  return axios.post(
    `${fetchServerPath(serverToUse)}${universalEndpoint}`, 
    obj, 
    getRequestHeader(authtoken),
  );
};

/*
export const getRequestBackend = (
  controller: BackendControllers,
  backendControllerEndpoint: BackendControllerEndpointTypes,
  requestBody: unknown,
  callback: (axiosResponse: CustomAxiosResponse) => void
) => {
  try {
    axios.get(`${backendServerPath}${controller}${backendControllerEndpoint}`)
    .then((res) => callback({res: res.data}));
  } catch(err: unknown) {
    callback({err: isAxiosError(err) ? err : null});
  }
};
*/