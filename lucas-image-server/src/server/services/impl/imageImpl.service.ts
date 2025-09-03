import Base64ImageModel from '../../models/model/base64image.model';
import ImageModel from '../../models/model/image.model';
import FileUtil from '../../util/file.util';
import ImageService from '../image.service';

export default class ImageServiceImpl implements ImageService {
  /**
   * @inheritdoc
   */
  getImagesByRequestParams(images: ImageModel[]): Base64ImageModel[] {
    const result: Base64ImageModel[] = images.map((image) => {
      const imagePath = FileUtil.initPathToLocalImage(image);

      try {
        const buffer = FileUtil.readFileAtPath(imagePath);
        const base64String = FileUtil.convertBufferToBase64(buffer);

        return {
          imageId: image.id,
          base64String: base64String,
        };
      } catch (error) {
        return {
          imageId: image.id,
          base64String: `[HIBA] A kép a következő útvonalon nem található! Kérjük ellenőrizze, hogy a megadott útvonalon valóban megtalálható-e keresett kép: [${imagePath}]`,
          isError: true,
        };
      }
    });

    return result;
  }
}
