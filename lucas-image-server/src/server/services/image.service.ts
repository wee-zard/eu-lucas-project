import Base64ImageModel from '../models/model/base64image.model';
import ImageModel from '../models/model/image.model';

export default interface ImageService {
  /**
   * Reads an image from the local drive. Based on the provided params,
   * the method constructs a link to the image to load.
   *
   * @returns Returns a base64string format of the requested image to
   * be loaded from the local drive.
   */
  getImagesByRequestParams(images: ImageModel[]): Base64ImageModel[];
}
