import React, { useEffect, useState } from "react";
import { Divider, Menu, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import StyledIconButton from "@components/StyledIconButton";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterMenuActions } from "@redux/selectors/imageSelector";
import { MenuActions } from "@model/enum";
import { setFilterMenuAction } from "@redux/actions/imageActions";
import { customScrollBar } from "@global/globalStyles";
import FilteringMenuActions from "./FilteringMenuActions";
import { initFirstQueryParent, initQueryBuilderObj } from "@model/QueryBuilderModel";
import FilteringQueryBuilder from "./FilteringQueryBuilder";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import { GenericHandlerType } from "@model/types/GenericHandlerType";

const FilteringMenu = () => {
  console.log("[FilteringMenu]: RENDERED");

  const filterMenuAction = useSelector(selectFilterMenuActions);
  const [element, setElement] = useState<JSX.Element>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const renderComponent = () => (
    <FilteringQueryBuilder id={LocalStorageUtils.getQueryBuilderModel().id} />
  );

  useEffect(() => {
    if (!element) {
      setElement(renderComponent());
    }
  }, [element]);

  useEffect(() => {
    if (!filterMenuAction) {
      return;
    }

    const handle: GenericHandlerType<MenuActions, () => void> = {
      [MenuActions.CANCEL]: () => {
        dispatch(setFilterMenuAction());
        handleClose();
      },
      [MenuActions.SUBMIT]: () => handleClose(),
      [MenuActions.CLEAR_ALL]: () => {
        const defaultBuilder = initQueryBuilderObj(initFirstQueryParent);
        LocalStorageUtils.setQueryBuilderModelLocalStorage(defaultBuilder);
        setElement(undefined);
        dispatch(setFilterMenuAction());
      },
      [MenuActions.PAGINATION_CHANGE]: () => null,
    };

    handle[filterMenuAction]();
  }, [dispatch, filterMenuAction]);

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
            Szűrés feltételek megadása
          </Typography>
        </StyledMenuHeaderHolder>
        <Divider />
        <StyledMenuContentHolder>
          <StyledMenuInnerContentHolder>{element}</StyledMenuInnerContentHolder>
        </StyledMenuContentHolder>
        <Divider />
        <FilteringMenuActions />
      </StyledMenu>
    </div>
  );
};

export default FilteringMenu;

const StyledMenuContentHolder = styled.div<{}>((_) => ({
  display: "grid",
  gap: "8px",
  height: "80%",
  overflow: "auto",
  ...customScrollBar(),
}));

const StyledMenuInnerContentHolder = styled.div<{}>((_) => ({
  padding: "16px",
}));

const StyledMenuHeaderHolder = styled.div<{}>((_) => ({
  padding: "16px",
  height: "10%",
}));

const StyledMenu = styled(Menu)<{}>((_) => ({
  "& .MuiPaper-root": {
    padding: "0 16px 0 16px",
    width: "80%",
    height: "80%",
  },
  "& .MuiList-root": {
    height: "-webkit-fill-available",
  },
}));

export const StyledInputHolder = styled.div<{ $elementWidth?: string }>((props) => ({
  width: props.$elementWidth ?? "100%",
}));
