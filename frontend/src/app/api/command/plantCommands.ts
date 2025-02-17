import commandHandler from "@api/handler/requestHandler";
import PlantDto from "@model/dto/PlantDto";
import {
  BackendPlantControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";

/**
 * Fetches the list of plants from the server.
 *
 * @returns Returns a list of {@link PlantDto} if the request is successful.
 */
export const getPlantList = async () => {
  return commandHandler<PlantDto[]>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendPlantControllerEndpoints.GetPlants,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
    },
    errorMessage: "Váratlan hiba történt az növények lekérdezése során!",
  });
};
