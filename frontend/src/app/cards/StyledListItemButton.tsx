import React from "react";
import styled from "@emotion/styled";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemModel from "../model/ListItemModel";
import { useSelector } from "react-redux";
import { selectSelectedFilterTab } from "../redux/selectors/imageSelector";
import { useDispatch } from "react-redux";
import { setSelectedFilterTab } from "../redux/actions/imageActions";

type Props = {
  listItem: ListItemModel;
};

const StyledListItemButton = ({ listItem }: Props) => {
  const selectedFilterTab = useSelector(selectSelectedFilterTab);
  const dispatch = useDispatch();

  return (
    <ListItemHolder
      sx={{ height: "48px" }}
      selected={selectedFilterTab === listItem.name}
      onClick={() => dispatch(setSelectedFilterTab(listItem.name))}
    >
      <ListItemIcon>{listItem.icon}</ListItemIcon>
      <ListItemText primary={listItem.name} />
    </ListItemHolder>
  );
};

export default StyledListItemButton;

const ListItemHolder = styled(ListItemButton)<{}>((props) => ({
  borderRadius: "8px",
}));
