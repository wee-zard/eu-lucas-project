import styled from "@emotion/styled";
import ClearIcon from "@mui/icons-material/Clear";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import StyledButton from "@components/StyledButton";
import StyledIconButton from "@components/StyledIconButton";
import { StyledComponentGap } from "@global/globalStyles";
import { DialogToOpens, FilteringScreenTexts } from "@model/enum";
import { useDispatch, useSelector } from "react-redux";
import { setDialogToOpen } from "@redux/actions/dialogActions";
import { setListOfSelectedImages, setSelectedImageModel } from "@redux/actions/imageActions";
import { selectListOfSelectedImages } from "@redux/selectors/imageSelector";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import { setSettingBackdropOpen } from "@redux/actions/settingActions";
import ZipHelper from "@screens/manageFoldersScreen/helper/zipHelper";
import FilteringAddToFolderMenu from "./FilteringAddToFolderMenu";

const FilteringScreenHeader = () => {
  const listOfSelectedImages = useSelector(selectListOfSelectedImages);
  const isAnImageSelected = listOfSelectedImages.length === 0;

  const dispatch = useDispatch();
  const handleClearAll = () => dispatch(setListOfSelectedImages([]));
  const handleAddImage = () => {
    LocalStorageUtils.initQueryBuilderModelLocalStorage();
    dispatch(setDialogToOpen(DialogToOpens.FilteringDialog));
    const selectedImageId =
      listOfSelectedImages.length > 0
        ? Math.max(...listOfSelectedImages.map((imageModel) => imageModel.id)) + 1
        : 1;
    dispatch(
      setSelectedImageModel({
        id: selectedImageId,
        images: [],
        query: undefined,
      }),
    );
  };

  const handleDownloadOfSelectedImages = () => {
    dispatch(setSettingBackdropOpen(true));
    const zipHelper = new ZipHelper(listOfSelectedImages);
    zipHelper.downloadZip().finally(() => dispatch(setSettingBackdropOpen(false)));
  };

  return (
    <StyledHeaderHolder>
      <StyledButton
        tooltipTitle={FilteringScreenTexts.ClearAllTooltip}
        buttonText={FilteringScreenTexts.ClearAllText}
        buttonColor="error"
        buttonVariant="outlined"
        isDisabled={isAnImageSelected}
        buttonIcon={<ClearIcon />}
        onClick={handleClearAll}
      />
      <StyledComponentGap>
        <FilteringAddToFolderMenu isDisabled={isAnImageSelected} />
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
          isDisabled={isAnImageSelected}
          onClick={handleDownloadOfSelectedImages}
        />
      </StyledComponentGap>
    </StyledHeaderHolder>
  );
};

export default FilteringScreenHeader;

const StyledHeaderHolder = styled.div<{}>((_) => ({
  display: "flex",
  justifyContent: "space-between",
}));
