import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectIsDialogOpen } from "../../redux/selectors/dialogSelector";
import { DialogToOpens } from "../../model/enum";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setDialogToOpen } from "../../redux/actions/dialogActions";
import styled from "@emotion/styled";
import { setSelectedImage } from "../../redux/actions/imageActions";
import { selectSelectedImages } from "../../redux/selectors/imageSelector";
import {
  StyledComponentGap,
  StyledFullWidthAndHeight,
} from "../../global/globalStyles";
import FilterSelectionColumn from "./FilterSelectionColumn";
import FilterFormColumn from "./FilterFormColumn";
import FilterImagePickerColumn from "./FilterImagePickerColumn";

const FilteringDialog = () => {
  const selectedImages = useSelector(selectSelectedImages);
  const dialogToOpen = useSelector((state) =>
    selectIsDialogOpen(state as RootState, DialogToOpens.FilteringDialog)
  );
  const dispatch = useDispatch();

  return (
    <StyledDialog
      open={dialogToOpen}
      onClose={() => dispatch(setDialogToOpen(undefined))}
    >
      <DialogTitle style={{ display: "flex", justifyContent: "center", padding: "16px" }}>
        Use Google's location service?
      </DialogTitle>
      <DialogContent>
        <StyledDialogContentHolder>
          <FilterSelectionColumn />
          <FilterFormColumn />
          <FilterImagePickerColumn />
        </StyledDialogContentHolder>
      </DialogContent>
      <DialogActions>
        <Button
          /** TODO: Replace button with styled button */
          onClick={() => {
            dispatch(setDialogToOpen(undefined));
          }}
        >
          Disagree
        </Button>
        <Button
          /** TODO: Replace button with styled button */
          onClick={() => {
            dispatch(setSelectedImage([...selectedImages, 0]));
            dispatch(setDialogToOpen(undefined));
          }}
        >
          Agree
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default FilteringDialog;

const StyledDialog = styled(Dialog)<{}>((props) => ({
  "& .MuiPaper-root": {
    ...StyledFullWidthAndHeight(),
    maxWidth: "80%",
    maxHeight: "70%",
    borderRadius: "16px",
    padding: "12px",
    //flexWrap: "wrap",
  },
}));

const StyledDialogContentHolder = styled(StyledComponentGap)<{}>((props) => ({
  gap: "24px",
  ...StyledFullWidthAndHeight(),
}));
