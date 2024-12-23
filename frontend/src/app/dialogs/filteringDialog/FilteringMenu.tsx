import React, { useEffect, useState } from "react";
import { Divider, Menu } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import StyledIconButton from "@components/StyledIconButton";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { selectImageStorage } from "@redux/selectors/imageSelector";
import { MenuActions } from "@model/enum";
import { setFilterMenuAction } from "@redux/actions/imageActions";
import { customScrollBar } from "@global/globalStyles";
import FilteringMenuActions from "./FilteringMenuActions";
import {
  initFirstQueryParent,
  initQueryBuilderObj,
} from "@model/QueryBuilderModel";
import FilteringQueryBuilder from "./FilteringQueryBuilder";
import { LocalStorageUtils } from "@helper/localStorageUtil";

const FilteringMenu = () => {
  console.log("[FilteringMenu]: RENDERED");

  const { filterMenuAction } = useSelector(selectImageStorage);
  const [element, setElement] = useState<JSX.Element>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderComponent = () => {
    return (<FilteringQueryBuilder id={LocalStorageUtils.getQueryBuilderModel().id} />);
  }

  useEffect(() => {
    if (!element) {
      setElement(renderComponent());
    }
  }, [element]);

  useEffect(() => {
    if (filterMenuAction === MenuActions.CANCEL) {
      dispatch(setFilterMenuAction());
      handleClose();
    } else if (filterMenuAction === MenuActions.CLEAR_ALL) {
      const defaultBuilder = initQueryBuilderObj(initFirstQueryParent);
      LocalStorageUtils.setQueryBuilderModelLocalStorage(defaultBuilder);
      setElement(undefined);
      dispatch(setFilterMenuAction());
    }
  }, [dispatch, filterMenuAction]);

  return (
    <div>
      <StyledIconButton onClick={handleClick} buttonIcon={<FilterListIcon />} />
      <StyledMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <div>
          <StyledMenuHeaderHolder>Szűrés képekre</StyledMenuHeaderHolder>
          <Divider />
          <StyledMenuContentHolder>
            <StyledMenuInnerContentHolder>
              {element}
            </StyledMenuInnerContentHolder>
          </StyledMenuContentHolder>
          <Divider />
          <FilteringMenuActions />
        </div>
      </StyledMenu>
    </div>
  );
};

export default FilteringMenu;

const StyledMenuContentHolder = styled.div<{}>((props) => ({
  display: "grid",
  gap: "8px",
  height: "60vh",
  overflow: "auto",
  ...customScrollBar(),
}));

const StyledMenuInnerContentHolder = styled.div<{}>((props) => ({
  padding: "16px",
}));

const StyledMenuHeaderHolder = styled.div<{}>((props) => ({
  padding: "16px",
}));

const StyledMenu = styled(Menu)<{}>((props) => ({
  "& .MuiPaper-root": {
    padding: "0 16px 0 16px",
    width: "80%",
    height: "80%",
  },
}));

export const StyledInputHolder = styled.div<{ $elementWidth?: string }>(
  (props) => ({
    width: props.$elementWidth ?? "100%",
  })
);
