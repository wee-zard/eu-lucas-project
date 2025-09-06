export enum ZipStageEnum {
  /**
   * No process has been started yet.
   */
  UNDEFINED,
  /**
   * Manually adding images to the zip.
   */
  ADDING_RESOURCES_TO_ZIP,
  /**
   * Images have been added to the zip,
   * now it's time to allocate enough memory for the
   * zip to download the all the images (it may take a while).
   */
  DOWNLOADING_ZIP,
  /**
   * Unexpected error has occurred.
   */
  FAILED,
  /**
   * The zip has been downloaded successfully.
   */
  SUCCESS,
}
