import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectIsDialogOpen } from "../../redux/selectors/dialogSelector";
import { DialogToOpens, FilteringDialogTexts } from "../../model/enum";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setDialogToOpen } from "../../redux/actions/dialogActions";
import styled from "@emotion/styled";
import { setImageFilteringForm, setSelectedImage } from "../../redux/actions/imageActions";
import { selectSelectedImages } from "../../redux/selectors/imageSelector";
import { StyledComponentGap, StyledFullWidthAndHeight } from "../../global/globalStyles";
import FilterSelectionColumn from "./FilterSelectionColumn";
import FilterFormColumn from "./formWindows/FilterFormColumn";
import FilterImagePickerColumn from "./FilterImagePickerColumn";
import StyledButton from "../../components/StyledButton";
import ImageFilteringForm from "../../model/ImageFilteringForm";

const FilteringDialog = () => {
  const selectedImages = useSelector(selectSelectedImages);
  const dialogToOpen = useSelector((state) =>
    selectIsDialogOpen(state as RootState, DialogToOpens.FilteringDialog)
  );
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    dispatch(setDialogToOpen(undefined));
    dispatch(setImageFilteringForm(new ImageFilteringForm()));
  }

  return (
    <StyledDialog
      open={dialogToOpen}
      onClose={handleDialogClose}
    >
      <StyledDialogTitle>
        Képek szűrése
      </StyledDialogTitle>
      <DialogContent sx={{padding: "0px"}}>
        <StyledDialogContentHolder>
          <FilterSelectionColumn />
          <FilterFormColumn />
          <FilterImagePickerColumn />
        </StyledDialogContentHolder>
      </DialogContent>
      <DialogActions sx={{padding: "0px"}}>
        <StyledActionsHolder>
          <StyledButton
            buttonText={FilteringDialogTexts.DisagreeButtonText}
            buttonColor="primary"
            buttonVariant="outlined"
            onClick={handleDialogClose}
          />
          <StyledButton
            buttonText={FilteringDialogTexts.AgreeButtonText}
            isDisabled={true}
            buttonColor="primary"
            buttonVariant="outlined"
            onClick={() => {
              /** TODO: Do something with this. */
              dispatch(setSelectedImage([...selectedImages, 0]));
              dispatch(setDialogToOpen(undefined));
            }}
          />
        </StyledActionsHolder>
      </DialogActions>
    </StyledDialog>
  );
};

export default FilteringDialog;

const StyledDialog = styled(Dialog)<{}>((props) => ({
  "& .MuiPaper-root": {
    ...StyledFullWidthAndHeight(),
    maxWidth: "80%",
    maxHeight: "80%",
    borderRadius: "16px",
    padding: "24px",
  }
}));

const StyledDialogTitle = styled(DialogTitle)<{}>(() => ({
  display: "flex", 
  justifyContent: "center", 
  padding: "16px",
}));

const StyledDialogContentHolder = styled(StyledComponentGap)<{}>(() => ({
  gap: "16px",
  ...StyledFullWidthAndHeight(),
}));

const StyledActionsHolder = styled(StyledComponentGap)<{}>(() => ({
  paddingTop: "16px"
}));
