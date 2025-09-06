import { fetchImagesFromLocalServerCommand } from "@api/command/imageFetcherCommands";
import { FormGroupHelper } from "@helper/formGroupHelper";
import ImageUtils from "@helper/imageUtils";
import { openSnackbar } from "@helper/notificationUtil";
import i18n from "@i18n/i18nHandler";
import ImageDto from "@model/dto/ImageDto";
import { FormEnums } from "@model/enum";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { SnackEnum } from "@model/enum/SnackEnum";
import { SettingsFormGroup } from "@model/forms/SettingsFormControlGroup";
import LocalImageRequest from "@model/request/LocalImageRequest";
import { QueriedImageType } from "@model/SelectedImagesModel";

/**
 * Gets a new object that holds the user selected images.
 *
 * @param imageDto The image to add/remove from the list of selected images
 * @param queriedImageModel The list of user selected images
 */
export const getUpdatedQueriedImageModel = (
  imageDto: ImageDto,
  queriedImageModel: QueriedImageType | undefined,
): QueriedImageType | undefined => {
  if (!queriedImageModel) {
    return;
  }

  const filteredSelectedImages = queriedImageModel?.images.filter(
    (properties) => properties.image.id !== imageDto.id,
  );

  return {
    ...queriedImageModel,
    images:
      filteredSelectedImages.length !== queriedImageModel.images.length
        ? // Removing the image from the list of selected images
          filteredSelectedImages
        : // Adding a new image to the list of selected images
          [
            ...queriedImageModel.images,
            {
              image: imageDto,
              boundingBoxes: [],
            },
          ],
  };
};

export const handlePageableImageResponseSrcModification = (
  responseContent: ImageDto[],
): Promise<ImageDto[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Is there even one image that was fetched by the filters and the pagination?
      if (responseContent.length === 0) {
        resolve(responseContent);
        return;
      }

      // Is the local server is requested to be used?
      const helper = new FormGroupHelper<SettingsFormGroup>(
        FormEnums.SettingsForm,
        EventListenerIdEnum.SETTINGS_SCREEN,
      );
      const isLocalImageServerTurnedOn: boolean = JSON.parse(helper.get().localImageServer.data);

      if (!isLocalImageServerTurnedOn) {
        resolve(responseContent);
        return;
      }

      const localImageRequest: LocalImageRequest = { images: responseContent };
      const localImages = await fetchImagesFromLocalServerCommand(localImageRequest);
      const errorImageModels = localImages.images.filter((image) => image.isError);

      if (errorImageModels) {
        // Warning about images that was not found on the server!
        errorImageModels.forEach((errorImageModel) => {
          const imagePath = { imagePath: errorImageModel.base64String };
          openSnackbar(SnackEnum.IMAGE_SERVER_IS_TURNED_ON_BUT_NOT_FOUND, imagePath);
          console.warn(
            "[WARNING]:",
            i18n.t("screens.settings.imageServerIsTurnedOnButNotFound", {
              imagePath: errorImageModel.base64String,
            }),
          );
        });
      }

      // Update the response content, so it could contain the base64 strings.
      const res: ImageDto[] = responseContent.map((imageDto) => ({
        ...imageDto,
        base64Src: ImageUtils.appendBase64PrefixToImageSrc(
          localImages.images.find((localImage) => localImage.imageId === imageDto.id),
        ),
      }));

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
