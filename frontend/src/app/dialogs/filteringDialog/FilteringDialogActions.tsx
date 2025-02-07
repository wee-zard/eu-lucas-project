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
  setSelectedImage,
} from "@redux/actions/imageActions";
import { StyledComponentGap } from "@global/globalStyles";
import StyledButton from "@components/StyledButton";
import { selectImageStorage } from "@redux/selectors/imageSelector";
import { LocalStorageUtils } from "@helper/localStorageUtil";

const FilteringDialogActions = () => {
  const { selectedImage, listOfSelectedImages } = useSelector(selectImageStorage);
  const isAgreeButtonDisabled = !selectedImage || selectedImage.images.length === 0;
  const dispatch = useDispatch();

  const handleDialogClose = () => dispatch(setDialogToOpen(undefined));

  const agreeButtonText =
    selectedImage && selectedImage.images.length > 0
      ? `${FilteringDialogTexts.AgreeButtonText} (${selectedImage.images.length})`
      : FilteringDialogTexts.AgreeButtonText;

  const handleAgreeButtonClick = () => {
    if (selectedImage) {
      // If the selectedImage is exists in the listOfSelectedImages list, if yes, then override that object, else add a new object to the list.
      dispatch(
        setListOfSelectedImages(
          listOfSelectedImages.find((image) => image.id === selectedImage.id)
            ? listOfSelectedImages.map((image) => ({
                id: image.id,
                images: image.id === selectedImage.id ? selectedImage.images : image.images,
                query: image.id === selectedImage.id ? selectedImage.query : image.query,
              }))
            : [...listOfSelectedImages, selectedImage],
        ),
      );
      LocalStorageUtils.initQueryBuilderModelLocalStorage();
      dispatch(
        setFilteringPageableProperties({
          pageNo: 0,
          pageSize: 9,
        }),
      );
      dispatch(setFilterMenuAction(undefined));
      dispatch(setSelectedImage(undefined));
      handleDialogClose();
    }
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

const StyledDialogActions = styled(DialogActions)<{}>((_) => ({
  padding: "0px",
}));

const StyledActionsHolder = styled(StyledComponentGap)<{}>(() => ({
  paddingTop: "16px",
}));
