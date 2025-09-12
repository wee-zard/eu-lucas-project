import SelectedImagesModel, { QueriedImagePropertyType } from "@model/SelectedImagesModel";
import JSZip from "jszip";
import { saveAs } from "file-saver-es";
import ImageUtils from "@helper/imageUtils";
import FileUtils from "@helper/fileUtils";
import FolderDtoSlice from "@model/dto/FolderDtoSlice";
import ResourceModel from "@model/types/ResourceModel";
import { handlePageableImageResponseSrcModification } from "@dialogs/filteringDialog/helper/FilteringHelper";
import { ZipStageEnum } from "@model/enum/ZipStageEnum";
import i18n from "@i18n/i18nHandler";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import { SnackEnum } from "@model/enum/SnackEnum";
import { openSnackbar } from "./notificationUtil";
import { Dispatch } from "redux";
import { BackdropConfigType } from "@model/types/BackdropConfigType";
import {
  setBackgroundBackdropConfig,
  setBackgroundCanvasImageProperties,
} from "@redux/actions/backgroundActions";
import {
  getImageCanvasDataUrl,
  UNIQUE_ID_OF_BACKGROUND_CANVAS_CARD,
} from "@cards/imageCanvas/helper/imageCanvasHelper";
import { getFolderContentByFolderIdCommand } from "@api/command/folderContentCommands";
import PageableProperties from "@model/PageableProperties";

type ZipObjType<T> = {
  imageProperty: QueriedImagePropertyType;
  srcUrl: T;
};

class ZipHelper {
  private readonly FOLDER_PREFIX_TITLE = "[Lucas]";

  /**
   * Tells the number of images that will be downloaded at the same time
   * to put them into the zip. Like in a pagination we could set the pageSize and
   * the pageNo, this is similar to the pageSize, where we set how much
   * record could be present on the page at the same time.
   */
  private readonly PAGE_SIZE = 10;

  /**
   * The maximum size for the zip what the users could download.
   */
  private readonly MAXIMUM_RESOURCE_SIZE_IN_KB = 1900000;

  /**
   * Tells how much resource has been downloaded from the server
   * and put into the zip. It's purpose is to track whether the
   * zip will be able to be downloaded or not due to the JS's memory limit.
   */
  private downloadedResourcesInKb: number = 0;

  private numberOfFilesToProcess: number = 0;

  private numberOfProcessedFiles: number = 0;

  private readonly finishedHandler: GenericHandlerType<ZipStageEnum, () => boolean> = {
    [ZipStageEnum.ADDING_RESOURCES_TO_ZIP]: () => false,
    [ZipStageEnum.DOWNLOADING_ZIP]: () => false,
    [ZipStageEnum.UNDEFINED]: () => false,
    [ZipStageEnum.FAILED]: () => {
      openSnackbar(SnackEnum.ERROR_WHILE_DOWNLOADING_ZIP);
      return true;
    },
    [ZipStageEnum.SUCCESS]: () => {
      openSnackbar(SnackEnum.ZIP_DOWNLOADED);
      return true;
    },
  };

  private readonly stageTextHandler: GenericHandlerType<ZipStageEnum, string> = {
    [ZipStageEnum.ADDING_RESOURCES_TO_ZIP]: i18n.t("helpers.zip.addImagesToZip"),
    [ZipStageEnum.DOWNLOADING_ZIP]: i18n.t("helpers.zip.downloadZip"),
    [ZipStageEnum.FAILED]: "",
    [ZipStageEnum.SUCCESS]: "",
    [ZipStageEnum.UNDEFINED]: "",
  };

  constructor(
    private dispatch: Dispatch,
    private model?: SelectedImagesModel,
    private folder?: FolderDtoSlice,
    private pagedImages: QueriedImagePropertyType[] = [],
    private index: number = 0,

    /**
     * The object that will holds the images and will be downloaded
     * by the users.
     */
    private zip: JSZip = this.initialNewZipInstance(),

    /**
     * Determines that at what stage the zip's process is currently in.
     */
    private stage: ZipStageEnum = ZipStageEnum.UNDEFINED,
  ) {
    this.handleBackdropChange({ isBackdropOpen: true });
  }

  /**
   * Determines whether the zip's process has been finished or not.
   *
   * @returns Returns true if the process has been finished, else false.
   * True means, that the zip is downloaded or error was thrown.
   */
  private getIsFinished(): boolean {
    return this.finishedHandler[this.stage]();
  }

