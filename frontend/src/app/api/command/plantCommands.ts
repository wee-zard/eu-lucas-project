import commandHandler from "@api/handler/requestHandler";
import i18n from "@i18n/i18nHandler";
import PlantDto from "@model/dto/PlantDto";
import {
  BackendPlantControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";

export default abstract class PlantCommand {
  /**
   * Fetches the list of plants from the server.
   *
   * @returns Returns a list of {@link PlantDto} if the request is successful.
   */
  public static getPlants = (): Promise<PlantDto[] | null> =>
    commandHandler<PlantDto[]>({
      type: RequestCommandTypes.GET,
      server: ServersToConnectTo.Backend,
      endpoint: BackendPlantControllerEndpoints.GetPlants,
      obj: {},
      header: {
        isAuthTokenMandatory: true,
      },
      errorMessage: i18n.t("api.commands.plant.getPlants"),
    });
}
