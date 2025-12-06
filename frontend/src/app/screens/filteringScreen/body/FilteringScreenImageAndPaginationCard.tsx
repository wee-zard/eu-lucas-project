import { MenuActions } from "@model/enum";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import i18n from "@i18n/i18nHandler";
import ImageAndPaginationCardRoot from "@cards/imageAndPaginationCard/ImageAndPaginationCardRoot";
import PageableProperties from "@model/PageableProperties";
import { defaultPaginationModel } from "@screens/filteringScreen/helper/FilteringHelper";
import PageableResponse from "@model/response/PageableResponse";
import { selectSelectedImagesModel } from "@redux/selectors/imageSelector";
import { useImageActionTooltip } from "../config/useImageActionTooltip";
import { QueriedImagePropertyType } from "@model/SelectedImagesModel";

const contentTextObj = {
  emptyContentText: i18n.t("screens.filtering.empty-body"),
  nullResultContentText: i18n.t("screens.filtering.empty-body"),
};

const FilteringScreenImageAndPaginationCard = () => {
  const [pageable, setPageable] = useState<PageableProperties>(defaultPaginationModel);
  const [menuAction, setMenuAction] = useState<MenuActions>();
  const [response, setResponse] = useState<PageableResponse<QueriedImagePropertyType>>();
  const selectedImagesModel = useSelector(selectSelectedImagesModel);
  const imageActionsObj = useImageActionTooltip();

  useEffect(() => {
    setResponse({
      content: selectedImagesModel.queryImages.slice(0, pageable.pageSize),
      totalElements: selectedImagesModel.queryImages.length,
      totalPages: Math.ceil(selectedImagesModel.queryImages.length / pageable.pageSize),
      size: pageable.pageSize,
      page: 0,
      empty: selectedImagesModel.queryImages.length === 0,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImagesModel]);

  useEffect(() => {
    if (menuAction !== MenuActions.PAGINATION_CHANGE) {
      return;
    }

    setMenuAction(undefined);
    setResponse({
      content: selectedImagesModel.queryImages.slice(
        pageable.pageNo * pageable.pageSize,
        (pageable.pageNo + 1) * pageable.pageSize,
      ),
      totalElements: selectedImagesModel.queryImages.length,
      totalPages: Math.ceil(selectedImagesModel.queryImages.length / pageable.pageSize),
      size: pageable.pageSize,
      page: pageable.pageNo,
      empty: selectedImagesModel.queryImages.length === 0,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuAction, pageable]);

  return (
    <ImageAndPaginationCardRoot
      content={contentTextObj}
      pageableResponse={response}
      imageActions={imageActionsObj}
      setPageable={setPageable}
      setMenuAction={setMenuAction}
      handleClickOnRippleImage={() => null}
      isRippleDisabled
    />
  );
};

export default FilteringScreenImageAndPaginationCard;
