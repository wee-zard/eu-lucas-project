import CoordinateXDto from "../../model/dto/CoordinateXDto";
import {
  BackendCoordinateXControllerEndpoints,
  ServersToConnectTo,
} from "../../model/enum";
import { getAuthToken } from "../handler/requestAuthToken";
import { getCommand } from "../handler/requestHandler";
import { handleErrorMessageFromAxiosResponse, handleErrorMessageFromCatchBranch } from "./common/displayCommandError";

export const getCoordinateXList = async () => {
  try {
    const authToken = getAuthToken();
    if (!authToken) {
      return null;
    }
    const response = await getCommand(
      ServersToConnectTo.Backend,
      BackendCoordinateXControllerEndpoints.GetCoordinateXList,
      {},
      authToken
    );
    if (handleErrorMessageFromAxiosResponse(response)) {
      return null;
    }
    const responseList: CoordinateXDto[] = response.data;
    return responseList;
  } catch (error) {
    handleErrorMessageFromCatchBranch(
      "Error while executing the fetch of x coordinates!"
    );
    return null;
  }
};
