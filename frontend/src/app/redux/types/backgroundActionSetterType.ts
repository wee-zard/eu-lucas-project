import { BackgroundConsts } from "@redux/consts/backgroundConsts";
import BackgroundReducerStateType from "./backgroundReducerStateType";

interface BackgroundActionSetterType {
  isBackdropOpen: {
    type: BackgroundConsts.SET_BACKGROUND_BACKDROP_OPEN;
    payload: BackgroundReducerStateType["isBackdropOpen"];
  };
  backdropConfig: {
    type: BackgroundConsts.SET_BACKGROUND_BACKDROP_CONFIG;
    payload: BackgroundReducerStateType["backdropConfig"];
  };
  canvasImageProperties: {
    type: BackgroundConsts.SET_BACKGROUND_CANVAS_IMAGE_PROPERTIES;
    payload: BackgroundReducerStateType["canvasImageProperties"];
  };
  canvasDataUrl: {
    type: BackgroundConsts.SET_BACKGROUND_CANVAS_DATA_URL;
    payload: BackgroundReducerStateType["canvasDataUrl"];
  };
}

export default BackgroundActionSetterType;
