import axios, { isAxiosError } from "axios";
import { BackendControllerEndpoints, BackendControllers, RootServiceEndpoints } from "../../model/enum";
import CustomAxiosResponse from "../../model/CustomAxiosResponse";

const imageServerPath = process.env.REACT_APP_USE_IMAGE_SERVER_PATH ?? "";
const backendServerPath = process.env.REACT_APP_USE_BACKEND ?? "";

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

export const getRequestBackend = (
  controller: BackendControllers,
  backendControllerEndpoint: BackendControllerEndpoints,
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