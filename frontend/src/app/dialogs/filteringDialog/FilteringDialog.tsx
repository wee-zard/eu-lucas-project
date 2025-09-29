import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { StyledComponentGap } from "@global/globalStyles";
import FilteringMenu from "@dialogs/filteringDialog/FilteringMenu";
import FilteringImageAndPaginationCard from "@dialogs/filteringDialog/FilteringImageAndPaginationCard";
import i18n from "@i18n/i18nHandler";
import FilteringImageSelectionActions from "./FilteringImageSelectionActions";
import {
  setFilteringPageableProperties,
  setFilteringResponse,
  setFilterMenuAction,
  setQueriedImageModel,
} from "@redux/actions/imageActions";
import { selectIsFilteringDialogOpen } from "@redux/selectors/filteringSelector";
import { setFilteringDialogToOpen } from "@redux/actions/filteringActions";
import { defaultPaginationModel } from "@screens/filteringScreen/helper/FilteringHelper";
import FilteringDialogActions from "./FilteringDialogActions";
import { setExifCacheStorage } from "@redux/actions/exifKeyActions";

const FilteringDialog = () => {
  const isFilteringDialogOpen = useSelector(selectIsFilteringDialogOpen);
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    dispatch(setFilteringPageableProperties(defaultPaginationModel));
    dispatch(setQueriedImageModel(undefined));
    dispatch(setFilterMenuAction(undefined));
    dispatch(setFilteringResponse(undefined));
    dispatch(setFilteringDialogToOpen(false));
    dispatch(setExifCacheStorage({}));
  };

  return (
    <StyledDialog open={isFilteringDialogOpen} onClose={handleDialogClose}>
      <StyledDialogTitle>{i18n.t("screens.filtering.dialog-title")}</StyledDialogTitle>
      <StyledDialogContent>
        <StyledDialogContentHolder display={"grid"}>
          <StyledHeaderActionWrapper className="flex-gap">
            <FilteringMenu />
            <FilteringImageSelectionActions />
          </StyledHeaderActionWrapper>
          <FilteringImageAndPaginationCard />
        </StyledDialogContentHolder>
      </StyledDialogContent>
      <FilteringDialogActions handleDialogClose={handleDialogClose} />
    </StyledDialog>
  );
};

export default FilteringDialog;

export const StyledDialog = styled(Dialog)<{
  $isHeightDynamic?: boolean;
  styledmaxwidth?: string;
  styledmaxheight?: string;
}>((props) => ({
  "& .MuiDialog-paper": {
    width: "100%",
    height: props.$isHeightDynamic ? undefined : "100%",
    maxWidth: props?.styledmaxwidth ?? "80%",
    maxHeight: props.$isHeightDynamic ? undefined : (props?.styledmaxheight ?? "90%"),
    borderRadius: "16px",
    padding: "24px",
  },
}));

export const StyledDialogTitle = styled(DialogTitle)({
  display: "flex",
  justifyContent: "center",
  padding: "16px",
});

export const StyledHeaderActionWrapper = styled("div")({
  justifyContent: "space-between",
});

export const StyledDialogContentHolder = styled(StyledComponentGap)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
});

export const StyledDialogContent = styled(DialogContent)({
  padding: "0px",
  overflowY: "hidden",
  display: "flex",
});
