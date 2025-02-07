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
import { setListOfSelectedImages, setSelectedImage } from "@redux/actions/imageActions";
import { selectListOfSelectedImages } from "@redux/selectors/imageSelector";
import { LocalStorageUtils } from "@helper/localStorageUtil";

const FilteringScreenHeader = () => {
  const listOfSelectedImages = useSelector(selectListOfSelectedImages);
  const dispatch = useDispatch();
  const handleClearAll = () => dispatch(setListOfSelectedImages([]));
  const handleAddImage = () => {
    LocalStorageUtils.initQueryBuilderModelLocalStorage();
    dispatch(setDialogToOpen(DialogToOpens.FilteringDialog));
    dispatch(
      setSelectedImage({
        id:
          listOfSelectedImages.length > 0
            ? Math.max(...listOfSelectedImages.map((selectedImage) => selectedImage.id)) + 1
            : 1,
        images: [],
        query: undefined,
      }),
    );
  };

  return (
    <StyledHeaderHolder>
      <StyledButton
        tooltipTitle={FilteringScreenTexts.ClearAllTooltip}
        buttonText={FilteringScreenTexts.ClearAllText}
        buttonColor="error"
        buttonVariant="outlined"
        isDisabled={listOfSelectedImages.length === 0}
        buttonIcon={<ClearIcon />}
        onClick={handleClearAll}
      />
      <StyledComponentGap>
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
          onClick={() => null /** TODO: Implement the download of the selected images here.*/}
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
