import { LocalStorageUtils } from "@helper/localStorageUtil";
import ImageDto from "@model/dto/ImageDto";
import { FormEnums, MenuActions } from "@model/enum";
import FilteringQueryRequest from "@model/request/FilteringQueryRequest";
import { setFilterMenuAction, setQueriedImageModel } from "@redux/actions/imageActions";
import { selectImageStorage } from "@redux/selectors/imageSelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImagesByFilters } from "@api/command/imageCommand";
import { setSettingBackdropOpen } from "@redux/actions/settingActions";
import i18n from "@i18n/i18nHandler";
import ImageAndPaginationCardRoot from "@cards/imageAndPaginationCard/ImageAndPaginationCardRoot";
import PageableProperties from "@model/PageableProperties";
import { defaultFilteringPaginationModel } from "@screens/filteringScreen/helper/FilteringHelper";
import PageableResponse from "@model/response/PageableResponse";
import { useFormGroupHelper } from "@hooks/useFormGroup";
import { SettingsFormGroup } from "@model/forms/SettingsFormControlGroup";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { fetchImagesFromLocalServerCommand } from "@api/command/imageFetcherCommands";
import LocalImageRequest from "@model/request/LocalImageRequest";
import { openSnackbar } from "@helper/notificationUtil";
import { SnackEnum } from "@model/enum/SnackEnum";
import ImageUtils from "@helper/imageUtils";

const contentTextObj = {
  emptyContentText: i18n.t("screens.filtering.empty-body"),
  nullResultContentText: i18n.t("screens.filtering.filtering-no-content"),
};

const FilteringImageAndPaginationCard = () => {
  const [pageable, setPageable] = useState<PageableProperties>(defaultFilteringPaginationModel);
  const [menuAction, setMenuAction] = useState<MenuActions>();
  const [pageableResponse, setPageableResponse] = useState<PageableResponse<ImageDto>>();
  const { queriedImageModel, filterMenuAction } = useSelector(selectImageStorage);
  const helper = useFormGroupHelper<SettingsFormGroup>(
    FormEnums.SettingsForm,
    EventListenerIdEnum.SETTINGS_SCREEN,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleFetchOfImages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuAction, pageable, filterMenuAction]);

  const handleFetchOfImages = async () => {
    if (menuAction !== MenuActions.PAGINATION_CHANGE && filterMenuAction !== MenuActions.SUBMIT) {
      return;
    }

    dispatch(setSettingBackdropOpen(true));
    const queryBuilderModel = LocalStorageUtils.getQueryBuilderModel();
    const request = new FilteringQueryRequest(queryBuilderModel);

    try {
      let response = await getImagesByFilters(request, pageable);

      if (!response) {
        return;
      }

      // Is there even one image that was fetched by the filters and the pagination?
      if (response.content.length === 0) {
        setPageableResponse(response);
        return;
      }

      // Is the local server is requested to be used?
      const isLocalImageServerTurnedOn: boolean = JSON.parse(helper.get().localImageServer.data);

      if (!isLocalImageServerTurnedOn) {
        setPageableResponse(response);
        return;
      }

      const localImageRequest: LocalImageRequest = { images: response.content };
      const localImages = await fetchImagesFromLocalServerCommand(localImageRequest);
      const errorImageModels = localImages.images.filter((image) => image.isError);

      if (errorImageModels) {
        // Warning about images that was not found on the server!
        errorImageModels.forEach((errorImageModel) => {
          openSnackbar(SnackEnum.IMAGE_SERVER_IS_TURNED_ON_BUT_NOT_FOUND, {
            imagePath: errorImageModel.base64String,
          });
          console.warn(
            "[WARNING]:",
            i18n.t("screens.settings.imageServerIsTurnedOnButNotFound", {
              imagePath: errorImageModel.base64String,
            }),
          );
        });
      }

      // Update the response content, so it could contain the base64 strings.
      const res: ImageDto[] = response.content.map((imageDto) => ({
        ...imageDto,
        base64Src: ImageUtils.appendBase64PrefixToImageSrc(
          localImages.images.find((localImage) => localImage.imageId === imageDto.id),
        ),
      }));

      setPageableResponse({
        ...response,
        content: res,
      });
    } catch (err) {
      // Nothing interesting is here.
    } finally {
      setMenuAction(undefined);
      dispatch(setFilterMenuAction(undefined));
      dispatch(setSettingBackdropOpen(false));
    }
  };

  /**
   * Triggered when the user clicks on either of the images fetched from the server.
   * The method add or removes the selected image from the list of queried image where
   * we keep the list of images what the user selected as those images what they
   * want to save in folders.
   *
   * @param imageDto The image that has been clicked.
   */
  const handleClickOnRippleImage = (imageDto: ImageDto): void => {
    if (!queriedImageModel) {
      return;
    }

    const filteredSelectedImages = queriedImageModel?.images.filter(
      (properties) => properties.image.id !== imageDto.id,
    );

    dispatch(
      setQueriedImageModel({
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
      }),
    );
  };

  return (
    <ImageAndPaginationCardRoot
      content={contentTextObj}
      pageableResponse={pageableResponse}
      setPageable={setPageable}
      setMenuAction={setMenuAction}
      handleClickOnRippleImage={handleClickOnRippleImage}
      isMenuDisabled
    />
  );
};

export default FilteringImageAndPaginationCard;
