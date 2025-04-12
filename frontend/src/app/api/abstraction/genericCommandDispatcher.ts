import ImageCommands from "@api/command/imageCommand";
import PlantCommand from "@api/command/plantCommands";

export default abstract class GenericCommandDispatcher {
  public static getImageCommands = () => ImageCommands;
  public static getPlantCommands = () => PlantCommand;
}
