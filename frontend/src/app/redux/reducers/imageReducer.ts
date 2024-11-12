import { UnknownAction } from 'redux'
import { ImageConsts } from '../consts/imageConsts';

interface ImageType {
  selectedImages: number[];
};

const initialState : ImageType = {
  selectedImages: [],
};

const imageReducer = (state = initialState, action: UnknownAction): ImageType => {
  switch (action.type) {
    case ImageConsts.SET_SELECTED_IMAGES:
      return {
        ...state,
        selectedImages: action.payload as number[],
      };
    default:
      return {
        ...state,
      };
  }
};

export default imageReducer;