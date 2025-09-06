import SelectedImagesModel, { QueriedImagePropertyType } from "@model/SelectedImagesModel";
import JSZip from "jszip";
import { saveAs } from "file-saver-es";
import ImageUtils from "@helper/imageUtils";
import { downloadImagesByUrlCommand } from "@api/command/imageFetcherCommands";
import FileUtils from "@helper/fileUtils";
import FolderDtoSlice from "@model/dto/FolderDtoSlice";
import ResourceModel from "@model/types/ResourceModel";
import DateHelper from "./dateHelper";
import { handlePageableImageResponseSrcModification } from "@dialogs/filteringDialog/helper/FilteringHelper";
import ImageDto from "@model/dto/ImageDto";
import { ZipStageEnum } from "@model/enum/ZipStageEnum";
import i18n from "@i18n/i18nHandler";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import { SnackEnum } from "@model/enum/SnackEnum";
import { openSnackbar } from "./notificationUtil";
import { Dispatch } from "redux";
import { BackdropConfigType } from "@model/types/BackdropConfigType";
import { setSettingBackdropConfig } from "@redux/actions/settingActions";

type ZipObjType<T> = {
  imageProperty: QueriedImagePropertyType;
  srcUrl: T;
};

class ZipHelper {
  private readonly FOLDER_PREFIX_TITLE = "lucas";

  /**
   * Tells the number of images that will be downloaded at the same time
   * to put them into the zip.
   */
  private readonly MAX_IMAGE_TO_DOWNLOAD = 10;

  /**
   * The maximum size for the zip what the users could download.
   */
  private readonly MAXIMUM_RESOURCE_SIZE_IN_KB = 1900000;

  /**
   * The creation time of the zip.
   */
  private readonly timestamp = DateHelper.convertISOStringToDateTimeFormat(
    new Date().toISOString(),
  );

  /**
   * Tells how much resource has been downloaded from the server
   * and put into the zip. It's purpose is to track whether the
   * zip will be able to be downloaded or not due to the JS's memory limit.
   */
  private downloadedResourcesInKb: number = 0;

  private maximumNumberOfFilesToProcess: number = 0;

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
    private slicedImages: ImageDto[] = [],
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
  public getIsFinished(): boolean {
    return this.finishedHandler[this.stage]();
  }

  public getNumberOfProcessedFiles(): number {
    return this.index;
  }

  public getMaximumNumberOfFiles(): number {
    return this.maximumNumberOfFilesToProcess;
  }

  public getStageText(): string {
    return this.stageTextHandler[this.stage];
  }

  /**
   * Constructs a message that will be displayed under the backdrop.
   */
  private getBackdropText = (left: number, right: number, additionalText?: string) => {
    return `${left} / ${right}${additionalText ? ` (${additionalText})` : ""}`;
  };

  private handleBackdropChange(config: BackdropConfigType) {
    this.dispatch(setSettingBackdropConfig(config));
  }

  private handleZipProcessInspector(): void {
    const interval = setInterval(() => {
      this.handleBackdropChange({
        isBackdropOpen: true,
        loadingText: this.getBackdropText(
          this.getNumberOfProcessedFiles(),
          this.getMaximumNumberOfFiles(),
          this.getStageText(),
        ),
        progress: (this.getNumberOfProcessedFiles() * 100.0) / this.getMaximumNumberOfFiles(),
      });

      if (this.getIsFinished()) {
        this.handleBackdropChange({ isBackdropOpen: false });
        clearInterval(interval);
      }
    }, 200);
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

    this.maximumNumberOfFilesToProcess = this.model.queryImages.length;
    this.handleZipProcessInspector();

    try {
      for await (let tmpIndex of this.getArrayOfIndexesToIterate()) {
        // New Stage: Adding images to the zip to download them.
        this.stage = ZipStageEnum.ADDING_RESOURCES_TO_ZIP;
        this.index = tmpIndex;
        const slicedImages = this.getSlicedImageListByIndex().map((property) => property.image);

        if (slicedImages.length === 0) {
          return;
        }

        this.slicedImages = await handlePageableImageResponseSrcModification(slicedImages);

        // Increase the downloaded resource number
        this.downloadedResourcesInKb += this.slicedImages
          .map((imageDto) => imageDto.base64Src)
          .filter((base64Src) => base64Src !== undefined)
          .map((base64Src) => Math.ceil(base64Src.length / 1024))
          .reduce((previous, current) => previous + current);

        await this.addImagesToTheZip();

        if (this.downloadedResourcesInKb >= this.MAXIMUM_RESOURCE_SIZE_IN_KB) {
          await this.handleCreationOfZip();
        }
      }

      // New Stage: The zip has been successfully downloaded
      this.index = this.model.queryImages.length;
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
    this.maximumNumberOfFilesToProcess = resources.length;
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

    const lengthPerLoop = Math.floor(this.model.queryImages.length / this.MAX_IMAGE_TO_DOWNLOAD);
    return new Array(lengthPerLoop + 1)
      .fill(0)
      .map((_, index) => index * this.MAX_IMAGE_TO_DOWNLOAD);
  }

  private getSlicedImageListByIndex = () => {
    if (!this.model) {
      return [];
    }

    return this.model.queryImages.slice(this.index, this.index + this.MAX_IMAGE_TO_DOWNLOAD);
  };

  /**
   * Converts the provided selected image model to remote url links that will be
   * used to fetch the images one by one with the fetch request.
   *
   * @returns Returns the list of remote image urls that might contains undefined values in a 1d matrix.
   */
  private getRemoteUrlsOfImages = (): ZipObjType<string | undefined>[] => {
    return (
      this.getSlicedImageListByIndex().map((queriedImageProperty) => ({
        imageProperty: queriedImageProperty,
        srcUrl: ImageUtils.initRemoteImageUrlPath(
          this.slicedImages.find((image) => image.id === queriedImageProperty.image.id),
        ),
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
    const folderId = this.folder?.id ? `_id-${this.folder.id}_` : "";
    const folderTitle = this.folder?.title ? `_${this.folder.title}_` : "";
    const shared = this.folder && this.folder?.isEditable !== null ? `_(Shared)_` : "";
    const postfix = `_${this.timestamp}.zip`;

    return `${this.FOLDER_PREFIX_TITLE}_${folderId}${folderTitle}${shared}${postfix}`;
  };

  private getNormalZipName = () => {
    const postfix = `_${this.timestamp}.zip`;

    return `${this.FOLDER_PREFIX_TITLE}${postfix}`;
  };
}

export default ZipHelper;
