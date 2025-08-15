import { LocalStorageUtils } from "@helper/localStorageUtil";
import ImageDto from "@model/dto/ImageDto";
import { MenuActions } from "@model/enum";
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

const contentTextObj = {
  emptyContentText: i18n.t("screens.filtering.empty-body"),
  nullResultContentText: i18n.t("screens.filtering.filtering-no-content"),
};

const FilteringImageAndPaginationCard = () => {
  const [pageable, setPageable] = useState<PageableProperties>(defaultFilteringPaginationModel);
  const [menuAction, setMenuAction] = useState<MenuActions>();
  const [pageableResponse, setPageableResponse] = useState<PageableResponse<ImageDto>>();
  const { queriedImageModel, filterMenuAction } = useSelector(selectImageStorage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (menuAction !== MenuActions.PAGINATION_CHANGE && filterMenuAction !== MenuActions.SUBMIT) {
      return;
    }

    dispatch(setSettingBackdropOpen(true));
    const queryBuilderModel = LocalStorageUtils.getQueryBuilderModel();
    const request = new FilteringQueryRequest(queryBuilderModel);

    getImagesByFilters(request, pageable)
      .then((response) => {
        if (response) {
          setPageableResponse(response);
        }
      })
      .finally(() => {
        setMenuAction(undefined);
        dispatch(setFilterMenuAction(undefined));
        dispatch(setSettingBackdropOpen(false));
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuAction, pageable, filterMenuAction]);

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