  /**
   * Constructs a message that will be displayed under the backdrop.
   */
  private getBackdropText = (left: number, right: number, additionalText?: string) => {
    return `${left} / ${right}${additionalText ? ` (${additionalText})` : ""}`;
  };

  private handleBackdropChange(config: BackdropConfigType) {
    this.dispatch(setBackgroundBackdropConfig(config));
  }

  /**
   * Inspects the zip and awaits the different stages of the zip,
   * meaning that this method is running in a interval method, that will check
   * after a prefixed amount of them whether the zip has been finished or not.
   * Based on the result of the zip, displays a corresponding toast message,
   * and close down the whole zip by removing the backdrop.
   */
  private handleZipProcessInspector(): void {
    const interval = setInterval(() => {
      this.handleBackdropChange({
        isBackdropOpen: true,
        loadingText: this.getBackdropText(
          this.numberOfProcessedFiles,
          this.numberOfFilesToProcess,
          this.stageTextHandler[this.stage],
        ),
        progress: (this.numberOfProcessedFiles * 100.0) / this.numberOfFilesToProcess,
      });

      if (this.getIsFinished()) {
        this.handleBackdropChange({ isBackdropOpen: false });
        clearInterval(interval);
      }
    }, 100);
  }

  /**
   * Download the provided images from the folder into a zip.
   *
   * @returns Returns true if the download of the images finished successfully, else false.
   */
  public downloadZip = async (): Promise<void> => {
    if (!this.model) {
      this.stage = ZipStageEnum.FAILED;
      return;
    }

    console.log("folder:", this.folder);

    this.numberOfFilesToProcess = this.folder?.folderContentSize ?? this.model.queryImages.length;

    // Starts the inspector, so the users could see the loading progress.
    this.handleZipProcessInspector();

    try {
      for await (this.index of this.getArrayOfIndexesToIterate()) {
        // New Stage: Adding images to the zip to download them.
        this.stage = ZipStageEnum.ADDING_RESOURCES_TO_ZIP;
        const pagedImages = await this.getPagedImages();

        if (pagedImages.length === 0) {
          return;
        }

        this.pagedImages = await handlePageableImageResponseSrcModification(pagedImages);
        await this.addImagesToTheZip();

        if (this.downloadedResourcesInKb >= this.MAXIMUM_RESOURCE_SIZE_IN_KB) {
          await this.handleCreationOfZip();
        }
      }

      // New Stage: The zip has been successfully downloaded
      this.index = this.numberOfFilesToProcess;
      await this.handleCreationOfZip();
      this.stage = ZipStageEnum.SUCCESS;
    } catch (error) {
      if (error instanceof RangeError && error.message === "Array buffer allocation failed") {
        // TODO: Reduce the MAXIMUM_RESOURCE_SIZE_IN_KB's value by 33% and call the download zip method.
      }
      this.stage = ZipStageEnum.FAILED;
      console.log(error);
    }
  };

  public downloadBase64Strings = async (resources: ResourceModel[]): Promise<boolean> => {
    this.numberOfFilesToProcess = resources.length;
    this.handleZipProcessInspector();

    try {
      resources.forEach((resource) => {
        this.addBase64StringToZip(resource.base64, resource.filename);
        this.index++;
      });
      return await this.createZip(this.getNormalZipName());
    } catch (error) {
      console.error("downloadBase64Strings", error);
      return false;
    }
  };

  /**
   * Creates an empty object that could holds the images that
   * should be downloaded.
   *
   * @returns Returns a new {@link JSZip} instance.
   */
  private initialNewZipInstance(): JSZip {
    this.downloadedResourcesInKb = 0;
    return new JSZip();
  }

  private handleCreationOfZip = async (): Promise<void> => {
    // New Stage: Downloading the zip.
    this.stage = ZipStageEnum.DOWNLOADING_ZIP;
    await this.createZip(this.getZipName());

    // Clear out the zip and replace it with an empty one
    this.zip = this.initialNewZipInstance();
  };

  private getArrayOfIndexesToIterate(): number[] {
    if (!this.model) {
      this.stage = ZipStageEnum.FAILED;
      return [];
    }

    const lengthPerLoop = Math.floor(this.numberOfFilesToProcess / this.PAGE_SIZE);
    return new Array(lengthPerLoop + 1).fill(0).map((_, index) => index * this.PAGE_SIZE);
  }

