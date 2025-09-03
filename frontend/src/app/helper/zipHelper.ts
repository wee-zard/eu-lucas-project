import SelectedImagesModel, { QueriedImagePropertyType } from "@model/SelectedImagesModel";
import JSZip from "jszip";
import { saveAs } from "file-saver-es";
import ImageUtils from "@helper/imageUtils";
import { downloadImagesByUrlCommand } from "@api/command/imageFetcherCommands";
import FileUtils from "@helper/fileUtils";
import FolderDtoSlice from "@model/dto/FolderDtoSlice";
import ResourceModel from "@model/types/ResourceModel";
import DateHelper from "./dateHelper";

type ZipObjType<T> = {
  imageProperty: QueriedImagePropertyType;
  srcUrl: T;
};

class ZipHelper {
  private static readonly FOLDER_PREFIX_TITLE = "lucas";

  constructor(
    private model?: SelectedImagesModel,
    private folder?: FolderDtoSlice,
    private zip = new JSZip(),
  ) {}

  /**
   * Download the provided images from the folder into a zip.
   *
   * @returns Returns true if the download of the images finished successfully, else false.
   */
  public downloadZip = async (): Promise<boolean> => {
    try {
      await this.addImagesToTheZip();
      return await this.createZip(this.getZipName());
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  public downloadBase64Strings = async (resources: ResourceModel[]): Promise<boolean> => {
    try {
      resources.forEach((resource) =>
        this.addBase64StringToZip(resource.base64, resource.filename),
      );
      return await this.createZip(this.getNormalZipName());
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /**
   * Converts the provided selected image model to remote url links that will be
   * used to fetch the images one by one with the fetch request.
   *
   * @returns Returns the list of remote image urls that might contains undefined values in a 1d matrix.
   */
  private getRemoteUrlsOfImages = (): ZipObjType<string | undefined>[] => {
    return (
      this.model?.queryImages.map((queriedImageProperty) => ({
        imageProperty: queriedImageProperty,
        srcUrl: ImageUtils.initRemoteImageUrlPath(queriedImageProperty.image),
      })) ?? []
    );
  };

  /**
   * Get the remote urls of the images while filtering them. After the filtering, undefined
   * and not real url values will be not present in the list.
   *
   * @returns Returns a 1d list that contains the url links of the images that must be downloaded.
   */
  private getFilteredRemoteUrlOfImages = (): ZipObjType<string>[] => {
    const remoteImageUrls: ZipObjType<string | undefined>[] = this.getRemoteUrlsOfImages();
    let filteredRemoteImageUrls: ZipObjType<string>[] = [];

    remoteImageUrls.forEach((url: ZipObjType<string | undefined>) => {
      if (
        !url.srcUrl ||
        filteredRemoteImageUrls
          .map((filtered) => filtered.imageProperty.image.id)
          .includes(url.imageProperty.image.id)
      ) {
        return;
      }

      filteredRemoteImageUrls = [...filteredRemoteImageUrls, url as ZipObjType<string>];
    });

    return filteredRemoteImageUrls;
  };

  /**
   * Based on the selected images, add those images to the zip file.
   */
  private addImagesToTheZip = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      const filteredRemoteImageUrls: ZipObjType<string>[] = this.getFilteredRemoteUrlOfImages();

      // Step 1.3.: Adding images to the zip (pending state)
      for await (const url of filteredRemoteImageUrls) {
        try {
          if (ImageUtils.isImageUrlStartsWithBase64JpgPrefix(url.srcUrl)) {
            const remoteUrl = ImageUtils.initRemoteImageUrlPath(url.imageProperty.image, true);
            const uniqueFileName =
              remoteUrl?.replace(`${ImageUtils.remoteUrl}/`, "").replaceAll("/", "-") ??
              `tmp${url.imageProperty.image.id}.jpg`;
            this.addBase64StringToZip(ImageUtils.removeBase64Prefix(url.srcUrl), uniqueFileName);
          } else {
            const base64String = await downloadImagesByUrlCommand(url.srcUrl);
            const uniqueFileName = url.srcUrl
              .replace(`${ImageUtils.remoteUrl}/`, "")
              .replaceAll("/", "-");
            this.addBase64StringToZip(base64String, uniqueFileName);
          }
        } catch (error) {
          reject(error);
          return;
        }
      }

      resolve();
    });
  };

  /**
   * Adds a base64string to the zip with a set filename.
   *
   * @param base64String The base64string format of the file.
   * @param filename The name of the file.
   */
  private addBase64StringToZip = (base64String: string, filename: string) => {
    const blob = FileUtils.base64ToBlob(base64String, filename);
    this.zip.file(filename, blob, { binary: true });
  };

  /**
   * After appending images to the zip, we are creating that specific zip
   * and downloading it to the user, so it can be found in their local machine.
   *
   * @param zipname The name for the newly created zip.
   * @returns Returns true if the process of creating and downloading the zip file
   * is finished successfully, else false and return with the error message.
   */
  private createZip = (zipname: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this.zip
        .generateAsync({ type: "blob" })
        .then((content) => {
          if (content) saveAs(content, zipname);
        })
        .catch(reject)
        .finally(() => {
          resolve(true);
        });
    });
  };

  private getTimestamp = (): string => {
    return DateHelper.convertISOStringToDateTimeFormat(new Date().toISOString());
  };

  /**
   * Creates a name for the zip file what the user will download.
   * The name contains a prefix name stating, the id of the folder, the title of the folder,
   * whether the folder is shared by someone, a timestamp (as this folder can be downloaded multiple times),
   * and a postfix stating the extension of the file.
   */
  private getZipName = () => {
    const folderId = this.folder?.id ? `_id-${this.folder.id}_` : "";
    const folderTitle = this.folder?.title ? `_${this.folder.title}_` : "";
    const shared = this.folder && this.folder?.isEditable !== null ? `_(Shared)_` : "";
    const postfix = `_${this.getTimestamp()}.zip`;

    return `${ZipHelper.FOLDER_PREFIX_TITLE}_${folderId}${folderTitle}${shared}${postfix}`;
  };

  private getNormalZipName = () => {
    const postfix = `_${this.getTimestamp()}.zip`;

    return `${ZipHelper.FOLDER_PREFIX_TITLE}${postfix}`;
  };
}

export default ZipHelper;
