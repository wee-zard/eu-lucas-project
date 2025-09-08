import PlantCommand from "@api/command/plantCommands";

/**
 * @deprecated This class is deprecated and should not be used in
 * future development of the application.
 */
export default abstract class GenericCommandDispatcher {
  public static getPlantCommands = () => PlantCommand;
}
