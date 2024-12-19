import React from "react";
import styled from "@emotion/styled";
import ClearIcon from "@mui/icons-material/Clear";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import StyledButton from "../../components/StyledButton";
import StyledIconButton from "../../components/StyledIconButton";
import { StyledComponentGap } from "../../global/globalStyles";
import { DialogToOpens, FilteringScreenTexts } from "../../model/enum";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedImages } from "../../redux/selectors/imageSelector";
import { setSelectedImage } from "../../redux/actions/imageActions";
import { setDialogToOpen } from "../../redux/actions/dialogActions";

const FilteringScreenHeader = () => {
  const numberOfCards = useSelector(selectSelectedImages);
  const dispatch = useDispatch();

  return (
    <StyledHeaderHolder>
      <StyledButton
        tooltipTitle={FilteringScreenTexts.ClearAllTooltip}
        buttonText={FilteringScreenTexts.ClearAllText}
        buttonColor="error"
        buttonVariant="outlined"
        isDisabled={numberOfCards.length === 0}
        buttonIcon={<ClearIcon />}
        onClick={() => dispatch(setSelectedImage([]))}
      />
      <StyledComponentGap>
        <StyledButton
          tooltipTitle={FilteringScreenTexts.AddImageTooltip}
          buttonText={FilteringScreenTexts.AddImageText}
          buttonColor="success"
          buttonVariant="outlined"
          buttonIcon={<AddIcon />}
          onClick={() => dispatch(setDialogToOpen(DialogToOpens.FilteringDialog))}
        />
        <StyledIconButton
          tooltip={{
            tooltipTitle: FilteringScreenTexts.DownloadTooltip,
            tooltipPlacement: "top",
          }}
          buttonIcon={<DownloadIcon />}
          onClick={
            () =>
              null /** TODO: Implement the download of the selected images here.*/
          }
        />
      </StyledComponentGap>
    </StyledHeaderHolder>
  );
};

export default FilteringScreenHeader;

const StyledHeaderHolder = styled.div<{}>((props) => ({
  display: "flex",
  justifyContent: "space-between",
}));
