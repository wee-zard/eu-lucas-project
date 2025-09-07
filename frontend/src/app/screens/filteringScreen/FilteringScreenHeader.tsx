import styled from "@emotion/styled";
import SaveIcon from "@mui/icons-material/Save";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import StyledIconButton from "@components/StyledIconButton";
import { StyledComponentGap } from "@global/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { setQueriedImageModel, setSelectedImagesModel } from "@redux/actions/imageActions";
import { selectSelectedImagesModel } from "@redux/selectors/imageSelector";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import ZipHelper from "@helper/zipHelper";
import { defaultQueriedImageModel, defaultSelectedImagesModel } from "./helper/FilteringHelper";
import { setFilteringDialogToOpen } from "@redux/actions/filteringActions";
import StyledMenuComponent from "@components/StyledMenuComponent";
import { MenuItemType } from "@model/types/MenuItemType";
import { useImageToFolderAdditionConfig } from "./config/MenuItemConfig";
import i18n from "@i18n/i18nHandler";

const FilteringScreenHeader = () => {
  const selectedImagesModel = useSelector(selectSelectedImagesModel);
  const isSelectedImagesModelEmpty = selectedImagesModel.queryImages.length === 0;
  const menuItemOptions: MenuItemType[] = useImageToFolderAdditionConfig();
  const dispatch = useDispatch();

  /**
   * Clears all of the selected images model from the redux.
   */
  const handleClearAll = (): void => {
    dispatch(setSelectedImagesModel(defaultSelectedImagesModel));
  };

  /**
   * Creates a new empty query images model and add it to the selected images model.
   * The user will use this model to add their images into.
   */
  const handleAddImage = () => {
    LocalStorageUtils.initQueryBuilderModelLocalStorage();
    dispatch(setFilteringDialogToOpen(true));
    dispatch(setQueriedImageModel(defaultQueriedImageModel()));
  };

  const handleDownloadOfSelectedImages = () => {
    new ZipHelper(dispatch, selectedImagesModel).downloadZip();
  };

  const getTooltipTitle = (key: string) => {
    return {
      tooltipTitle: i18n.t(`screens.filtering.headerTooltips.${key}`),
    };
  };

  return (
    <StyledHeaderHolder>
      <StyledIconButton
        tooltip={getTooltipTitle("clearAll")}
        buttonColor="error"
        isDisabled={isSelectedImagesModelEmpty}
        buttonIcon={<ClearAllIcon />}
        onClick={handleClearAll}
      />
      <StyledComponentGap>
        <StyledMenuComponent
          options={menuItemOptions}
          tooltipTitle={getTooltipTitle("addImagesToFolder").tooltipTitle}
          buttonIcon={<SaveIcon />}
          isDisabled={isSelectedImagesModelEmpty}
        />
        <StyledIconButton
          tooltip={getTooltipTitle("addImage")}
          buttonColor="success"
          buttonIcon={<AddCircleOutlineIcon />}
          onClick={handleAddImage}
        />
        <StyledIconButton
          tooltip={getTooltipTitle("downloadImages")}
          buttonIcon={<DownloadIcon />}
          isDisabled={isSelectedImagesModelEmpty}
          onClick={handleDownloadOfSelectedImages}
        />
      </StyledComponentGap>
    </StyledHeaderHolder>
  );
};

export default FilteringScreenHeader;

const StyledHeaderHolder = styled.div({
  display: "flex",
  justifyContent: "space-between",
});
