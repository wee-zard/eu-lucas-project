import React from "react";
import { Divider, Menu, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import StyledIconButton from "@components/StyledIconButton";
import styled from "@emotion/styled";
import { customScrollBar } from "@global/globalStyles";
import FilteringMenuActions from "./FilteringMenuActions";
import i18n from "@i18n/i18nHandler";
import FilteringMenuContent from "./FilteringMenuContent";

const FilteringMenu = () => {
  console.log("[FilteringMenu]: RENDERED");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <StyledIconButton onClick={handleClick} buttonIcon={<FilterListIcon />} />
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <StyledMenuHeaderHolder>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              textShadow: "1px 1px 1px black",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {i18n.t("screens.filtering.providing-filters")}
          </Typography>
        </StyledMenuHeaderHolder>
        <Divider />
        <StyledMenuContentHolder>
          <StyledMenuInnerContentHolder>
            <FilteringMenuContent handleClose={handleClose} />
          </StyledMenuInnerContentHolder>
        </StyledMenuContentHolder>
        <Divider />
        <FilteringMenuActions />
      </StyledMenu>
    </div>
  );
};

export default FilteringMenu;

const StyledMenuContentHolder = styled.div({
  display: "grid",
  gap: "8px",
  height: "80%",
  overflow: "auto",
  ...customScrollBar(),
});

const StyledMenuInnerContentHolder = styled.div((_) => ({
  padding: "16px",
}));

const StyledMenuHeaderHolder = styled.div({
  padding: "16px",
  height: "10%",
});

const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    padding: "0 16px 0 16px",
    width: "80%",
    height: "80%",
  },
  "& .MuiList-root": {
    height: "-webkit-fill-available",
  },
});

export const StyledInputHolder = styled.div<{ $elementWidth?: string }>((props) => ({
  width: props.$elementWidth ?? "100%",
}));
