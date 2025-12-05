import fs from 'fs';
import ImageModel from '../models/model/image.model';
import path from 'path';
import EnvironmentUtil from './environment.util';

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
      let pathToImage = '';

      if (new EnvironmentUtil().isTmpFolderInUse) {
        const files = fs.readdirSync(path.join(rootFolderPath, 'media', 'tmp'));
        const randomFilePath = files[Math.round(Math.random() * (files.length - 1))];
        pathToImage = path.join(rootFolderPath, 'media', 'tmp', randomFilePath);
      } else {
        pathToImage = path.join(rootFolderPath, pathToResource);
      }

      // Read the image file synchronously and return it.
      return fs.readFileSync(pathToImage);
    } catch (error) {
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
