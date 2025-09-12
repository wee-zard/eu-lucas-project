import ImageDto from "@model/dto/ImageDto";
import { MenuActions } from "@model/enum";
import {
  setFilteringResponse,
  setFilterMenuAction,
  setQueriedImageModel,
} from "@redux/actions/imageActions";
import {
  selectFilteringPageableResponse,
  selectImageStorage,
} from "@redux/selectors/imageSelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBackgroundBackdropOpen } from "@redux/actions/backgroundActions";
import i18n from "@i18n/i18nHandler";
import ImageAndPaginationCardRoot from "@cards/imageAndPaginationCard/ImageAndPaginationCardRoot";
import PageableProperties from "@model/PageableProperties";
import { defaultPaginationModel } from "@screens/filteringScreen/helper/FilteringHelper";
import PageableResponse from "@model/response/PageableResponse";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { getUpdatedQueriedImageModel } from "./helper/FilteringHelper";
import EventListenerType from "@model/types/EventListenerType";
import { getImagesByFilters } from "@api/command/imageCommand";
import { QueriedImagePropertyType } from "@model/SelectedImagesModel";

const contentTextObj = {
  emptyContentText: i18n.t("screens.filtering.empty-body"),
  nullResultContentText: i18n.t("screens.filtering.filtering-no-content"),
};

const FilteringImageAndPaginationCard = () => {
  const [pageable, setPageable] = useState<PageableProperties>(defaultPaginationModel);
  const [menuAction, setMenuAction] = useState<MenuActions>();
  const pageableResponse = useSelector(selectFilteringPageableResponse);
  const { queriedImageModel, filterMenuAction } = useSelector(selectImageStorage);
  const event: EventListenerType = {
    key: EventListenerIdEnum.FILTERING_IMAGE_TABLE,
  };
  const response: PageableResponse<QueriedImagePropertyType> | undefined = pageableResponse
    ? {
        ...pageableResponse,
        content: [
          ...pageableResponse.content.map((imageDto) => ({
            image: imageDto,
            logs: [],
          })),
        ],
      }
    : undefined;
  const dispatch = useDispatch();

  useEffect(() => {
    handleFetchOfImages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuAction, pageable, filterMenuAction]);

  const handleFetchOfImages = async () => {
    if (menuAction !== MenuActions.PAGINATION_CHANGE && filterMenuAction !== MenuActions.SUBMIT) {
      return;
    }

    try {
      dispatch(setBackgroundBackdropOpen(true));
      handlePageableChange(await getImagesByFilters(pageable));
    } catch (err) {
      // Nothing interesting is here.
    } finally {
      setMenuAction(undefined);
      dispatch(setFilterMenuAction(undefined));
      dispatch(setBackgroundBackdropOpen(false));
    }
  };

  /**
   * Triggered when the user clicks on either of the images fetched from the server.
   * The method add or removes the selected image from the list of queried image where
   * we keep the list of images what the user selected as those images what they
   * want to save in folders.
   *
   * @param imageProperties The image that has been clicked.
   */
  const handleClickOnRippleImage = (imageProperties: QueriedImagePropertyType): void => {
    const res = getUpdatedQueriedImageModel(imageProperties.image, queriedImageModel);

    if (!res) {
      return;
    }

    dispatch(setQueriedImageModel(res));
  };

  const handlePageableChange = (response: PageableResponse<ImageDto>) => {
    dispatch(setFilteringResponse(response));
  };

  return (
    <ImageAndPaginationCardRoot
      event={event}
      content={contentTextObj}
      pageableResponse={response}
      setPageable={setPageable}
      setMenuAction={setMenuAction}
      handleClickOnRippleImage={handleClickOnRippleImage}
      isMenuDisabled
    />
  );
};

export default FilteringImageAndPaginationCard;
