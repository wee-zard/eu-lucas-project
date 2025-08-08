import commandHandler from "@api/handler/requestHandler";
import PlantSpeciesDto from "@model/dto/PlantSpeciesDto";
import {
  BackendPlantSpeciesControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";

/**
 * Fetches the list of plant species from the server.
 *
 * @returns Returns a list of {@link PlantSpeciesDto} if the request is successful.
 */
export const getPlantSpeciesList = async () => {
  return commandHandler<PlantSpeciesDto[]>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendPlantSpeciesControllerEndpoints.GetPlantSpecies,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
    },
  });
};
