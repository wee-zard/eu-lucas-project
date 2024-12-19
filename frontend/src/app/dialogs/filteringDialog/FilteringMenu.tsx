import React, { useEffect } from "react";
import { Divider, Menu } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import StyledIconButton from "app/components/StyledIconButton";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { selectImageStorage } from "app/redux/selectors/imageSelector";
import { MenuActions } from "app/model/enum";
import {
  setFilterMenuAction,
  setQueryBuilderModel,
} from "app/redux/actions/imageActions";
import FilteringMenuBody from "./FilteringMenuBody";
import { customScrollBar } from "app/global/globalStyles";
import FilteringMenuActions from "./FilteringMenuActions";
import { initQueryBuilderObj } from "app/model/QueryBuilderModel";

const FilteringMenu = () => {
  console.log("[FilteringMenu]: RENDERED");

  const { filterMenuAction, queryBuilderModel } =
    useSelector(selectImageStorage);

  //const filterMenuActions = useSelector(selectFilterMenuActions);
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
      dispatch(setQueryBuilderModel({ ...initQueryBuilderObj() }));
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
              <FilteringMenuBody
                queryBuilderModel={queryBuilderModel}
                callback={(builder) => dispatch(setQueryBuilderModel(builder))}
              />
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
