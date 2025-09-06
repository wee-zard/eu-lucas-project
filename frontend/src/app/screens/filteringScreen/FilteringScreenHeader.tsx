import styled from "@emotion/styled";
import ClearIcon from "@mui/icons-material/Clear";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import StyledButton from "@components/StyledButton";
import StyledIconButton from "@components/StyledIconButton";
import { StyledComponentGap } from "@global/globalStyles";
import { FilteringScreenTexts } from "@model/enum";
import { useDispatch, useSelector } from "react-redux";
import { setQueriedImageModel, setSelectedImagesModel } from "@redux/actions/imageActions";
import { selectSelectedImagesModel } from "@redux/selectors/imageSelector";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import ZipHelper from "@helper/zipHelper";
import FilteringAddToFolderMenu from "./FilteringAddToFolderMenu";
import { defaultQueriedImageModel, defaultSelectedImagesModel } from "./helper/FilteringHelper";
import { setFilteringDialogToOpen } from "@redux/actions/filteringActions";

const FilteringScreenHeader = () => {
  const selectedImagesModel = useSelector(selectSelectedImagesModel);
  const isSelectedImagesModelEmpty = selectedImagesModel.queryImages.length === 0;
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

  return (
    <StyledHeaderHolder>
      <StyledButton
        tooltipTitle={FilteringScreenTexts.ClearAllTooltip}
        buttonText={FilteringScreenTexts.ClearAllText}
        buttonColor="error"
        buttonVariant="outlined"
        isDisabled={isSelectedImagesModelEmpty}
        buttonIcon={<ClearIcon />}
        onClick={handleClearAll}
      />
      <StyledComponentGap>
        <FilteringAddToFolderMenu isDisabled={isSelectedImagesModelEmpty} />
        <StyledButton
          tooltipTitle={FilteringScreenTexts.AddImageTooltip}
          buttonText={FilteringScreenTexts.AddImageText}
          buttonColor="success"
          buttonVariant="outlined"
          buttonIcon={<AddIcon />}
          onClick={handleAddImage}
        />
        <StyledIconButton
          tooltip={{
            tooltipTitle: FilteringScreenTexts.DownloadTooltip,
            tooltipPlacement: "top",
          }}
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