  private getPagedImages = (): Promise<QueriedImagePropertyType[]> => {
    return new Promise<QueriedImagePropertyType[]>((resolve) => {
      if (!this.folder) {
        // As a folder is not present, then slice out the object from the local environment.
        return resolve(
          !this.model ? [] : this.model.queryImages.slice(this.index, this.index + this.PAGE_SIZE),
        );
      } else {
        // If a folder was provided, then fetch the paged images from the folder itself.
        const pageable = new PageableProperties(this.index, this.PAGE_SIZE);
        getFolderContentByFolderIdCommand(this.folder.id, pageable)
          .then((res) => {
            resolve(res.content);
          })
          .catch(() => {
            resolve([]);
          });
      }
    });
  };

  /**
   * Converts the provided selected image model to remote url links that will be
   * used to fetch the images one by one with the fetch request.
   *
   * @returns Returns the list of remote image urls that might contains undefined values in a 1d matrix.
   */
  private getRemoteUrlsOfImages = (): ZipObjType<string | undefined>[] => {
    return (
      this.pagedImages.map((queriedImageProperty) => ({
        imageProperty: queriedImageProperty,
        srcUrl: ImageUtils.initRemoteImageUrlPath(
          this.pagedImages.find((model) => model.image.id === queriedImageProperty.image.id)?.image,
        ),
      })) ?? []
    );
  };

  private updateDownloadedResourcesInKb = (dataUrl: string): void => {
    // Increase the downloaded resource number
    this.downloadedResourcesInKb += Math.ceil(dataUrl.length / 1024);
  };

  private getImageCanvasDataUrl = async (url: ZipObjType<string | undefined>) => {
    // Give back a data url that contains the bounding boxes alongside the image.
    this.dispatch(setBackgroundCanvasImageProperties(url.imageProperty));
    const dataUrl = await getImageCanvasDataUrl(
      url.imageProperty,
      UNIQUE_ID_OF_BACKGROUND_CANVAS_CARD,
    );
    this.dispatch(setBackgroundCanvasImageProperties(undefined));
    return dataUrl;
  };

  /**
   * Based on the selected images, add those images to the zip file.
   */
  private addImagesToTheZip = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      // Step 1.3.: Adding images to the zip (pending state)
      for await (let url of this.getRemoteUrlsOfImages()) {
        try {
          if (url.srcUrl && ImageUtils.isImageUrlStartsWithBase64JpgPrefix(url.srcUrl)) {
            const dataUrl = await this.getImageCanvasDataUrl({
              ...url,
              imageProperty: {
                ...url.imageProperty,
                image: {
                  ...url.imageProperty.image,
                  base64Src: url.srcUrl,
                },
              },
            });

            // Increase the downloaded resource number
            this.updateDownloadedResourcesInKb(dataUrl);

            const remoteUrl = ImageUtils.initRemoteImageUrlPath(url.imageProperty.image, true);
            const uniqueFileName =
              remoteUrl?.replace(`${ImageUtils.remoteUrl}/`, "").replaceAll("/", "-") ??
              `tmp${url.imageProperty.image.id}.jpg`;
            this.addBase64StringToZip(ImageUtils.removeBase64Prefix(dataUrl), uniqueFileName);
          } else {
            const remoteUrl = ImageUtils.initRemoteImageUrlPath(url.imageProperty.image, true);

            if (!remoteUrl) {
              return;
            }

            const dataUrl = await this.getImageCanvasDataUrl(url);

            // Increase the downloaded resource number
            this.updateDownloadedResourcesInKb(dataUrl);

            const uniqueFileName = remoteUrl
              .replace(`${ImageUtils.remoteUrl}/`, "")
              .replaceAll("/", "-");
            this.addBase64StringToZip(dataUrl, uniqueFileName);
          }

          // Increasing the number of processed files counter.
          this.numberOfProcessedFiles++;
        } catch (error) {
          console.error("addImagesToTheZip", error);
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

  /**
   * Creates a name for the zip file what the user will download.
   * The name contains a prefix name stating, the id of the folder, the title of the folder,
   * whether the folder is shared by someone, a timestamp (as this folder can be downloaded multiple times),
   * and a postfix stating the extension of the file.
   */
  private getZipName = () => {
    const folderId = this.folder?.id ? `_id${this.folder.id}` : "";
    const folderTitle = this.folder?.title ? `_${this.folder.title}` : "";
    const shared = this.folder && this.folder?.isEditable !== null ? `_(Shared)` : "";

    return `${this.FOLDER_PREFIX_TITLE}${folderId}${folderTitle}${shared}.zip`;
  };

  private getNormalZipName = () => {
    return `${this.FOLDER_PREFIX_TITLE}.zip`;
  };
}

export default ZipHelper;
