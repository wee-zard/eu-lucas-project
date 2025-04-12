import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useSelector } from "react-redux";
import { selectIsDialogOpen } from "@redux/selectors/dialogSelector";
import { DialogToOpens } from "@model/enum";
import { RootState } from "@redux/store";
import { useDispatch } from "react-redux";
import { setDialogToOpen } from "@redux/actions/dialogActions";
import styled from "@emotion/styled";
import { StyledComponentGap, StyledFullWidthAndHeight } from "@global/globalStyles";
import FilteringMenu from "@dialogs/filteringDialog/FilteringMenu";
import FilteringDialogImageDisplay from "@dialogs/filteringDialog/FilteringDialogImageDisplay";
import FilteringDialogActions from "@dialogs/filteringDialog/FilteringDialogActions";
import i18n from "@i18n/i18nHandler";

const FilteringDialog = () => {
  const isDialogOpen = useSelector((state) =>
    selectIsDialogOpen(state as RootState, DialogToOpens.FilteringDialog),
  );
  const dispatch = useDispatch();

  const handleDialogClose = () => dispatch(setDialogToOpen(undefined));

  return (
    <StyledDialog open={isDialogOpen} onClose={handleDialogClose}>
      <StyledDialogTitle>{i18n.t("screens.filtering.dialog-title")}</StyledDialogTitle>
      <StyledDialogContent>
        <StyledDialogContentHolder display={"grid"}>
          <FilteringMenu />
          <FilteringDialogImageDisplay />
        </StyledDialogContentHolder>
      </StyledDialogContent>
      <FilteringDialogActions />
    </StyledDialog>
  );
};

export default FilteringDialog;

export const StyledDialog = styled(Dialog)<{}>((_) => ({
  "& .MuiPaper-root": {
    ...StyledFullWidthAndHeight(),
    maxWidth: "80%",
    maxHeight: "90%",
    borderRadius: "16px",
    padding: "24px",
  },
}));

export const StyledDialogTitle = styled(DialogTitle)<{}>(() => ({
  display: "flex",
  justifyContent: "center",
  padding: "16px",
}));

export const StyledDialogContentHolder = styled(StyledComponentGap)<{}>((_) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
}));

export const StyledDialogContent = styled(DialogContent)<{}>((_) => ({
  padding: "0px",
  overflowY: "hidden",
  display: "flex",
}));
