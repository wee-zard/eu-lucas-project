import axios from "axios";
import { RootEndpoints, ServersToConnectTo } from "../../model/enum";
import PageableProperties from "@model/PageableProperties";
import { RequestHeaderHandler } from "./requestHeaderHandler";

const imageServerPath = process.env.REACT_APP_USE_IMAGE_SERVER_PATH ?? "";
const backendServerPath = process.env.REACT_APP_USE_BACKEND ?? "";

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
};

/**
 * @param authToken The access token of the currently browsing user.
 */
export const postCommand = (
  serverToUse: ServersToConnectTo,
  universalEndpoint: RootEndpoints,
  obj: any,
  authToken?: string,
  pageableProperties?: PageableProperties
) => {
  return axios.post(
    `${fetchServerPath(serverToUse)}${universalEndpoint}`,
    obj,
    RequestHeaderHandler.getRequestHeader(authToken, pageableProperties)
  );
};

/**
 * @param authToken The access token of the currently browsing user.
 */
export const getCommand = (
  serverToUse: ServersToConnectTo,
  universalEndpoint: RootEndpoints,
  params: any,
  authToken?: string
) => {
  return axios.get(`${fetchServerPath(serverToUse)}${universalEndpoint}`, {
    ...RequestHeaderHandler.getRequestHeader(authToken),
    params: !!params ? params : undefined,
  });
};
