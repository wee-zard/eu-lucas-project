import { DialogActions } from "@mui/material";
import { useSelector } from "react-redux";
import { FilteringDialogTexts } from "@model/enum";
import { useDispatch } from "react-redux";
import { setDialogToOpen } from "@redux/actions/dialogActions";
import styled from "@emotion/styled";
import {
  setFilteringPageableProperties,
  setFilterMenuAction,
  setListOfSelectedImages,
  setSelectedImageModel,
} from "@redux/actions/imageActions";
import { StyledComponentGap } from "@global/globalStyles";
import StyledButton from "@components/StyledButton";
import { selectImageStorage } from "@redux/selectors/imageSelector";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import { FILTERING_PAGE_SIZE } from "@global/globalConsts";

const FilteringDialogActions = () => {
  const { selectedImageModel, listOfSelectedImages } = useSelector(selectImageStorage);
  const isAgreeButtonDisabled = !selectedImageModel || selectedImageModel.images.length === 0;
  const dispatch = useDispatch();

  const handleDialogClose = () => dispatch(setDialogToOpen(undefined));

  const agreeButtonText =
    selectedImageModel && selectedImageModel.images.length > 0
      ? `${FilteringDialogTexts.AgreeButtonText} (${selectedImageModel.images.length})`
      : FilteringDialogTexts.AgreeButtonText;

  const handleAgreeButtonClick = () => {
    if (!selectedImageModel) {
      return;
    }

    // If the selectedImageModel is exists in the listOfSelectedImages list, if yes, then override that object, else add a new object to the list.
    dispatch(
      setListOfSelectedImages(
        listOfSelectedImages.find((image) => image.id === selectedImageModel.id)
          ? listOfSelectedImages.map((image) => ({
              id: image.id,
              images: image.id === selectedImageModel.id ? selectedImageModel.images : image.images,
              query: image.id === selectedImageModel.id ? selectedImageModel.query : image.query,
            }))
          : [...listOfSelectedImages, selectedImageModel],
      ),
    );
    LocalStorageUtils.initQueryBuilderModelLocalStorage();
    dispatch(
      setFilteringPageableProperties({
        pageNo: 0,
        pageSize: FILTERING_PAGE_SIZE,
      }),
    );
    dispatch(setFilterMenuAction(undefined));
    dispatch(setSelectedImageModel(undefined));
    handleDialogClose();
  };

  return (
    <StyledDialogActions>
      <StyledActionsHolder>
        <StyledButton
          buttonText={FilteringDialogTexts.DisagreeButtonText}
          buttonColor="primary"
          buttonVariant="outlined"
          onClick={handleDialogClose}
        />
        <StyledButton
          buttonText={agreeButtonText}
          isDisabled={isAgreeButtonDisabled}
          buttonColor="primary"
          buttonVariant="outlined"
          buttonType={"submit"}
          onClick={handleAgreeButtonClick}
        />
      </StyledActionsHolder>
    </StyledDialogActions>
  );
};

export default FilteringDialogActions;

const StyledDialogActions = styled(DialogActions)({
  padding: "0px",
});

const StyledActionsHolder = styled(StyledComponentGap)({
  paddingTop: "16px",
});
