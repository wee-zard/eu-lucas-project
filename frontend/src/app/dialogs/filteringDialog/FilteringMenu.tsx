import React, { useEffect, useState } from "react";
import { Divider, Menu } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import StyledIconButton from "app/components/StyledIconButton";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { selectImageStorage } from "app/redux/selectors/imageSelector";
import { MenuActions } from "app/model/enum";
import { setFilterMenuAction } from "app/redux/actions/imageActions";
import FilteringMenuBody from "./FilteringMenuBody";
import { customScrollBar } from "app/global/globalStyles";
import FilteringMenuActions from "./FilteringMenuActions";
import {
  initFirstQueryParent,
  initQueryBuilderObj,
  QueryBuilderModel,
} from "app/model/QueryBuilderModel";

const FilteringMenu = () => {
  console.log("[FilteringMenu]: RENDERED");

  const { filterMenuAction } = useSelector(selectImageStorage);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (filterMenuAction === MenuActions.CANCEL) {
      dispatch(setFilterMenuAction());
      handleClose();
    } else if (filterMenuAction === MenuActions.CLEAR_ALL) {
      const defaultBuilder = initQueryBuilderObj(initFirstQueryParent);
      localStorage.setItem("filtering", JSON.stringify(defaultBuilder));
      setQueryBuilderModelLocalStorage(defaultBuilder);
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
              <FilteringMenuBody id={getQueryBuilderModel().id} />
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

export const setQueryBuilderModelLocalStorage = (
  queryBuilder: QueryBuilderModel
) => {
  localStorage.setItem("filtering", JSON.stringify(queryBuilder));
};

export const getQueryBuilderModel = () => {
  const obj = localStorage.getItem("filtering");
  if (obj) {
    return JSON.parse(obj) as QueryBuilderModel;
  } else {
    const defaultBuilder = initQueryBuilderObj(initFirstQueryParent);
    setQueryBuilderModelLocalStorage(defaultBuilder);
    return defaultBuilder;
  }
};

const StyledMenuContentHolder = styled.div<{}>((props) => ({
  display: "grid",
  gap: "8px",
  height: "500px",
  overflow: "auto",
  ...customScrollBar(),
}));

const StyledMenuInnerContentHolder = styled.div<{}>((props) => ({
  paddingBottom: "16px",
}));

const StyledMenuHeaderHolder = styled.div<{}>((props) => ({
  padding: "16px",
}));

const StyledMenu = styled(Menu)<{}>((props) => ({
  "& .MuiPaper-root": {
    padding: "0 16px 0 16px",
    width: "80%",
  },
}));

export const StyledInputHolder = styled.div<{ $elementWidth?: string }>(
  (props) => ({
    width: props.$elementWidth ?? "100%",
  })
);
