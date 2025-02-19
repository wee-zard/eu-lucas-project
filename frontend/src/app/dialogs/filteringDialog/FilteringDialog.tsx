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

const FilteringDialog = () => {
  const dialogToOpen = useSelector((state) =>
    selectIsDialogOpen(state as RootState, DialogToOpens.FilteringDialog),
  );
  const dispatch = useDispatch();

  const handleDialogClose = () => dispatch(setDialogToOpen(undefined));

  return (
    <StyledDialog open={dialogToOpen} onClose={handleDialogClose}>
      <StyledDialogTitle>Képek szűrése</StyledDialogTitle>
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

const StyledDialog = styled(Dialog)<{}>((_) => ({
  "& .MuiPaper-root": {
    ...StyledFullWidthAndHeight(),
    maxWidth: "80%",
    maxHeight: "90%",
    borderRadius: "16px",
    padding: "24px",
  },
}));

const StyledDialogTitle = styled(DialogTitle)<{}>(() => ({
  display: "flex",
  justifyContent: "center",
  padding: "16px",
}));

const StyledDialogContentHolder = styled(StyledComponentGap)<{}>((_) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
}));

const StyledDialogContent = styled(DialogContent)<{}>((_) => ({
  padding: "0px",
  overflowY: "hidden",
  display: "flex",
}));
