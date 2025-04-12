import ImageDto from "@model/dto/ImageDto";

export default class ImageUtils {
  /**
   * Initializes the url path to the remote image that will be downloaded.
   *
   * @param obj The selected image object which will help to construct the url path to the remote image.
   * @returns Returns a url path to the image to download.
   */
  public static initRemoteImageUrlPath = (obj?: ImageDto) => {
    if (!obj) {
      return;
    }

    const remoteUrl = "https://gisco-services.ec.europa.eu/lucas/photos";
    const x = this.formatCoordinates(obj.coordinateX);
    const y = this.formatCoordinates(obj.coordinateY);

    return `${remoteUrl}/${obj.year}/${obj.country}/${x}/${y}/${obj.imageName}`;
  };

  private static formatCoordinates = (coordinate: number) => {
    return coordinate < 10 ? `00${coordinate}` : coordinate < 100 ? `0${coordinate}` : coordinate;
  };

  /**
   * Download an image by the provided path, and calls a callback once the image
   * is fully loaded.
   * @param path The path to the remote image.
   */
  public static initImageByRemoteUrlPath = (imageUrl: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      // Map sprite to pass to the canvas.
      let imageSprite = new Image();
      imageSprite.src = imageUrl;
      imageSprite.onload = () => resolve(imageSprite);
      imageSprite.onerror = () => reject();
    });
  };
}
