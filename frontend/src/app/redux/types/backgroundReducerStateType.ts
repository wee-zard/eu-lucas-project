import { QueriedImagePropertyType } from "@model/SelectedImagesModel";
import { BackdropConfigType } from "@model/types/BackdropConfigType";

interface BackgroundReducerStateType {
  isBackdropOpen: boolean;
  backdropConfig: BackdropConfigType;
  canvasImageProperties?: QueriedImagePropertyType;
  canvasDataUrl?: string;
}

export default BackgroundReducerStateType;
