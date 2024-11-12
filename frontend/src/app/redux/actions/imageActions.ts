import { ImageConsts } from "../consts/imageConsts";

export const setSelectedImage = (data: number[]) => {
  return {
    type: ImageConsts.SET_SELECTED_IMAGES,
    payload: data,
  };
};
