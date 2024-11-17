import React from "react";
import styled from "@emotion/styled";
import List from "@mui/material/List";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LanguageIcon from "@mui/icons-material/Language";
import ExploreIcon from "@mui/icons-material/Explore";
import DataObjectIcon from "@mui/icons-material/DataObject";
import PlaceIcon from "@mui/icons-material/Place";
import GrassIcon from '@mui/icons-material/Grass';
import TerminalIcon from '@mui/icons-material/Terminal';
import StyledListItemButton from "../../../cards/StyledListItemButton";
import { customScrollBar, windowBorders } from "../../../global/globalStyles";
import ListItemModel from "../../../model/ListItemModel";
import { FilterDialogFilterOptions } from "../../../model/enum";

export const listItemOptions: ListItemModel[] = [
  { name: FilterDialogFilterOptions.Year, icon: <AccessTimeIcon /> },
  { name: FilterDialogFilterOptions.Country, icon: <LanguageIcon /> },
  { name: FilterDialogFilterOptions.Coordinates, icon: <PlaceIcon /> },
  { name: FilterDialogFilterOptions.Direction, icon: <ExploreIcon /> },
  { name: FilterDialogFilterOptions.ExifData, icon: <DataObjectIcon /> },
  { name: FilterDialogFilterOptions.Plant, icon: <GrassIcon /> },
  { name: FilterDialogFilterOptions.Algorith, icon: <TerminalIcon /> },
];

const FilterSelectionColumn = () => {
  return (
    <StyledDialogColumnHolder>
      <StyledTextHolder>Szűrési opciók</StyledTextHolder>
      <StyledList>
        {listItemOptions.map((item, index) => (
          <StyledListItemButton key={index} listItem={item} />
        ))}
      </StyledList>
    </StyledDialogColumnHolder>
  );
};

export default FilterSelectionColumn;

const StyledList = styled(List)<{}>(() => ({
  display: "grid",
  gap: "8px",
}));

export const StyledTextHolder = styled.div<{}>(() => ({
  fontSize: "18px",
  display: "flex",
  justifyContent: "center",
  paddingTop: "16px",
}));

const StyledDialogColumnHolder = styled.div<{}>((props) => ({
  overflow: "auto",
  overflowX: "hidden",
  ...customScrollBar(),
  width: "50%",
  height: "100%",
  gap: "16px",
  display: "flex",
  flexDirection: "column",
  ...windowBorders(),
}));
