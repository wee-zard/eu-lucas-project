import { BackgroundConsts } from "@redux/consts/backgroundConsts";
import BackgroundActionSetterType from "@redux/types/backgroundActionSetterType";
import BackgroundReducerStateType from "@redux/types/backgroundReducerStateType";

export const setBackgroundBackdropOpen = (
  data: BackgroundReducerStateType["isBackdropOpen"],
): BackgroundActionSetterType["isBackdropOpen"] => ({
  type: BackgroundConsts.SET_BACKGROUND_BACKDROP_OPEN,
  payload: data,
});

export const setBackgroundBackdropConfig = (
  data: BackgroundReducerStateType["backdropConfig"],
): BackgroundActionSetterType["backdropConfig"] => ({
  type: BackgroundConsts.SET_BACKGROUND_BACKDROP_CONFIG,
  payload: data,
});

export const setBackgroundCanvasDataUrl = (
  data: BackgroundReducerStateType["canvasDataUrl"],
): BackgroundActionSetterType["canvasDataUrl"] => ({
  type: BackgroundConsts.SET_BACKGROUND_CANVAS_DATA_URL,
  payload: data,
});

export const setBackgroundCanvasImageProperties = (
  data: BackgroundReducerStateType["canvasImageProperties"],
): BackgroundActionSetterType["canvasImageProperties"] => ({
  type: BackgroundConsts.SET_BACKGROUND_CANVAS_IMAGE_PROPERTIES,
  payload: data,
});
