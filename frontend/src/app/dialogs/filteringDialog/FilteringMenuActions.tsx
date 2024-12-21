import React from "react";
import StyledIconButton from "app/components/StyledIconButton";
import styled from "@emotion/styled";
import StyledButton from "app/components/StyledButton";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { StyledComponentGap } from "app/global/globalStyles";
import { useDispatch } from "react-redux";
import { setFilterMenuAction } from "app/redux/actions/imageActions";
import { MenuActions } from "app/model/enum";

const FilteringMenuActions = React.memo(function FilteringMenuActions() {
  const dispatch = useDispatch();
  return (
    <StyledMenuActionsHolder>
      <StyledIconButton
        buttonIcon={<ClearAllIcon />}
        tooltip={{
          tooltipTitle: "Clear All Filters",
          tooltipPlacement: "top",
        }}
        onClick={() => dispatch(setFilterMenuAction(MenuActions.CLEAR_ALL))}
      />
      <StyledComponentGap>
        <StyledButton
          buttonText="Cancel"
          buttonVariant="outlined"
          onClick={() => dispatch(setFilterMenuAction(MenuActions.CANCEL))}
        />
        <StyledButton
          buttonText="Apply"
          buttonVariant="outlined"
          onClick={() => dispatch(setFilterMenuAction(MenuActions.SUBMIT))}
        />
      </StyledComponentGap>
    </StyledMenuActionsHolder>
  );
});

export default FilteringMenuActions;

const StyledMenuActionsHolder = styled.div<{}>((props) => ({
  padding: "16px",
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
}));
