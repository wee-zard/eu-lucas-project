import StyledButton from "@components/StyledButton";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import i18n from "@i18n/i18nHandler";
import { selectImageStorage } from "@redux/selectors/imageSelector";
import { useSelector } from "react-redux";
import EventListenerUtil from "@helper/eventListenerUtil";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { getUpdatedQueriedImageModel } from "./helper/FilteringHelper";
import { QueriedImageType } from "@model/SelectedImagesModel";
import { setQueriedImageModel } from "@redux/actions/imageActions";
import { useDispatch } from "react-redux";
import ImageDto from "@model/dto/ImageDto";
import PageableResponse from "@model/response/PageableResponse";
import { getImagesByFilters } from "@api/command/imageCommand";
import PageableProperties from "@model/PageableProperties";
import { MAXIMUM_SAFE_VALUE_OF_INTEGER } from "app/consts/integerConsts";
import { setBackgroundBackdropOpen } from "@redux/actions/backgroundActions";

const FilteringImageSelectionActions = () => {
  const { filteringResponse, queriedImageModel } = useSelector(selectImageStorage);
  const isDisabled = !filteringResponse || filteringResponse?.content.length === 0;
  const listenerKey = EventListenerIdEnum.FILTERING_IMAGE_TABLE;
  const dispatch = useDispatch();

  const handleImageSelectionFromCurrentPage = (): void => {
    if (isDisabled) {
      return;
    }

    handleImageSelection(filteringResponse);
  };

  const handleImageSelectionFromAll = async () => {
    try {
      dispatch(setBackgroundBackdropOpen(true));
      const pageable: PageableProperties = {
        pageNo: 0,
        pageSize: MAXIMUM_SAFE_VALUE_OF_INTEGER,
      };
      const response = await getImagesByFilters(pageable);
      handleImageSelection(response);
    } catch (error) {
      // Nothing interesting is here.
    } finally {
      dispatch(setBackgroundBackdropOpen(false));
    }
  };

  const handleImageSelection = (response: PageableResponse<ImageDto>) => {
    // Give back those images from the current page that has not been selected by the user.
    const imagesToSelect = response.content.filter((image) =>
      queriedImageModel?.images.every((model) => image.id !== model.image.id),
    );

    // Select the not-yet-selected images from the page.
    EventListenerUtil.dispatchEvent(listenerKey, undefined, imagesToSelect);

    let res: QueriedImageType | undefined = queriedImageModel;

    imagesToSelect.forEach((content) => (res = getUpdatedQueriedImageModel(content, res)));

    dispatch(setQueriedImageModel(res));
  };

  return (
    <div className="flex-gap16">
      <StyledButton
        buttonText={i18n.t("screens.filtering.selectionActions.selectOnPageButtonTitle")}
        tooltipTitle={i18n.t("screens.filtering.selectionActions.selectOnPageButtonTooltip")}
        buttonVariant={"outlined"}
        buttonIcon={<SelectAllIcon />}
        isDisabled={isDisabled}
        applyStyle={{
          buttonWidth: "140px",
        }}
        onClick={handleImageSelectionFromCurrentPage}
      />
      <StyledButton
        buttonText={i18n.t("screens.filtering.selectionActions.selectAllButtonTitle")}
        tooltipTitle={i18n.t("screens.filtering.selectionActions.selectAllButtonTooltip")}
        buttonVariant={"outlined"}
        buttonIcon={<SelectAllIcon />}
        isDisabled={isDisabled}
        applyStyle={{
          buttonWidth: "140px",
        }}
        onClick={handleImageSelectionFromAll}
      />
    </div>
  );
};

export default FilteringImageSelectionActions;
