import SelectedImagesModel from "@model/SelectedImagesModel";
import JSZip from "jszip";
import { saveAs } from "file-saver-es";
import ImageUtils from "@helper/imageUtils";
import ImageFetcherCommands from "@api/command/imageFetcherCommands";
import FileUtils from "@helper/fileUtils";
import FolderDtoSlice from "@model/dto/FolderDtoSlice";

class ZipHelper {
  private static readonly FOLDER_PREFIX_TITLE = "lucas";

  constructor(
    private model: SelectedImagesModel,
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
      return await this.createZip();
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
  private getRemoteUrlsOfImages = (): (string | undefined)[] => {
    return this.model.queryImages.map((queriedImageProperty) =>
      ImageUtils.initRemoteImageUrlPath(queriedImageProperty.image),
    );
  };

  /**
   * Get the remote urls of the images while filtering them. After the filtering, undefined
   * and not real url values will be not present in the list.
   *
   * @returns Returns a 1d list that contains the url links of the images that must be downloaded.
   */
  private getFilteredRemoteUrlOfImages = (): string[] => {
    const remoteImageUrls = this.getRemoteUrlsOfImages();
    let filteredRemoteImageUrls: string[] = [];

    remoteImageUrls.forEach((url) => {
      if (!url || filteredRemoteImageUrls.includes(url)) {
        return;
      }

      filteredRemoteImageUrls = [...filteredRemoteImageUrls, url];
    });

    return filteredRemoteImageUrls;
  };

  /**
   * Based on the selected images, add those images to the zip file.
   */
  private addImagesToTheZip = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      const filteredRemoteImageUrls = this.getFilteredRemoteUrlOfImages();

      // Step 1.3.: Adding images to the zip (pending state)
      for await (const url of filteredRemoteImageUrls) {
        try {
          const base64String = await ImageFetcherCommands.downloadImagesByUrl(url);
          const blob = FileUtils.base64ToBlob(base64String);
          const uniqueFileName = url.replace(`${ImageUtils.remoteUrl}/`, "").replaceAll("/", "-");
          this.zip.file(uniqueFileName, blob, { binary: true });
        } catch (error) {
          reject(error);
          return;
        }
      }

      resolve();
    });
  };

  /**
   * After appending images to the zip, we are creating that specific zip
   * and downloading it to the user, so it can be found in their local machine.
   *
   * @returns Returns true if the process of creating and downloading the zip file
   * is finished successfully, else false and return with the error message.
   */
  private createZip = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this.zip
        .generateAsync({ type: "blob" })
        .then((content) => {
          if (content) saveAs(content, this.getZipName());
        })
        .catch(reject)
        .finally(() => {
          resolve(true);
        });
    });
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
    const shared = this.folder?.isEditable !== null ? `_(Shared)_` : "";
    const timestamp = new Date(Date.now()).toISOString();
    const postfix = `_${timestamp}.zip`;

    return `${ZipHelper.FOLDER_PREFIX_TITLE}_${folderId}${folderTitle}${shared}${postfix}`;
  };
}

export default ZipHelper;
