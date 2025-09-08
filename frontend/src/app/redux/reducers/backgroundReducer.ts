import { BackgroundConsts } from "@redux/consts/backgroundConsts";
import BackgroundActionTypes from "@redux/types/backgroundActionTypes";
import BackgroundReducerStateType from "@redux/types/backgroundReducerStateType";

const initialState: BackgroundReducerStateType = {
  isBackdropOpen: false,
  backdropConfig: {
    isBackdropOpen: false,
  },
  canvasImageProperties: undefined,
  canvasDataUrl: undefined,
};

const backgroundReducer = (
  state = initialState,
  action: BackgroundActionTypes,
): BackgroundReducerStateType => {
  switch (action.type) {
    case BackgroundConsts.SET_BACKGROUND_BACKDROP_OPEN:
      return {
        ...state,
        isBackdropOpen: action.payload,
      };
    case BackgroundConsts.SET_BACKGROUND_BACKDROP_CONFIG:
      return {
        ...state,
        backdropConfig: action.payload,
      };
    case BackgroundConsts.SET_BACKGROUND_CANVAS_DATA_URL:
      return {
        ...state,
        canvasDataUrl: action.payload,
      };
    case BackgroundConsts.SET_BACKGROUND_CANVAS_IMAGE_PROPERTIES:
      return {
        ...state,
        canvasImageProperties: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default backgroundReducer;
