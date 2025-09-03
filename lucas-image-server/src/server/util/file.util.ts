import fs from 'fs';
import ImageModel from '../models/model/image.model';
import path from 'path';

abstract class FileUtil {
  /**
   * Returns true if the path exists, false otherwise.
   *
   * @param pathToResource
   * @returns Returns true if the path exists, false otherwise.
   */
  public static isExists(pathToResource: string): boolean {
    return fs.existsSync(pathToResource);
  }

  public static readFileAtPath(pathToResource: string): NonSharedBuffer {
    try {
      const rootFolderPath = path.resolve(__dirname, '../../../');

      // TODO: Remove from production code.
      var files = fs.readdirSync(path.join(rootFolderPath, 'media', 'tmp'));
      const pathToImage = path.join(
        rootFolderPath,
        'media',
        'tmp',
        files[Math.round(Math.random() * (files.length - 1))]
      );

      //const pathToImage = path.join(rootFolderPath, pathToResource);

      // Read the image file synchronously
      const imageBuffer = fs.readFileSync(pathToImage);

      return imageBuffer;
    } catch (error) {
      console.error('Error reading file:', error);
      throw error;
    }
  }

  public static convertBufferToBase64(imageBuffer: NonSharedBuffer): string {
    return imageBuffer.toString('base64');
  }

  /**
   * Initializes the url path to the remote image that will be downloaded.
   *
   * @param obj The selected image object which will help to construct the url path to the remote image.
   * @returns Returns a url path to the image to download.
   */
  public static initPathToLocalImage = (obj: ImageModel) => {
    const x = this.formatCoordinates(obj.coordinateX);
    const y = this.formatCoordinates(obj.coordinateY);

    return `media/${obj.year}/${obj.country}/${x}/${y}/${obj.imageName}`;
  };

  private static formatCoordinates = (coordinate: number) => {
    return coordinate < 10 ? `00${coordinate}` : coordinate < 100 ? `0${coordinate}` : coordinate;
  };
}

export default FileUtil;
