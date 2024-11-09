import { BackendControllers, BackendImageControllerEndpoints, ImageServiceEndpoints } from "../../model/enum";
import ImageModel from "../../model/ImageModel";
import ImageRequest from "../../model/ImageRequest";
import { getRequestBackend, postRequest } from "../handler/requestHandler";

export const fetchImage = (
  imageRequest: ImageRequest[],
  callback: (data: string[]) => void
) => {
  postRequest(ImageServiceEndpoints.FetchImage, imageRequest, (response) => {
    if (response && response.err) {
      /** TODO: Make a custom alert message. */
      alert(response.err);
    } else if (response.res){
      const data: string[] = response.res;
      callback(data);
    }
  });
};

export const getRandomImage = (
    callback: (data: ImageModel) => void
  ) => {
    getRequestBackend(BackendControllers.ApiImage, BackendImageControllerEndpoints.RandomImage, {}, 
    (response) => {
      if (response && response.err) {
        /** TODO: Make a custom alert message. */
        alert(response.err);
      } else if (response.res && response.res instanceof ImageModel){
        callback(response.res);
      }
    });
  };

  export const getRandomImages = (
    callback: (data: ImageModel[]) => void
  ) => {
    getRequestBackend(BackendControllers.ApiImage, BackendImageControllerEndpoints.RandomImages, {}, 
    (response) => {
      if (response && response.err) {
        /** TODO: Make a custom alert message. */
        alert(response.err);
      } else if (response.res){
        const data: ImageModel[] = response.res;
        callback(data);
      }
    });
  };