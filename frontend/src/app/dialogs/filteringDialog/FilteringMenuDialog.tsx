import styled from "@emotion/styled";
import { customScrollBar } from "@global/globalStyles";
import FilteringMenuActions from "./FilteringMenuActions";
import i18n from "@i18n/i18nHandler";
import FilteringMenuContent from "./FilteringMenuContent";
import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogContentHolder,
  StyledDialogTitle,
} from "./FilteringDialog";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const FilteringMenuDialog = ({ isOpen, handleClose }: Props) => {
  return (
    <StyledDialog open={isOpen} onClose={handleClose}>
      <StyledDialogTitle>{i18n.t("screens.filtering.providing-filters")}</StyledDialogTitle>
      <StyledDialogContent>
        <StyledDialogContentHolder display={"grid"}>
          <StyledMenuContentHolder>
            <StyledMenuInnerContentHolder>
              <FilteringMenuContent handleClose={handleClose} />
            </StyledMenuInnerContentHolder>
          </StyledMenuContentHolder>
        </StyledDialogContentHolder>
      </StyledDialogContent>
      <FilteringMenuActions />
    </StyledDialog>
  );
};

export default FilteringMenuDialog;

const StyledMenuContentHolder = styled.div({
  display: "grid",
  gap: "8px",
  overflow: "auto",
  marginRight: 2,
  ...customScrollBar(),
});

const StyledMenuInnerContentHolder = styled.div((_) => ({
  padding: "16px",
}));

export const StyledInputHolder = styled.div<{ $elementWidth?: string }>((props) => ({
  width: props.$elementWidth ?? "100%",
}));
