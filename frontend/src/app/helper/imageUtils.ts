import ImageDto from "@model/dto/ImageDto";
import { QueriedImagePropertyType } from "@model/SelectedImagesModel";
import Base64ImageModel from "@model/types/Base64imageModel";

export default class ImageUtils {
  /**
   * The remote url of the gisco server.
   */
  public static readonly remoteUrl = "https://gisco-services.ec.europa.eu/lucas/photos";

  public static readonly base64JpgPrefix = "data:image/jpg;base64,";

  public static isImageUrlStartsWithBase64JpgPrefix = (url: string) => {
    return url.startsWith(this.base64JpgPrefix);
  };

  public static getUniqueRemoteImageName = (imageProperty: QueriedImagePropertyType) => {
    const imageName = ImageUtils.initRemoteImageUrlPath(imageProperty.image, true, true);

    if (!imageName) {
      return "image.jpg";
    }

    return imageName.replace(`${ImageUtils.remoteUrl}/`, "").replaceAll("/", "-");
  };

  public static removeBase64Prefix = (url: string) => {
    const chunks = url.split(this.base64JpgPrefix);

    if (chunks.length >= 2) {
      return chunks[1];
    }

    return url;
  };

  public static appendBase64PrefixToImageSrc = (obj?: Base64ImageModel): string | undefined => {
    return obj && !obj.isError ? `${this.base64JpgPrefix}${obj.base64String}` : undefined;
  };

  /**
   * Initializes the url path to the remote image that will be downloaded.
   *
   * @param obj The selected image object which will help to construct the url path to the remote image.
   * @returns Returns a url path to the image to download.
   */
  public static initRemoteImageUrlPath = (
    obj?: ImageDto,
    forceRemoteUrlToUse?: boolean,
    areCoordinatesHidden?: boolean,
  ) => {
    if (!obj) {
      return;
    }

    const coordinates = areCoordinatesHidden
      ? ""
      : `/${this.formatCoordinates(obj.coordinateX)}/${this.formatCoordinates(obj.coordinateY)}`;
    const remoteUrl = `${this.remoteUrl}/${obj.year}/${obj.country}${coordinates}/${obj.imageName}`;

    return !forceRemoteUrlToUse ? (obj.base64Src ?? remoteUrl) : remoteUrl;
  };

  private static formatCoordinates = (coordinate: number) => {
    const prefix = coordinate < 10 ? "00" : coordinate < 100 ? "0" : "";
    return `${prefix}${coordinate}`;
  };

  /**
   * Download an image by the provided path and calls a callback once the image
   * is fully loaded.
   *
   * @param imageUrl The path to the remote image.
   */
  public static initImageByRemoteUrlPath = (imageUrl: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      // Map sprite to pass to the canvas.
      const imageSprite = new Image();
      imageSprite.src = imageUrl;
      imageSprite.onload = () => resolve(imageSprite);
      imageSprite.onerror = (error) => reject(error);
    });
  };
}
