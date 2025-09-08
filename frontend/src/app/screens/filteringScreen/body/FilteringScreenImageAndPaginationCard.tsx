import ImageDto from "@model/dto/ImageDto";
import { MenuActions } from "@model/enum";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import i18n from "@i18n/i18nHandler";
import ImageAndPaginationCardRoot from "@cards/imageAndPaginationCard/ImageAndPaginationCardRoot";
import PageableProperties from "@model/PageableProperties";
import { defaultFilteringPaginationModel } from "@screens/filteringScreen/helper/FilteringHelper";
import PageableResponse from "@model/response/PageableResponse";
import { selectSelectedImagesModel } from "@redux/selectors/imageSelector";
import { SelectedImageAction } from "@model/types/SelectedImageActionType";
import { useImageActionTooltip } from "../config/useImageActionTooltip";

const contentTextObj = {
  emptyContentText: i18n.t("screens.filtering.empty-body"),
  nullResultContentText: i18n.t("screens.filtering.empty-body"),
};

const FilteringScreenImageAndPaginationCard = () => {
  const [pageable, setPageable] = useState<PageableProperties>(defaultFilteringPaginationModel);
  const [menuAction, setMenuAction] = useState<MenuActions>();
  const [pageableResponse, setPageableResponse] = useState<PageableResponse<ImageDto>>();
  const selectedImagesModel = useSelector(selectSelectedImagesModel);
  const images = selectedImagesModel.queryImages.map((queryImage) => queryImage.image).flat();
  const imageActionsObj: SelectedImageAction[] = useImageActionTooltip();

  useEffect(() => {
    setPageableResponse({
      content: images.slice(0, pageable.pageSize),
      totalElements: images.length,
      totalPages: Math.ceil(images.length / pageable.pageSize),
      size: pageable.pageSize,
      page: 0,
      empty: images.length === 0,
    });
  }, [selectedImagesModel]);

  useEffect(() => {
    if (menuAction !== MenuActions.PAGINATION_CHANGE) {
      return;
    }

    setMenuAction(undefined);
    setPageableResponse({
      content: images.slice(
        pageable.pageNo * pageable.pageSize,
        (pageable.pageNo + 1) * pageable.pageSize,
      ),
      totalElements: images.length,
      totalPages: Math.ceil(images.length / pageable.pageSize),
      size: pageable.pageSize,
      page: pageable.pageNo,
      empty: images.length === 0,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuAction, pageable]);

  return (
    <ImageAndPaginationCardRoot
      content={contentTextObj}
      pageableResponse={pageableResponse}
      imageActions={imageActionsObj}
      setPageable={setPageable}
      setMenuAction={setMenuAction}
      handleClickOnRippleImage={() => null}
      isRippleDisabled
    />
  );
};

export default FilteringScreenImageAndPaginationCard;
